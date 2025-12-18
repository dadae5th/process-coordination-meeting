# 🔧 Vercel 배포 문제 해결

## 현재 에러: MIDDLEWARE_INVOCATION_FAILED

### 원인
Vercel에서 환경 변수가 제대로 설정되지 않았거나 Supabase 연결에 문제가 있습니다.

### 해결 방법

#### 1️⃣ Vercel 환경 변수 확인

https://vercel.com/dadae5th/process-coordination-meeting/settings/environment-variables

**다음 환경 변수가 모두 설정되어 있는지 확인:**

```
NEXT_PUBLIC_SUPABASE_URL=https://vfxhtqycdizadiknpsaq.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGh0cXljZGl6YWRpa25wc2FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTQzOTgsImV4cCI6MjA4MTUzMDM5OH0.OhxOLgOMWpcNLANH9x501_oCyFSDwYPEcCWakQlzdk0

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGh0cXljZGl6YWRpa25wc2FxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTk1NDM5OCwiZXhwIjoyMDgxNTMwMzk4fQ.nX6fJ6QqZw17_XKTrgPBegYBnIBiAFOSNE5cXfMN83M

GMAIL_USER=dadae5th@gmail.com

GMAIL_APP_PASSWORD=kptwwtdbavjgajly

NEXT_PUBLIC_APP_URL=https://process-coordination-meeting.vercel.app

CRON_SECRET=QLGAaE97RSVefJthZTB3850YncMzNP4g
```

⚠️ **중요**: 각 변수 앞뒤에 공백이 없어야 합니다!

#### 2️⃣ 환경 변수 적용 범위 확인

각 환경 변수의 체크박스:
- ✅ Production
- ✅ Preview  
- ✅ Development

모두 체크되어 있어야 합니다!

#### 3️⃣ 재배포

환경 변수 설정 후:
1. Deployments 페이지로 이동
2. 최신 배포 옆의 **⋯** 메뉴 클릭
3. **"Redeploy"** 선택
4. 2-3분 대기

#### 4️⃣ 배포 로그 확인

https://vercel.com/dadae5th/process-coordination-meeting/deployments

최신 배포를 클릭하여 에러 로그 확인

---

## 대안: 간단한 수정

middleware가 문제라면 임시로 비활성화할 수 있습니다:

```bash
# middleware.ts 파일 이름 변경 (백업)
mv middleware.ts middleware.ts.backup
```

하지만 이렇게 하면 인증이 작동하지 않으므로 권장하지 않습니다.
