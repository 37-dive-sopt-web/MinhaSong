import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { BoldLink, Button, FormRow } from '../components/index';
import { ArrowLeft } from 'lucide-react';

// [TODO] gap 토큰화
const Signup = () => {
  const [isUserIdForm, setIsUserIdForm] = useState<boolean>(true);
  const [isUserPwForm, setIsUserPwForm] = useState<boolean>(false);
  const [isUserInfoForm, setIsUserInfoForm] = useState<boolean>(false);

  const [userId, setUserId] = useState<string>('');
  const [userPw, setUserPw] = useState<string>('');
  const [userPwConfirm, setUserPwConfirm] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userAge, setUserAge] = useState<number | ''>('');
  // [TODO] userAge 기본값 0으로 하면 input에 0 떠있음.. 그래서 string도 추가했는디 보통 어떻게 하는지

  const [userPwTouched, setUserPwTouched] = useState<boolean>(false);
  const [userEmailTouched, setUserEmailTouched] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isUserIdForm) {
      setIsUserIdForm(false);
      setIsUserPwForm(true);
    } else if (isUserPwForm) {
      setIsUserPwForm(false);
      setIsUserInfoForm(true);
    } else {
      setIsUserInfoForm(false);
      setIsUserIdForm(true);

      // 회원가입 로직
      // [TODO] 회원가입 실패 시 에러메시지 alert 출력
      // [TODO] 회원가입 성공 시 alert에 이름 출력 및 login 페이지로 이동

      alert(userName);
      navigate('/login');
    }
  };

  const isUserIdValid = () => {
    return userId.length <= 50;
  };

  // [TODO] utils로 분리?
  // [TODO] 인수로 전달해줘 아님 그냥 상태에 바로 접근해서 해?
  const checkLength = () => {
    return 8 <= userPw.length && userPw.length <= 64;
  };

  const checkLowerIncluded = () => {
    return /[a-z]/.test(userPw);
  };

  const checkUpperIncluded = () => {
    return /[A-Z]/.test(userPw);
  };

  const checkNumIncluded = () => {
    return /[0-9]/.test(userPw);
  };

  const checkSpecialCharIncluded = () => {
    return /[!@#$%^&*()]/.test(userPw);
  };

  const checkBlankIncluded = () => {
    return /\s/.test(userPw);
  };

  const isUserPwConfirmEmpty = () => {
    return userPwConfirm === '';
  };

  const isPwUnmatched = () => {
    return userPw !== userPwConfirm;
  };

  const isUserPwValid = () => {
    if (!checkLength()) return false;
    else if (!checkUpperIncluded()) return false;
    else if (!checkNumIncluded()) return false;
    else if (!checkSpecialCharIncluded()) return false;
    else if (!checkLowerIncluded()) return false;
    else if (checkBlankIncluded()) return false;
    else if (isUserPwConfirmEmpty()) return false;
    else if (isPwUnmatched()) return false;
    else return true;
  };

  const getUserPwError = () => {
    if (!checkLength()) return "8~64자로 입력해주세요";
    if (!checkUpperIncluded()) return "대문자를 포함해주세요";
    if (!checkNumIncluded()) return "숫자를 포함해주세요";
    if (!checkSpecialCharIncluded()) return "특수문자를 포함해주세요";
    if (!checkLowerIncluded()) return "소문자를 포함해주세요";
    if (checkBlankIncluded()) return "공백은 포함될 수 없어요"
    if (isUserPwConfirmEmpty()) return "비밀번호를 모두 입력해주세요";
    if (isPwUnmatched()) return "비밀번호가 일치하지 않아요";
    return null;
  };

  const isUserEmailValid = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
  };

  // [TODO] utils로 뺄까?
  const isButtonDisabled = () => {
    return (!!isUserIdForm && (userId === '' || !isUserIdValid()))
      || (!!isUserPwForm && (userPw === '' || !isUserPwValid()))
      || (!!isUserInfoForm && (userName === '' || userEmail === '' || userAge === '' || !isUserEmailValid()));
  };

  return (
    <main className="flex justify-center h-full">
      <section className="flex flex-col justify-center gap-5 w-md">
        {/* [TODO] 뒤로가기 보통 어떻게 하지 / 로그인으로 이동하는건지 이점 폼으로 이동하는건지 */}
        <Link to="/login" aria-label="로그인 페이지로 이동">
          <ArrowLeft color='#3983EF' size={24} />
        </Link>
        <h1 className="text-3xl font-bold">회원가입</h1>
        <form className="w-full">
          <fieldset className="flex flex-col gap-5">
            <legend className="sr-only">회원가입 폼</legend>
            {
              isUserIdForm && (
                <FormRow
                  id="userId"
                  label="아이디"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="아이디를 입력하세요"
                />
              )
            }
            {
              isUserPwForm && (
                <>
                  <FormRow
                    id="userPw"
                    type="password"
                    label="비밀번호"
                    value={userPw}
                    onChange={(e) => { setUserPw(e.target.value); setUserPwTouched(true); }}
                    placeholder="비밀번호를 입력하세요"
                  />
                  <FormRow
                    id="userPwConfirm"
                    type="password"
                    label="비밀번호 확인"
                    value={userPwConfirm}
                    onChange={(e) => setUserPwConfirm(e.target.value)}
                    placeholder="비밀번호 확인"
                  />
                </>
              )
            }
            {
              isUserInfoForm && (
                <>
                  <FormRow
                    id="userName"
                    label="이름"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="이름을 입력하세요"
                  />
                  <FormRow
                    id="userEmail"
                    type="email"
                    label="이메일"
                    value={userEmail}
                    onChange={(e) => { setUserEmail(e.target.value); setUserEmailTouched(true); }}
                    placeholder="name@example.com"
                  />
                  <FormRow
                    id="userAge"
                    type="number"
                    min={1}
                    label="나이"
                    value={userAge}
                    onChange={(e) => setUserAge(Number(e.target.value))}
                    placeholder="숫자로 입력"
                  />
                </>
              )
            }
            {/* [TODO] enter 누르면 버튼 눌러지면서 URL에 ? 생김.. 왜 그런겨? 없애기 */}
            {/* [TODO] 더 효율적으로 / 객체 상수로 분리할 수도 있을듯..? */}
            { isUserIdForm && !isUserIdValid() && <span className="error-text">아이디는 50자 이하로 입력해주세요</span> }
            { isUserPwForm && userPwTouched && !isUserPwValid() && <span className="error-text">{getUserPwError()}</span> }
            { isUserInfoForm && userEmailTouched && !isUserEmailValid() && <span className="error-text">올바른 이메일을 입력해주세요</span> }
            <Button
              label={isUserInfoForm ? "회원가입" : "다음"}
              onClick={handleButtonClick}
              disabled={isButtonDisabled()}
            />
          </fieldset>
        </form>
        <div className="flex justify-center gap-1">
          <span>이미 계정이 있나요?</span>
          <BoldLink to="/login" label="로그인" />
        </div>
      </section>
    </main>
  );
};

export default Signup;