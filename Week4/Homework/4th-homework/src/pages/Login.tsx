import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BoldLink, Button, FormRow } from '../components/index';

// [TODO] 로그인 성공시 마이페이지로 이동 및 userId 저장 (userId 저장 위치는 자유. localStorage, SessionStorage, ...)
// [TODO] 로그인 실패 처리(UI)

{/* [TODO] gap 토큰화 */}
const Login = () => {
  const [userId, setUserId] = useState<string>('');
  const [userPw, setUserPw] = useState<string>('');

  const navigate = useNavigate();

  // [TODO] 굳이 함수화하지 말까?
  const handleButtonClick = () => {
    // [TODO] 로그인 api 로직 추가

    navigate('/mypage');
  };

  const isButtonDisabled = () => {
    return userId === '' || userPw === '';
  };

  return (
    <main className="flex justify-center h-full">
      <section className="flex flex-col justify-center gap-5 w-md">
        <h1 className="text-3xl font-bold">로그인</h1>
        <form className="w-full">
          <fieldset className="flex flex-col gap-5">
            <legend className="sr-only">로그인 폼</legend>
            <FormRow
              id="user-id"
              label="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디를 입력하세요"
            />
            <FormRow
              id="user-pw"
              type="password"
              label="비밀번호"
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
            <Button
              label="로그인"
              onClick={handleButtonClick}
              disabled={isButtonDisabled()}
            />
          </fieldset>
        </form>
        <div className="flex justify-center">
          <BoldLink to="/signup" label="회원가입" />
        </div>
      </section>
    </main>
  );
};

export default Login;