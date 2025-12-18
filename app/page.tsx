import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            공정협의체 안건 관리 시스템
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            엑셀로 쉽게 업로드하고, 자동으로 이메일 알림을 받으세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">📊 엑셀 업로드</h3>
            <p className="text-blue-700">
              엑셀 파일을 드래그 앤 드롭하면 자동으로 안건이 등록됩니다.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">📧 자동 알림</h3>
            <p className="text-green-700">
              매일 오전 9시, 완료되지 않은 업무를 담당자에게 자동으로 알려드립니다.
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">👥 사용자별 관리</h3>
            <p className="text-purple-700">
              로그인한 사용자별로 별도의 대시보드를 제공합니다.
            </p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">🔒 보안</h3>
            <p className="text-orange-700">
              비밀번호 인증으로 안전하게 데이터를 관리합니다.
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            회원가입
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">엑셀 파일 형식</h2>
          <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">안건</th>
                  <th className="px-4 py-2 text-left">해결방안</th>
                  <th className="px-4 py-2 text-left">담당자</th>
                  <th className="px-4 py-2 text-left">요청부서</th>
                  <th className="px-4 py-2 text-left">완료예상일정</th>
                  <th className="px-4 py-2 text-left">비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-t">시스템 개선</td>
                  <td className="px-4 py-2 border-t">API 최적화</td>
                  <td className="px-4 py-2 border-t">dev@company.com</td>
                  <td className="px-4 py-2 border-t">planning@company.com</td>
                  <td className="px-4 py-2 border-t">2025-01-15</td>
                  <td className="px-4 py-2 border-t">우선순위 높음</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            * 안건과 담당자 이메일은 필수 항목입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
