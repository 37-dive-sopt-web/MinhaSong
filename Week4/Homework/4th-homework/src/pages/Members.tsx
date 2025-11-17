import { useState } from 'react';
import { Button, FormRow, Header } from '../components/index';

const Members = () => {
  {/* [TODO] 회원 ID input에서 백스페이스 누르면 0 됨 */}
  const [userPk, setUserPk] = useState<number | ''>('');

  const isButtonDisabled = () => {
    return userPk === '';
  };

  // [TODO] 조회 성공 시 상세 정보 (단건) 출력

  return (
    <>
      <Header />
      <main className="flex justify-center items-center h-screen">
        <section className="flex flex-col gap-5 w-1/2 max-w-xl">
          <h2 className="text-2xl font-bold">회원 조회</h2>
          <form>
            <fieldset className="flex flex-col gap-5">
              <legend className="sr-only">내 정보 수정 폼</legend>
              <FormRow id="userName" type="number" min={1} label="회원 ID" value={userPk} onChange={(e) => setUserPk(Number(e.target.value))} placeholder="숫자만 입력" />
              {/* type="subimt"으로 하면 안 되는 건가? */}
              <Button label="저장"  disabled={isButtonDisabled()} />
            </fieldset>
          </form>
          <div className="flex justify-between">
            <span className="label">이름</span>
            <span className="font-bold">엄경호</span>
          </div>
          <div className="flex justify-between">
            <span className="label">아이디</span>
            <span className="font-bold">djarudgh3</span>
          </div>
          <div className="flex justify-between">
            <span className="label">이메일</span>
            <span className="font-bold">djarudgh3@naver.com</span>
          </div>
          <div className="flex justify-between">
            <span className="label">나이</span>
            <span className="font-bold">26</span>
          </div>
        </section>
      </main>
    </>
  );
};

export default Members;