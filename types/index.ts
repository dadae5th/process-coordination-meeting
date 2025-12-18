export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  department?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  agenda: string; // 안건
  solution?: string; // 해결방안
  assignee_email: string; // 담당자 이메일
  requester_email?: string; // 요청부서 이메일
  due_date?: string; // 완료예상일정
  notes?: string; // 비고
  status: 'pending' | 'completed'; // 상태
  owner_id: string; // 업로드한 사용자
  initial_email_sent: boolean; // 초기 이메일 발송 여부
  created_at: string;
  updated_at: string;
}

export interface EmailLog {
  id: string;
  task_id: string;
  recipient_email: string;
  email_type: 'initial' | 'reminder';
  sent_at: string;
  status: 'sent' | 'failed';
}

export interface ExcelRow {
  안건: string;
  해결방안?: string;
  담당자: string; // 이메일 형식
  요청부서?: string; // 이메일 형식
  완료예상일정?: string; // 날짜 형식
  비고?: string;
}

export interface TaskFormData {
  agenda: string;
  solution?: string;
  assignee_email: string;
  requester_email?: string;
  due_date?: string;
  notes?: string;
}
