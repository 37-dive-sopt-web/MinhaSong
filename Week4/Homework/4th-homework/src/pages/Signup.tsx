import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { ArrowLeft } from 'lucide-react';
import { BoldLink, Button, FormRow } from '../components/index';
import { signup } from '../api/auth';
import { useForm } from '../hooks/useForm';

interface SignupForm {
  userId: string;
  userPw: string;
  userPwConfirm: string;
  userName: string;
  userEmail: string;
  userAge: string;
}

interface ErrorDetail {
  code: string;
  message: string;
}

interface ErrorResponse {
  success: false;
  code: string;
  message: string;
  data: ErrorDetail;
}

const checkLength = (pw: string) => {
  return 8 <= pw.length && pw.length <= 64;
};

const checkLowerIncluded = (pw: string) => {
  return /[a-z]/.test(pw);
};

const checkUpperIncluded = (pw: string) => {
  return /[A-Z]/.test(pw);
};

const checkNumIncluded = (pw: string) => {
  return /[0-9]/.test(pw);
};

const checkSpecialCharIncluded = (pw: string) => {
  return /[!@#$%^&*()]/.test(pw);
};

const checkBlankIncluded = (pw: string) => {
  return /\s/.test(pw);
};

const isUserPwConfirmEmpty = (pwConfirm: string) => {
  return pwConfirm === '';
};

const isPwUnmatched = (pw: string, pwConfirm: string) => {
  return pw !== pwConfirm;
};

const Signup = () => {
  const [isUserIdForm, setIsUserIdForm] = useState<boolean>(true);
  const [isUserPwForm, setIsUserPwForm] = useState<boolean>(false);
  const [isUserInfoForm, setIsUserInfoForm] = useState<boolean>(false);

  const { form, handleChange, resetForm } = useForm<SignupForm>({
    userId: '',
    userPw: '',
    userPwConfirm: '',
    userName: '',
    userEmail: '',
    userAge: '',
  });
  

  const [userPwTouched, setUserPwTouched] = useState<boolean>(false);
  const [userEmailTouched, setUserEmailTouched] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleBackClick = () => {
    if (isUserIdForm) {
      handleChange('userId', '');
      navigate('/login');
    } else if (isUserPwForm) {
      handleChange('userPw', '');
      handleChange('userPwConfirm', '');
      setUserPwTouched(false);
      setIsUserPwForm(false);
      setIsUserIdForm(true);
    } else {
      handleChange('userName', '');
      handleChange('userEmail', '');
      handleChange('userAge', '');
      setUserEmailTouched(false);
      setIsUserInfoForm(false);
      setIsUserPwForm(true);
    }
  }

  const handleSignup = async (form: SignupForm) => {
    try {
      const res = await signup({
        username: form.userId,
        password: form.userPw,
        name: form.userName,
        email: form.userEmail,
        age: Number(form.userAge),
      });

      alert(`${res.name}님 환영합니다!`);
      navigate("/login");
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;

      if (!error.response) {
        alert("서버 응답이 없습니다.");
        return;
      }

      resetForm();
      setUserPwTouched(false);
      setUserEmailTouched(false);
      alert(error.response.data.message);
    }
  };

  const handleNextClick = () => {
    if (isUserIdForm) {
      setIsUserIdForm(false);
      setIsUserPwForm(true);
    } else if (isUserPwForm) {
      setIsUserPwForm(false);
      setIsUserInfoForm(true);
    } else {
      setIsUserInfoForm(false);
      setIsUserIdForm(true);

      handleSignup(form);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextClick();
  };

  const isUserIdValid = () => {
    return form.userId.length <= 50;
  };

  const validateUserPw = (userPw: string, userPwConfirm: string) => {
    if (!checkLength(userPw)) return { isValid: false, error: "8~64자로 입력해주세요" };
    if (!checkUpperIncluded(userPw)) return { isValid: false, error: "대문자를 포함해주세요" };
    if (!checkNumIncluded(userPw)) return { isValid: false, error: "숫자를 포함해주세요" };
    if (!checkSpecialCharIncluded(userPw)) return { isValid: false, error: "특수문자를 포함해주세요" };
    if (!checkLowerIncluded(userPw)) return { isValid: false, error: "소문자를 포함해주세요" };
    if (checkBlankIncluded(userPw)) return { isValid: false, error: "공백은 포함될 수 없어요" };
    if (isUserPwConfirmEmpty(userPwConfirm)) return { isValid: false, error: "비밀번호를 모두 입력해주세요" };
    if (isPwUnmatched(userPw, userPwConfirm)) return { isValid: false, error: "비밀번호가 일치하지 않아요" };

  return { isValid: true, error: null };
};

  const isUserEmailValid = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.userEmail);
  };

  const isButtonDisabled = () => {
    return (!!isUserIdForm && (form.userId === '' || !isUserIdValid()))
      || (!!isUserPwForm && (form.userPw === '' || !validateUserPw(form.userPw, form.userPwConfirm).isValid))
      || (!!isUserInfoForm && (form.userName === '' || form.userEmail === '' || form.userAge === '' || !isUserEmailValid()));
  };

  return (
    <main className="flex justify-center h-full">
      <section className="flex flex-col justify-center gap-5 w-md">
        <button
          type="button"
          onClick={handleBackClick}
          aria-label="뒤로가기"
        >
          <ArrowLeft color='#3983EF' size={24} />
        </button>
        <h1 className="text-3xl font-bold">회원가입</h1>
        <form
          className="w-full"
          onSubmit={handleSubmit}
        >
          <fieldset className="flex flex-col gap-5">
            <legend className="sr-only">회원가입 폼</legend>
            {
              isUserIdForm && (
                <FormRow
                  id="userId"
                  label="아이디"
                  value={form.userId}
                  onChange={(e) => handleChange('userId', e.target.value)}
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
                    value={form.userPw}
                    onChange={(e) => { handleChange('userPw', e.target.value); setUserPwTouched(true); }}
                    placeholder="비밀번호를 입력하세요"
                  />
                  <FormRow
                    id="userPwConfirm"
                    type="password"
                    label="비밀번호 확인"
                    value={form.userPwConfirm}
                    onChange={(e) => handleChange('userPwConfirm', e.target.value)}
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
                    value={form.userName}
                    onChange={(e) => handleChange('userName', e.target.value)}
                    placeholder="이름을 입력하세요"
                  />
                  <FormRow
                    id="userEmail"
                    type="email"
                    label="이메일"
                    value={form.userEmail}
                    onChange={(e) => { handleChange('userEmail', e.target.value); setUserEmailTouched(true); }}
                    placeholder="name@example.com"
                  />
                  <FormRow
                    id="userAge"
                    type="number"
                    min={1}
                    label="나이"
                    value={form.userAge}
                    onChange={(e) => handleChange('userAge', e.target.value)}
                    placeholder="숫자로 입력"
                  />
                </>
              )
            }
            { isUserIdForm && !isUserIdValid() && <span className="error-text">아이디는 50자 이하로 입력해주세요</span> }
            { isUserPwForm && userPwTouched && !validateUserPw(form.userPw, form.userPwConfirm).isValid && <span className="error-text">{validateUserPw(form.userPw, form.userPwConfirm).error}</span> }
            { isUserInfoForm && userEmailTouched && !isUserEmailValid() && <span className="error-text">올바른 이메일을 입력해주세요</span> }
            <Button
              type="submit"
              disabled={isButtonDisabled()}
            >
              {isUserInfoForm ? "회원가입" : "다음"}
            </Button>
          </fieldset>
        </form>
        <div className="flex justify-center gap-1">
          <span>이미 계정이 있나요?</span>
          <BoldLink to="/login">로그인</BoldLink>
        </div>
      </section>
    </main>
  );
};

export default Signup;