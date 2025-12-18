# Vercel 배포 가이드

이 가이드를 따라하면 PC를 꺼도 24시간 서버가 운영됩니다! ☁️

## 📋 배포 순서

### 1️⃣ GitHub에 코드 업로드

1. **GitHub 계정 생성** (없다면)
   - https://github.com/join 에서 가입

2. **GitHub에 새 저장소 만들기**
   - https://github.com/new
   - Repository name: `process-coordination-meeting`
   - Public 또는 Private 선택
   - **"Create repository"** 클릭

3. **로컬 코드를 GitHub에 푸시**
   ```powershell
   # Git 초기화 (아직 안했다면)
   git init
   
   # 모든 파일 추가
   git add .
   
   # 커밋
   git commit -m "Initial commit"
   
   # GitHub 저장소 연결 (YOUR_USERNAME을 본인 GitHub 아이디로 변경)
   git remote add origin https://github.com/YOUR_USERNAME/process-coordination-meeting.git
   
   # 코드 푸시
   git branch -M main
   git push -u origin main
   ```

### 2️⃣ Vercel에 배포

1. **Vercel 계정 생성**
   - https://vercel.com/signup
   - GitHub 계정으로 로그인하면 편함

2. **새 프로젝트 생성**
   - Dashboard에서 **"Add New Project"** 클릭
   - GitHub 저장소 `process-coordination-meeting` 선택
   - **"Import"** 클릭

3. **환경 변수 설정** ⚠️ 중요!
   - **Environment Variables** 섹션에 다음 값 입력:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://vfxhtqycdizadiknpsaq.supabase.co
   
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGh0cXljZGl6YWRpa25wc2FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTQzOTgsImV4cCI6MjA4MTUzMDM5OH0.OhxOLgOMWpcNLANH9x501_oCyFSDwYPEcCWakQlzdk0
   
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGh0cXljZGl6YWRpa25wc2FxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTk1NDM5OCwiZXhwIjoyMDgxNTMwMzk4fQ.nX6fJ6QqZw17_XKTrgPBegYBnIBiAFOSNE5cXfMN83M
   
   GMAIL_USER=dadae5th@gmail.com
   
   GMAIL_APP_PASSWORD=kptwwtdbavjgajly
   
   NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
   
   CRON_SECRET=QLGAaE97RSVefJthZTB3850YncMzNP4g
   ```
   
   ⚠️ **주의**: `NEXT_PUBLIC_APP_URL`은 배포 후에 다시 업데이트해야 합니다!

4. **배포 시작**
   - **"Deploy"** 버튼 클릭
   - 2-3분 정도 기다리면 배포 완료!

### 3️⃣ 배포 후 설정

1. **배포된 URL 확인**
   - 예: `https://process-coordination-meeting.vercel.app`

2. **환경 변수 업데이트**
   - Vercel Dashboard → Settings → Environment Variables
   - `NEXT_PUBLIC_APP_URL`을 실제 배포된 URL로 변경
   - **"Save"** 클릭

3. **재배포**
   - Deployments → 최신 배포 → ⋯ 메뉴 → "Redeploy"

4. **Supabase Redirect URL 추가**
   - https://supabase.com/dashboard/project/vfxhtqycdizadiknpsaq/auth/url-configuration
   - **"Redirect URLs"**에 추가:
     - `https://your-app-name.vercel.app/auth/callback`
     - `https://your-app-name.vercel.app`

### 4️⃣ Cron Job 동작 확인

Vercel의 Cron Jobs는 자동으로 설정됩니다 (`vercel.json` 파일에 정의됨).

- **매일 오전 9시 (한국시간)** 자동으로 이메일 발송
- Vercel Dashboard → Cron Jobs에서 실행 기록 확인 가능

## ✅ 완료!

이제 PC를 꺼도 서버가 계속 실행됩니다! 🎉

- **접속 주소**: `https://your-app-name.vercel.app`
- **모든 사용자**가 이 주소로 접속하여 대시보드 사용 가능
- **매일 오전 9시** 자동으로 담당자에게 이메일 발송

## 🔧 문제 해결

### 배포 실패시
1. Vercel Dashboard → Deployments → 실패한 배포 클릭
2. 로그 확인하여 에러 메시지 확인
3. 환경 변수가 모두 올바르게 설정되었는지 확인

### 이메일이 안오면
1. Vercel Dashboard → Cron Jobs → 실행 기록 확인
2. `GMAIL_APP_PASSWORD`가 올바른지 확인
3. Gmail에서 "덜 보안된 앱 액세스" 설정 확인

### 로그인이 안되면
1. Supabase SQL Editor에서 이메일 확인 처리:
   ```sql
   UPDATE auth.users 
   SET email_confirmed_at = NOW() 
   WHERE email_confirmed_at IS NULL;
   ```

## 📞 추가 도움말

- **Vercel 문서**: https://vercel.com/docs
- **Supabase 문서**: https://supabase.com/docs
- **Next.js 배포**: https://nextjs.org/docs/deployment
