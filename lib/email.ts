import nodemailer from 'nodemailer';

// Gmail SMTP 설정
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// 이메일 발송 함수
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"공정협의체 안건 관리" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('이메일 발송 성공:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('이메일 발송 실패:', error);
    throw error;
  }
}

// 이메일 템플릿
export function createInitialEmailTemplate(task: {
  agenda: string;
  solution?: string;
  assignee_email: string;
  due_date?: string;
  notes?: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background-color: #f3f4f6; padding: 20px; border-radius: 0 0 8px 8px; }
        .info-box { background-color: white; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid #3b82f6; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">새로운 안건이 할당되었습니다</h2>
        </div>
        <div class="content">
          <div class="info-box">
            <p><strong>📋 안건:</strong> ${task.agenda}</p>
            ${task.solution ? `<p><strong>💡 해결방안:</strong> ${task.solution}</p>` : ''}
            <p><strong>👤 담당자:</strong> ${task.assignee_email}</p>
            ${
              task.due_date
                ? `<p><strong>📅 완료예상일정:</strong> ${new Date(task.due_date).toLocaleDateString('ko-KR')}</p>`
                : ''
            }
            ${task.notes ? `<p><strong>📝 비고:</strong> ${task.notes}</p>` : ''}
          </div>
          <p>이 안건은 완료될 때까지 <strong>매일 오전 9시</strong>에 알림이 발송됩니다.</p>
        </div>
        <div class="footer">
          <p>이 메일은 공정협의체 안건 관리 시스템에서 자동으로 발송되었습니다.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function createRequesterEmailTemplate(task: {
  agenda: string;
  solution?: string;
  assignee_email: string;
  due_date?: string;
  notes?: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background-color: #f3f4f6; padding: 20px; border-radius: 0 0 8px 8px; }
        .info-box { background-color: white; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid #10b981; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">안건이 접수되었습니다</h2>
        </div>
        <div class="content">
          <div class="info-box">
            <p><strong>📋 안건:</strong> ${task.agenda}</p>
            ${task.solution ? `<p><strong>💡 해결방안:</strong> ${task.solution}</p>` : ''}
            <p><strong>👤 담당자:</strong> ${task.assignee_email}</p>
            ${
              task.due_date
                ? `<p><strong>📅 완료예상일정:</strong> ${new Date(task.due_date).toLocaleDateString('ko-KR')}</p>`
                : ''
            }
            ${task.notes ? `<p><strong>📝 비고:</strong> ${task.notes}</p>` : ''}
          </div>
          <p>담당자가 해당 안건을 처리할 예정입니다.</p>
        </div>
        <div class="footer">
          <p>이 메일은 공정협의체 안건 관리 시스템에서 자동으로 발송되었습니다.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function createReminderEmailTemplate(
  task: {
    agenda: string;
    solution?: string;
    assignee_email: string;
    due_date?: string;
    notes?: string;
  },
  appUrl: string
) {
  const dueDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString('ko-KR')
    : '미정';

  let dueDateWarning = '';
  if (task.due_date) {
    const today = new Date();
    const due = new Date(task.due_date);
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 3600 * 24));

    if (diffDays < 0) {
      dueDateWarning = `<div style="background-color: #fee2e2; color: #dc2626; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid #dc2626;">
        <strong>⚠️ 주의:</strong> 마감일이 ${Math.abs(diffDays)}일 지났습니다!
      </div>`;
    } else if (diffDays <= 3) {
      dueDateWarning = `<div style="background-color: #fef3c7; color: #f59e0b; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid #f59e0b;">
        <strong>⚠️ 알림:</strong> 마감일이 ${diffDays}일 남았습니다!
      </div>`;
    }
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f59e0b; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background-color: #f3f4f6; padding: 20px; border-radius: 0 0 8px 8px; }
        .info-box { background-color: white; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid #f59e0b; }
        .button { display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin: 15px 0; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">📢 진행 중인 안건 알림</h2>
        </div>
        <div class="content">
          ${dueDateWarning}
          <div class="info-box">
            <p><strong>📋 안건:</strong> ${task.agenda}</p>
            ${task.solution ? `<p><strong>💡 해결방안:</strong> ${task.solution}</p>` : ''}
            <p><strong>👤 담당자:</strong> ${task.assignee_email}</p>
            <p><strong>📅 완료예상일정:</strong> ${dueDate}</p>
            ${task.notes ? `<p><strong>📝 비고:</strong> ${task.notes}</p>` : ''}
          </div>
          <p>이 안건은 아직 진행 중입니다. 완료 후 대시보드에서 상태를 변경해주세요.</p>
          <a href="${appUrl}/dashboard" class="button">대시보드 바로가기</a>
        </div>
        <div class="footer">
          <p>이 메일은 매일 오전 9시(KST)에 자동으로 발송됩니다.<br>
          업무 완료 시 알림이 중단됩니다.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
