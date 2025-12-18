import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import {
  sendEmail,
  createInitialEmailTemplate,
  createRequesterEmailTemplate,
} from '@/lib/email';

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

    // 아직 초기 이메일이 발송되지 않은 업무 조회
    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .eq('owner_id', user.id)
      .eq('initial_email_sent', false);

    if (tasksError) {
      return NextResponse.json({ error: tasksError.message }, { status: 500 });
    }

    if (!tasks || tasks.length === 0) {
      return NextResponse.json({ message: '발송할 이메일이 없습니다.', sent: 0 });
    }

    let sentCount = 0;
    const errors = [];

    for (const task of tasks) {
      try {
        // 담당자에게 이메일 발송
        await sendEmail({
          to: task.assignee_email,
          subject: `[공정협의체] 새로운 안건: ${task.agenda}`,
          html: createInitialEmailTemplate(task),
        });

        // 요청부서에도 이메일 발송 (있는 경우)
        if (task.requester_email) {
          await sendEmail({
            to: task.requester_email,
            subject: `[공정협의체] 안건 접수 확인: ${task.agenda}`,
            html: createRequesterEmailTemplate(task),
          });
        }

        // 이메일 로그 저장
        await supabase.from('email_logs').insert([
          {
            task_id: task.id,
            recipient_email: task.assignee_email,
            email_type: 'initial',
            status: 'sent',
          },
        ]);

        if (task.requester_email) {
          await supabase.from('email_logs').insert([
            {
              task_id: task.id,
              recipient_email: task.requester_email,
              email_type: 'initial',
              status: 'sent',
            },
          ]);
        }

        // 초기 이메일 발송 완료 표시
        await supabase
          .from('tasks')
          .update({ initial_email_sent: true })
          .eq('id', task.id);

        sentCount++;
      } catch (emailError: any) {
        console.error(`이메일 발송 실패 (Task ${task.id}):`, emailError);
        errors.push({ taskId: task.id, error: emailError.message });

        // 실패 로그 저장
        await supabase.from('email_logs').insert([
          {
            task_id: task.id,
            recipient_email: task.assignee_email,
            email_type: 'initial',
            status: 'failed',
          },
        ]);
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      total: tasks.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('이메일 발송 오류:', error);
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
