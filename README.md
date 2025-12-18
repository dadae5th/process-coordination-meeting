# 공정협의체 안건 관리 시스템

Next.js, Supabase, Gmail SMTP를 사용한 안건 관리 및 이메일 알림 시스템입니다.

## 주요 기능

- ✅ **사용자 인증**: Supabase Auth를 통한 회원가입/로그인
- ✅ **엑셀 업로드**: XLSX 파일로 안건 일괄 업로드
- ✅ **대시보드**: 사용자별 안건 관리 (추가/삭제/상태 변경)
- ✅ **자동 이메일 알림**: 
  - 초기 업로드 시 담당자 및 요청부서에 알림
  - 매일 오전 9시(KST) 진행 중인 업무 알림
- ✅ **보안**: Row Level Security(RLS)로 사용자별 데이터 격리

## 기술 스택

- **프론트엔드**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **백엔드**: Next.js API Routes
- **데이터베이스**: Supabase (PostgreSQL)
- **인증**: Supabase Auth
- **이메일**: Gmail SMTP (Nodemailer)
- **스케줄링**: Vercel Cron Jobs
- **배포**: Vercel

## 설치 및 설정

### 1. 패키지 설치

이미 필요한 패키지가 설치되어 있습니다. 추가 설치가 필요한 경우:

```bash
npm install
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. SQL Editor에서 `supabase-schema.sql` 파일의 내용을 실행
3. Project Settings > API에서 URL과 API Keys 확인

### 3. Gmail 설정

1. Google 계정에서 2단계 인증 활성화
2. [앱 비밀번호 생성](https://myaccount.google.com/apppasswords)
3. 16자리 앱 비밀번호 복사 (공백 제거)

### 4. 환경변수 설정

`.env.local` 파일에 다음 내용을 입력:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Gmail
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cron Secret
CRON_SECRET=your_random_secret_string
```

### 5. 개발 서버 실행

```bash
npm run dev
```

## 엑셀 파일 형식

| 안건 | 해결방안 | 담당자 | 요청부서 | 완료예상일정 | 비고 |
|------|----------|--------|----------|--------------|------|
| 시스템 개선 | API 최적화 | dev@company.com | planning@company.com | 2025-01-15 | 우선순위 높음 |

- **필수**: 안건, 담당자 (이메일 형식)
- **선택**: 해결방안, 요청부서 (이메일 형식), 완료예상일정, 비고

## 배포 (Vercel)

1. GitHub에 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 환경변수 설정
4. Deploy

**참고**: Vercel Cron은 UTC 기준입니다. `vercel.json`에서 스케줄 조정 가능.

## Getting Started (기본 Next.js 명령어)

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
