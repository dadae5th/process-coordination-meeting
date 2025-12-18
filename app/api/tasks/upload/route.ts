import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { ExcelRow } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // 사용자 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { tasks } = body;

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return NextResponse.json({ error: '유효한 데이터가 없습니다.' }, { status: 400 });
    }

    // 엑셀 데이터를 DB 형식으로 변환
    const tasksToInsert = tasks.map((row: ExcelRow) => {
      // 날짜 파싱 (엑셀 날짜 형식 처리)
      let dueDate = null;
      if (row.완료예상일정) {
        try {
          // 엑셀 날짜는 숫자로 올 수 있음 (1900년 1월 1일부터의 일수)
          if (typeof row.완료예상일정 === 'number') {
            const excelDate = row.완료예상일정;
            const date = new Date((excelDate - 25569) * 86400 * 1000);
            dueDate = date.toISOString().split('T')[0];
          } else if (typeof row.완료예상일정 === 'string') {
            // 문자열 날짜 처리
            const date = new Date(row.완료예상일정);
            if (!isNaN(date.getTime())) {
              dueDate = date.toISOString().split('T')[0];
            }
          }
        } catch (e) {
          console.error('날짜 파싱 오류:', e);
        }
      }

      return {
        agenda: row.안건,
        solution: row.해결방안 || null,
        assignee_email: row.담당자,
        requester_email: row.요청부서 || null,
        due_date: dueDate,
        notes: row.비고 || null,
        owner_id: user.id,
        status: 'pending',
        initial_email_sent: false,
      };
    });

    // 필수 필드 검증
    const invalidTasks = tasksToInsert.filter(
      (task) => !task.agenda || !task.assignee_email
    );

    if (invalidTasks.length > 0) {
      return NextResponse.json(
        { error: '안건과 담당자 이메일은 필수입니다.' },
        { status: 400 }
      );
    }

    // DB에 삽입
    const { data, error } = await supabase.from('tasks').insert(tasksToInsert).select();

    if (error) {
      console.error('DB 삽입 오류:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: data.length, tasks: data });
  } catch (error: any) {
    console.error('업로드 오류:', error);
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
