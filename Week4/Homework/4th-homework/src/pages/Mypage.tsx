import { useState } from 'react';
import { Button, FormRow, Header } from '../components/index';

const Mypage = () => {
  const [myName, setMyName] = useState<string>('');
  const [myEmail, setMyEmail] = useState<string>('');
  const [myAge, setMyAge] = useState<string>('');

  const isUserEmailValid = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(myEmail);
  };

  const isButtonDisabled = () => {
    return myName === '' || myEmail === '' || myAge === '' || !isUserEmailValid();
  };
  
  // [TODO] 서버에서 값 불러와 input에 띄우기
  // [TODO] 저장 오류 시 alert 출력
  // [TODO] 저장 성공 시 화면의 표시 정보 갱신 및 alert 출력 (정보가 저장되었어요)

  return (
    <>
      <Header />
      <main className="flex justify-center items-center h-screen">
        <section className="flex flex-col gap-5 w-1/2 max-w-xl">
          <h2 className="text-2xl font-bold">내 정보</h2>
          <div className="flex justify-between">
            <span className="label">아이디</span>
            <span className="font-bold">djarudgh3</span>
          </div>
          <form>
            <fieldset className="flex flex-col gap-5">
              <legend className="sr-only">내 정보 수정 폼</legend>
              <FormRow id="userName" label="이름" value={myName} onChange={(e) => setMyName(e.target.value)}/>
              <FormRow id="userName" type="email" label="이메일" value={myEmail} onChange={(e) => setMyEmail(e.target.value)} />
              <FormRow id="userName" type="number" min={1} label="나이" value={myAge} onChange={(e) => setMyAge(e.target.value)} />
              { !isUserEmailValid() && <span className="error-text">올바른 이메일을 입력해주세요</span> }
              {/* type="subimt"으로 하면 안 되는 건가? */}
              <Button label="저장"  disabled={isButtonDisabled()} />
            </fieldset>
          </form>
        </section>
      </main>
    </>
  );
};

export default Mypage;