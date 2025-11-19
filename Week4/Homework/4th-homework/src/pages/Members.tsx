import { useState, useEffect } from 'react';
import { Button, FormRow, Header } from '../components/index';
import { getUser } from '../api/user';
import { getData } from '../utils/localstorage';
import { useForm } from '../hooks/useForm';

interface MemberForm {
  userId: string;
  userName: string;
  userEmail: string;
  userAge: string;
}

const Members = () => {
  const [name, setName] = useState<string>('');
  const [userPk, setUserPk] = useState<string>('');
  const { form, resetForm, setForm } = useForm<MemberForm>({
    userId: '',
    userName: '',
    userEmail: '',
    userAge: '',
  });

  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const isButtonDisabled = () => {
    return userPk === '';
  };

  const handleGetUser = async () => {
    try {
      const res = await getUser(Number(userPk));

      setError(false);
      setForm({ 
        userId: res.username,
        userName: res.name,
        userEmail: res.email,
        userAge: `${res.age}`,
      });
    } catch (e) {
      setError(true);
      resetForm();

      console.error(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    handleGetUser();
  };

  useEffect(() => {
    const getName = async () => {
      const userPk = getData();
      const res = await getUser(Number(userPk));
      setName(res.name);
    };
    
    getName();
  }, []);

  return (
    <>
      <Header myName={name} />
      <main className="flex justify-center items-center h-screen">
        <section className="flex flex-col gap-5 w-1/2 max-w-xl">
          <h2 className="text-2xl font-bold">회원 조회</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <fieldset className="flex flex-col gap-5">
              <legend className="sr-only">내 정보 수정 폼</legend>
              <FormRow
                id="userName"
                type="number"
                min={1}
                label="회원 ID"
                value={userPk}
                onChange={(e) => setUserPk(e.target.value)}
                placeholder="숫자만 입력" />
              <Button
                type="submit"
                disabled={isButtonDisabled()}
              >
                조회
              </Button>
            </fieldset>
          </form>
          <div className="flex flex-col justify-center gap-5 min-h-34">
            {
              hasSearched && (
                !error
                  ? <>
                      <div className="flex justify-between">
                        <span className="label">이름</span>
                        <span className="font-bold">{form.userName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="label">아이디</span>
                        <span className="font-bold">{form.userId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="label">이메일</span>
                        <span className="font-bold">{form.userEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="label">나이</span>
                        <span className="font-bold">{form.userAge}</span>
                      </div>
                    </>
                  : <span className="error-text text-center">회원이 존재하지 않습니다.</span>
              )
            }
          </div>
        </section>
      </main>
    </>
  );
};

export default Members;