import { useNavigate } from 'react-router';
import { BoldLink, Button, FormRow } from '../components/index';
import { login } from '../api/auth';
import { saveData } from '../utils/localstorage';
import { useForm } from '../hooks/useForm';

type FormStatus = 'idle' | 'success' | 'error';

interface LoginForm {
  userId: string;
  userPw: string;
  status: FormStatus;
}

const Login = () => {
  const { form, handleChange } = useForm<LoginForm>({
    userId: '',
    userPw: '',
    status: 'idle',
  });

  const navigate = useNavigate();

  const handleLogin = async (form: LoginForm) => {
    try {
      const res = await login({
        username: form.userId,
        password: form.userPw,
      });

      const userPk = res.userId;

      saveData(userPk);
      navigate(`/mypage/${userPk}`);
    } catch (e) {
      console.error(e);
      handleChange('status', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(form);
  };

  const isButtonDisabled = () => {
    return form.userId === '' || form.userPw === '';
  };

  return (
    <main className="flex justify-center h-full">
      <section className="flex flex-col justify-center gap-5 w-md">
        <h1 className="text-3xl font-bold">로그인</h1>
        <form 
          className="w-full"
          onSubmit={(e) => handleSubmit(e)}
        >
          <fieldset className="flex flex-col gap-5">
            <legend className="sr-only">로그인 폼</legend>
            <FormRow
              id="user-id"
              label="아이디"
              value={form.userId}
              onChange={(e) => handleChange('userId', e.target.value)}
              placeholder="아이디를 입력하세요"
            />
            <FormRow
              id="user-pw"
              type="password"
              label="비밀번호"
              value={form.userPw}
              onChange={(e) => handleChange('userPw', e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
            { form.status === 'error'
                && <span className="error-text" role="alert">아이디, 비밀번호가 존재하지 않아요</span>
            }
            <Button
              type="submit"
              disabled={isButtonDisabled()}
            >
              로그인
            </Button>
          </fieldset>
        </form>
        <div className="flex justify-center">
          <BoldLink to="/signup">회원가입</BoldLink>
        </div>
      </section>
    </main>
  );
};

export default Login;