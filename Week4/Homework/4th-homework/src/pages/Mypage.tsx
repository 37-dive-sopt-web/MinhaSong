import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Button, FormRow, Header } from '../components/index';
import { getUser, editUser } from '../api/user';
import { useForm } from '../hooks/useForm';

interface MypageForm {
  myId: string;
  myName: string;
  myEmail: string;
  myAge: string;
}

const isUserEmailValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Mypage = () => {
  const [name, setName] = useState<string>('');
  const { form, handleChange, setForm } = useForm<MypageForm>({
    myId: '',
    myName: '',
    myEmail: '',
    myAge: '',
  });

  const [myEmailTouched, setMyEmailTouched] = useState<boolean>(false);

  const { id } = useParams();
  
  const handleEditUser = async (form: MypageForm) => {
    try {
      const res = await editUser(Number(id), {
        name: form.myName,
        email: form.myEmail,
        age: Number(form.myAge)
      });

      handleChange('myName', res.name);
      handleChange('myEmail', res.email);
      handleChange('myAge', `${res.age}`);

      alert("정보가 저장되었어요.");
    } catch (e) {
      console.error(e);
      alert("정보 저장에 실패했어요.");
    }
  };

  const handleSubmit = () => {
    handleEditUser(form);
  };

  const isButtonDisabled = () => {
    return form.myName === '' || form.myEmail === '' || form.myAge === '' || !isUserEmailValid(form.myEmail);
  };

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const res = await getUser(Number(id));

        setForm({
          myId: res.username,
          myName: res.name,
          myEmail: res.email,
          myAge: `${res.age}`,
        });

        setName(res.name);
      } catch (e) {
        console.error(e);
        alert('정보를 불러오지 못했어요.');
      }
    };

    handleGetUser();
  }, [id]);

  return (
    <>
      <Header myName={name} />
      <main className="flex justify-center items-center h-screen">
        <section className="flex flex-col gap-5 w-1/2 max-w-xl">
          <h2 className="text-2xl font-bold">내 정보</h2>
          <div className="flex justify-between">
            <span className="label">아이디</span>
            <span className="font-bold">{form.myId}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <fieldset className="flex flex-col gap-5">
              <legend className="sr-only">내 정보 수정 폼</legend>
              <FormRow
                id="userName"
                label="이름"
                value={form.myName}
                onChange={(e) => handleChange('myName', e.target.value)}
              />
              <FormRow
                id="userEmail"
                type="email"
                label="이메일"
                value={form.myEmail}
                onChange={(e) => handleChange('myEmail', e.target.value)}
              />
              <FormRow
                id="userAge"
                type="number"
                min={1}
                label="나이"
                value={form.myAge}
                onChange={(e) => { handleChange('myAge', e.target.value); setMyEmailTouched(true); }}
              />
              { !isUserEmailValid(form.myEmail) && myEmailTouched && <span className="error-text">올바른 이메일을 입력해주세요</span> }
              <Button
                type="submit"
                disabled={isButtonDisabled()}
              >
                저장
              </Button>
            </fieldset>
          </form>
        </section>
      </main>
    </>
  );
};

export default Mypage;