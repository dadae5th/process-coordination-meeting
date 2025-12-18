# ✅ Resend → Gmail 전환 완료!

## 🎯 변경 사항 요약

### 이전 (Resend)
- ❌ 월 3,000통 제한
- ❌ 도메인 인증 필요
- ❌ 무료 플랜에서 제한적

### 현재 (Gmail)
- ✅ 하루 2,000통 완전 무료
- ✅ 도메인 인증 불필요
- ✅ 간단한 설정 (5분)
- ✅ 높은 전달률

---

## 📦 설치된 패키지

```json
{
  "제거": "resend",
  "추가": "nodemailer, @types/nodemailer"
}
```

---

## 📝 수정된 파일

### 1. 환경변수 파일
- ✅ `.env.local`
- ✅ `.env.local.example`

**변경사항**:
```diff
- RESEND_API_KEY=your_resend_api_key
+ GMAIL_USER=your_email@gmail.com
+ GMAIL_APP_PASSWORD=your_16_char_app_password
```

### 2. 이메일 유틸리티
- ✅ `lib/email.ts` (새로 생성)
  - Nodemailer 설정
  - 이메일 템플릿 함수
  - sendEmail 헬퍼 함수

### 3. API 라우트
- ✅ `app/api/tasks/send-initial-emails/route.ts`
- ✅ `app/api/cron/daily-reminders/route.ts`

**변경사항**:
- Resend API 호출 → Nodemailer sendEmail 호출
- 이메일 템플릿을 별도 함수로 분리

### 4. 문서
- ✅ `README.md`
- ✅ `QUICKSTART.md`
- ✅ `SETUP_GUIDE.md`
- ✅ `PROJECT_SUMMARY.md`
- ✅ `GMAIL_SETUP.md` (새로 생성)

---

## 🚀 다음 단계

### 1. Gmail 앱 비밀번호 생성

자세한 내용은 **`GMAIL_SETUP.md`** 참고

**요약**:
1. Google 계정 → 보안 → 2단계 인증 활성화
2. https://myaccount.google.com/apppasswords
3. 앱 이름 입력 → 생성
4. 16자리 비밀번호 복사 (공백 제거!)

### 2. 환경변수 설정

`.env.local` 파일 수정:

```env
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop  # 16자리, 공백 없이
```

### 3. 개발 서버 실행

```powershell
npm run dev
```

### 4. 이메일 발송 테스트

1. 회원가입/로그인
2. 엑셀 파일 업로드 (본인 이메일 주소 사용)
3. "이메일 발송" 버튼 클릭
4. 이메일 수신 확인

---

## 🔧 설정 예시

### 올바른 설정

```env
GMAIL_USER=hong.gildong@gmail.com
GMAIL_APP_PASSWORD=xyzw1234abcd5678
```

### 잘못된 설정

```env
# ❌ 일반 Gmail 비밀번호 사용
GMAIL_APP_PASSWORD=MyGmailPassword123

# ❌ 공백 포함
GMAIL_APP_PASSWORD=xyzw 1234 abcd 5678

# ❌ 2단계 인증 미활성화
```

---

## 📊 Gmail vs Resend 비교

| 항목 | Gmail (무료) | Resend (무료) |
|------|--------------|---------------|
| **월간 한도** | 60,000통 (2,000/일) | 3,000통 |
| **비용** | 완전 무료 | 무료 |
| **설정 난이도** | 쉬움 (5분) | 보통 (도메인 인증 필요) |
| **도메인 인증** | 불필요 | 필수 (실제 발송 시) |
| **전달률** | 높음 | 높음 |
| **테스트** | 모든 이메일 가능 | 본인 이메일만 |

**결론**: Gmail이 개인/소규모 프로젝트에 더 적합! ✅

---

## 🎓 학습 리소스

### Gmail 설정
- **GMAIL_SETUP.md**: 상세한 Gmail 앱 비밀번호 설정 가이드
- [Google 공식 가이드](https://support.google.com/accounts/answer/185833)

### Nodemailer
- [공식 문서](https://nodemailer.com/about/)
- [Gmail 설정](https://nodemailer.com/usage/using-gmail/)

### 프로젝트 문서
- **QUICKSTART.md**: 5분 빠른 시작
- **SETUP_GUIDE.md**: 전체 설정 가이드
- **README.md**: 프로젝트 개요

---

## ⚡ 주요 이점

### 1. 비용 절감
- Resend 유료 플랜: $20/월
- Gmail: **완전 무료**

### 2. 간편한 설정
- 도메인 구매/인증 불필요
- DNS 설정 불필요
- 5분 안에 설정 완료

### 3. 충분한 용량
- 하루 2,000통
- 대부분의 안건 관리 시스템에 충분

### 4. 높은 신뢰도
- Google의 안정적인 인프라
- 높은 전달률
- 스팸 필터링 우수

---

## 🐛 문제 해결

### 이메일이 발송되지 않음

**1. 환경변수 확인**:
```powershell
Get-Content .env.local
```

**2. 공백 제거 확인**:
- 앱 비밀번호에 공백이 있으면 안 됨!
- `abcd efgh ijkl mnop` → `abcdefghijklmnop`

**3. 2단계 인증 확인**:
- https://myaccount.google.com/security

**4. 개발 서버 재시작**:
```powershell
npm run dev
```

**5. 터미널 로그 확인**:
- "이메일 발송 성공" 메시지 찾기
- 오류 메시지가 있다면 내용 확인

### "Invalid login" 오류

**원인**: 일반 Gmail 비밀번호를 사용함

**해결**: 앱 비밀번호를 생성하고 사용
- https://myaccount.google.com/apppasswords

### 스팸 폴더에 도착

**정상입니다**:
- 처음 발송 시 스팸으로 분류될 수 있음
- "스팸 아님"으로 표시하면 다음부터는 정상 수신

---

## 🎉 완료!

이제 **Gmail을 사용하여 완전 무료**로 이메일 알림을 보낼 수 있습니다!

**다음**: `QUICKSTART.md`를 따라 시작하세요! 🚀

---

## 📞 도움이 필요하신가요?

- **Gmail 설정**: `GMAIL_SETUP.md` 참고
- **빠른 시작**: `QUICKSTART.md` 참고
- **상세 가이드**: `SETUP_GUIDE.md` 참고
- **전체 요약**: `PROJECT_SUMMARY.md` 참고
