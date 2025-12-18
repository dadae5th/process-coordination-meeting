import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, createReminderEmailTemplate } from '@/lib/email';

// Service Role Key를 사용하여 RLS 우회
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function GET(request: NextRequest) {
  try {
    // Cron 시크릿 검증 (보안)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 완료되지 않은 모든 업무 조회
    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', 'pending');

    if (tasksError) {
      console.error('업무 조회 오류:', tasksError);
      return NextResponse.json({ error: tasksError.message }, { status: 500 });
    }

    if (!tasks || tasks.length === 0) {
      return NextResponse.json({ message: '발송할 알림이 없습니다.', sent: 0 });
    }

    let sentCount = 0;
    const errors = [];

    for (const task of tasks) {
      try {
        // 담당자에게 알림 이메일 발송
        await sendEmail({
          to: task.assignee_email,
          subject: `[공정협의체 일일알림] ${task.agenda}`,
          html: createReminderEmailTemplate(task, process.env.NEXT_PUBLIC_APP_URL || ''),
        });

        // 이메일 로그 저장
        await supabase.from('email_logs').insert([
          {
            task_id: task.id,
            recipient_email: task.assignee_email,
            email_type: 'reminder',
            status: 'sent',
          },
        ]);

        sentCount++;
      } catch (emailError: any) {
        console.error(`이메일 발송 실패 (Task ${task.id}):`, emailError);
        errors.push({ taskId: task.id, error: emailError.message });

        // 실패 로그 저장
        await supabase.from('email_logs').insert([
          {
            task_id: task.id,
            recipient_email: task.assignee_email,
            email_type: 'reminder',
            status: 'failed',
          },
        ]);
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      total: tasks.length,
      timestamp: new Date().toISOString(),
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('Cron 작업 오류:', error);
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
