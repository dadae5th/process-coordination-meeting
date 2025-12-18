# 공정협의체 안건 관리 시스템 - 설정 가이드

## 📋 목차

1. [Supabase 설정](#1-supabase-설정)
2. [Gmail 설정](#2-gmail-설정)
3. [환경변수 설정](#3-환경변수-설정)
4. [개발 서버 실행](#4-개발-서버-실행)
5. [Vercel 배포](#5-vercel-배포)

---

## 1. Supabase 설정

### 1-1. 프로젝트 생성

1. https://supabase.com 접속
2. "New Project" 클릭
3. Organization 선택 또는 새로 생성
4. 프로젝트 정보 입력:
   - Name: `process-coordination-meeting` (또는 원하는 이름)
   - Database Password: 안전한 비밀번호 생성 (저장해두기)
   - Region: `Northeast Asia (Seoul)` 선택 (가장 가까운 지역)
5. "Create new project" 클릭 (약 2분 소요)

### 1-2. 데이터베이스 스키마 실행

1. 프로젝트 생성 완료 후, 왼쪽 메뉴에서 "SQL Editor" 클릭
2. "New Query" 클릭
3. 프로젝트의 `supabase-schema.sql` 파일 내용을 복사하여 붙여넣기
4. "Run" 버튼 클릭 (또는 Ctrl+Enter)
5. "Success" 메시지 확인

### 1-3. API 키 확인

1. 왼쪽 메뉴에서 "Project Settings" (톱니바퀴 아이콘) 클릭
2. "API" 탭 선택
3. 다음 정보를 복사해두기:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`에 사용
   - **anon public**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 사용
   - **service_role**: `SUPABASE_SERVICE_ROLE_KEY`에 사용 (보안 주의!)

---

## 2. Gmail 설정

### 2-1. 2단계 인증 활성화 (필수)

1. https://myaccount.google.com/security 접속
2. "Google에 로그인하는 방법" 섹션에서 "2단계 인증" 클릭
3. 화면 안내에 따라 2단계 인증 설정
   - 전화번호 입력
   - 인증 코드 확인
   - 2단계 인증 활성화 완료

### 2-2. 앱 비밀번호 생성

1. https://myaccount.google.com/apppasswords 접속
   - (2단계 인증이 활성화되어 있어야 접근 가능)
2. "앱 선택" 드롭다운에서 "기타(맞춤 이름)" 선택
3. 이름 입력: `공정협의체 안건 관리`
4. "생성" 버튼 클릭
5. **16자리 앱 비밀번호가 표시됨** (예: `abcd efgh ijkl mnop`)
6. 이 비밀번호를 **공백 없이** 복사: `abcdefghijklmnop`
7. 안전한 곳에 저장 (다시 볼 수 없음)

### 2-3. 주의사항

⚠️ **중요:**
- 앱 비밀번호는 일반 Gmail 비밀번호와 다릅니다
- 16자리 코드에서 **공백을 제거**하고 사용해야 합니다
- 2단계 인증 없이는 앱 비밀번호를 생성할 수 없습니다
- 앱 비밀번호를 분실한 경우, 기존 것을 삭제하고 새로 생성하세요

### 2-4. 장점

✅ **완전 무료**
- 하루 2,000통까지 무료 발송
- 별도 결제 필요 없음

✅ **설정 간단**
- 복잡한 도메인 인증 불필요
- 5분 안에 설정 완료

✅ **안정적**
- Google의 안정적인 SMTP 서버 사용
- 높은 전달률

---

## 3. 환경변수 설정

### 3-1. .env.local 파일 수정

프로젝트 루트의 `.env.local` 파일을 열고 다음 값을 입력:

```env
# Supabase (1단계에서 복사한 값)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Gmail (2단계에서 생성한 값)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop  # 16자리, 공백 없이

# 애플리케이션 URL (로컬 개발 시)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cron Secret (임의의 강력한 비밀번호 생성)
# PowerShell: -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
CRON_SECRET=your_random_very_strong_secret_key_here
```

### 3-2. 보안 주의사항

⚠️ **절대 Git에 커밋하지 마세요!**

- `.env.local` 파일은 `.gitignore`에 포함되어 있습니다.
- `SUPABASE_SERVICE_ROLE_KEY`는 모든 보안 규칙을 우회할 수 있으므로 특히 주의!

---

## 4. 개발 서버 실행

### 4-1. 의존성 설치 확인

```powershell
npm install
```

### 4-2. 개발 서버 시작

```powershell
npm run dev
```

### 4-3. 브라우저에서 확인

http://localhost:3000 접속

### 4-4. 테스트 순서

1. **회원가입**: http://localhost:3000/signup
   - 이메일, 비밀번호, 이름 입력
   
2. **로그인**: http://localhost:3000/login
   - 생성한 계정으로 로그인
   
3. **대시보드**: http://localhost:3000/dashboard
   - 자동으로 리다이렉트됨
   
4. **엑셀 업로드 테스트**:
   - 샘플 엑셀 파일 생성 (Excel, Google Sheets 등)
   - 칼럼: 안건, 해결방안, 담당자, 요청부서, 완료예상일정, 비고
   - 담당자와 요청부서에는 실제 이메일 주소 입력
   - 파일 업로드
   
5. **이메일 발송 테스트**:
   - "이메일 발송" 버튼 클릭
   - 입력한 이메일 주소로 알림 도착 확인

---

## 5. Vercel 배포

### 5-1. GitHub 저장소 생성

```powershell
# Git 초기화 (아직 안 했다면)
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Process coordination meeting system"

# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/yourusername/process-coordination-meeting.git
git branch -M main
git push -u origin main
```

### 5-2. Vercel 프로젝트 생성

1. https://vercel.com 접속 및 로그인 (GitHub 계정 연동)
2. "Add New..." > "Project" 클릭
3. GitHub 저장소 검색 및 선택
4. "Import" 클릭

### 5-3. 환경변수 설정

"Environment Variables" 섹션에서 다음 변수들을 추가:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | (Supabase URL) | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (Anon Key) | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | (Service Role Key) | Production, Preview, Development |
| `GMAIL_USER` | your_email@gmail.com | Production, Preview, Development |
| `GMAIL_APP_PASSWORD` | (16자리 앱 비밀번호) | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | https://your-app.vercel.app | Production |
| `CRON_SECRET` | (동일한 시크릿) | Production, Preview, Development |

### 5-4. 배포

1. "Deploy" 버튼 클릭
2. 빌드 완료 대기 (약 2-3분)
3. 배포 URL 확인 (예: `https://process-coordination-meeting.vercel.app`)

### 5-5. Cron Job 확인

1. Vercel 대시보드 > 프로젝트 선택
2. "Cron Jobs" 탭 클릭
3. `/api/cron/daily-reminders` 작업 확인
4. Schedule: `0 0 * * *` (매일 UTC 자정 = 한국 시간 오전 9시)

---

## 🎉 완료!

이제 시스템을 사용할 수 있습니다:

1. ✅ 회원가입/로그인
2. ✅ 엑셀 파일로 안건 업로드
3. ✅ 자동 이메일 알림 (매일 오전 9시 한국 시간)
4. ✅ 대시보드에서 안건 관리

---

## ❓ 문제 해결

### 이메일이 발송되지 않는 경우

1. **Gmail 설정 확인**:
   - 2단계 인증이 활성화되어 있는지 확인
   - 앱 비밀번호가 올바른지 확인 (공백 없이 16자리)
   - `.env.local` 또는 Vercel 환경변수에 올바르게 입력되었는지 확인

2. **Gmail 계정 제한**:
   - 하루 2,000통 제한 (Gmail 무료 계정)
   - "보안 수준이 낮은 앱의 액세스" 설정 불필요 (앱 비밀번호 사용 시)

3. **스팸 폴더 확인**:
   - 받은 편지함에 없다면 스팸 확인

4. **오류 로그 확인**:
   - 터미널 또는 Vercel 로그에서 오류 메시지 확인

### Cron Job이 실행되지 않는 경우

1. **Vercel Pro 플랜**:
   - Hobby 플랜은 베스트 에포트 (보장되지 않음)
   - Pro 플랜에서는 보장된 실행

2. **로그 확인**:
   - Vercel Dashboard > Logs
   - Cron Jobs 탭에서 실행 내역 확인

3. **Authorization 헤더**:
   - Vercel Cron은 자동으로 `Authorization: Bearer {CRON_SECRET}` 헤더 추가
   - 환경변수가 올바른지 확인

### 로그인/회원가입 오류

1. **Supabase 설정 확인**:
   - SQL 스키마가 올바르게 실행되었는지 확인
   - Auth > Settings에서 이메일 인증 비활성화 (개발 시)

2. **환경변수 확인**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Gmail 앱 비밀번호 관련

**앱 비밀번호를 찾을 수 없는 경우**:
1. 2단계 인증이 활성화되어 있는지 확인
2. https://myaccount.google.com/apppasswords 직접 접속
3. 2단계 인증 메뉴에서 "앱 비밀번호" 찾기

**"보안 수준이 낮은 앱의 액세스" 메시지**:
- 이 설정은 더 이상 사용되지 않습니다
- 대신 앱 비밀번호를 사용하세요 (더 안전함)

---

## 📞 지원

문제가 지속되면:
- Supabase: https://supabase.com/docs
- Gmail 앱 비밀번호: https://support.google.com/accounts/answer/185833
- Nodemailer: https://nodemailer.com/about/
- Vercel: https://vercel.com/docs

---

**제작**: 공정협의체 안건 관리 시스템 v1.0
