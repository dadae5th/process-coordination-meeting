# 로그인 문제 해결 가이드

## 문제: "fetch failed" 에러

### 원인
- Supabase API에 연결할 수 없음
- 네트워크/방화벽 문제
- 잘못된 세션 쿠키

### 해결 방법

#### 1. 브라우저 쿠키 삭제

**Chrome/Edge:**
1. `F12` 키 눌러 개발자 도구 열기
2. `Application` 탭 클릭
3. 왼쪽 `Cookies` → `http://localhost:3000` 클릭
4. 모든 쿠키 삭제 (우클릭 → Clear)
5. 페이지 새로고침 (`F5`)

**또는:**
1. 브라우저 설정 → 개인정보 보호
2. 쿠키 및 사이트 데이터 → 모든 쿠키 삭제
3. 브라우저 재시작

#### 2. Supabase SQL로 사용자 확인 처리

https://supabase.com/dashboard/project/vfxhtqycdizadiknpsaq/sql/new

다음 SQL 실행:

```sql
-- 모든 사용자의 이메일을 확인 처리
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email_confirmed_at IS NULL;

-- 생성된 사용자 확인
SELECT email, email_confirmed_at, created_at 
FROM auth.users 
ORDER BY created_at DESC;
```

#### 3. 새 계정으로 회원가입

1. http://localhost:3000/signup 접속
2. **새로운 이메일**로 회원가입 (예: test@example.com)
3. 로그인 시도

#### 4. 방화벽 확인

Windows Defender 방화벽이 Next.js를 차단하고 있을 수 있습니다:
- Windows 보안 → 방화벽 및 네트워크 보호
- "앱이 방화벽을 통과하도록 허용" 클릭
- Node.js 찾아서 **개인** 및 **공용** 모두 체크

#### 5. VPN/프록시 비활성화

VPN이나 회사 프록시가 Supabase 연결을 차단할 수 있습니다.
