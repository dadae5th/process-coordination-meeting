# 🚀 빠른 시작 가이드

5분 안에 공정협의체 안건 관리 시스템을 시작하는 방법입니다.

## ✅ 체크리스트

- [ ] Node.js 18 이상 설치 확인
- [ ] Supabase 계정 생성
- [ ] Resend 계정 생성
- [ ] 환경변수 설정
- [ ] 개발 서버 실행

---

## 1️⃣ Supabase 설정 (2분)

### 프로젝트 생성
1. https://supabase.com → 로그인/회원가입
2. "New Project" 클릭
3. 프로젝트 이름 입력, Seoul 리전 선택
4. 프로젝트 생성 대기

### 데이터베이스 스키마 적용
1. SQL Editor 메뉴 클릭
2. 프로젝트의 `supabase-schema.sql` 파일 내용 복사
3. SQL Editor에 붙여넣기 후 "Run" 클릭

### API 키 복사
1. Project Settings → API
2. 다음 3개 값 복사:
   - `URL`
   - `anon public`
   - `service_role`

---

## 2️⃣ Gmail 앱 비밀번호 생성 (2분)

1. Google 계정 → 보안 → **2단계 인증 활성화** (필수)
2. https://myaccount.google.com/apppasswords 접속
3. 앱 이름 입력 (예: "공정협의체")
4. **16자리 앱 비밀번호 복사** (공백 제거하여 사용)

---

## 3️⃣ 환경변수 설정 (1분)

`.env.local` 파일에 복사한 값 입력:

```env
NEXT_PUBLIC_SUPABASE_URL=여기에_Supabase_URL_붙여넣기
NEXT_PUBLIC_SUPABASE_ANON_KEY=여기에_anon_key_붙여넣기
SUPABASE_SERVICE_ROLE_KEY=여기에_service_role_key_붙여넣기
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=16자리_앱_비밀번호_공백없이
NEXT_PUBLIC_APP_URL=http://localhost:3000
CRON_SECRET=임의의_강력한_비밀번호_입력
```

---

## 4️⃣ 실행 (1분)

```powershell
# 패키지 설치 (처음 한 번만)
npm install

# 개발 서버 시작
npm run dev
```

http://localhost:3000 접속!

---

## 5️⃣ 첫 사용

1. **회원가입**: http://localhost:3000/signup
2. **로그인**: 생성한 계정으로 로그인
3. **엑셀 파일 준비**:
   - 칼럼: 안건, 해결방안, 담당자, 요청부서, 완료예상일정, 비고
   - 담당자/요청부서에는 본인 이메일 주소 입력 (테스트용)
4. **업로드**: 대시보드에서 엑셀 파일 업로드
5. **이메일 발송**: "이메일 발송" 버튼 클릭

---

## 🐛 문제 해결

### "Invalid Supabase URL" 오류
→ `.env.local` 파일의 환경변수가 올바른지 확인

### 이메일이 오지 않음
→ 스팸 폴더 확인
→ Gmail 앱 비밀번호가 올바른지 확인 (공백 제거)
→ 2단계 인증이 활성화되어 있는지 확인

### 로그인이 안됨
→ Supabase SQL 스키마가 올바르게 실행되었는지 확인

---

## 📖 상세 가이드

더 자세한 내용은 `SETUP_GUIDE.md`를 참고하세요.

## 🎯 다음 단계

- [ ] Vercel에 배포
- [ ] 실제 도메인에서 Resend 인증
- [ ] 팀원들에게 공유

---

**Happy Coding! 🎉**
