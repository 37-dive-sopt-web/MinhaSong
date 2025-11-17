import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Modal } from './index';
import { Menu } from 'lucide-react';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClickLogout = () => {
    // 로그아웃 로직
    // [TODO] 로그아웃 버튼 클릭 시 userId 저장 정보 삭제하고 로그인 페이지로 이동

    navigate('/login');
  };

  // [TODO] 이벤트 핸들러나 함수를 값으로 넘겨주는 경우.. 함수화할지 말지 통일

  {/* [TODO] fixed 이렇게 하는 거 맞아? */}
  return (
    <>
      <header className="fixed top-0 flex justify-between w-screen pt-7 pr-20 pb-7 pl-20 bg-primary-500">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-white">마이페이지</h1>
          {/* [TODO] 사용자 이름 가져오기 */}
          <span className="text-white">안녕하세요, 엄경호님</span>
        </div>
        {/* [TODO] ul, li로? */}
        <nav className="hidden sm:flex sm:items-center sm:gap-4">
          <Link to="/mypage">
            <span className={`text-primary-200 transition duration-200 ease-in-out hover:text-white ${location.pathname === '/mypage' && 'text-white font-bold'}`}>내 정보</span>
          </Link>
          <Link to="/members">
            <span className={`text-primary-200 transition duration-200 ease-in-out hover:text-white ${location.pathname === '/members' && 'text-white font-bold'}`}>회원 조회</span>
          </Link>
          <button className="text-primary-200 transition duration-200 ease-in-out hover:text-white" onClick={handleClickLogout}>로그아웃</button>
          <button className="text-primary-200 transition duration-200 ease-in-out hover:text-white" onClick={() => setIsModalOpen(true)}>회원탈퇴</button>
        </nav>
        {/* [TODO] 로컬 컴포넌트로 분리? */}
        {/* [TODO] 오버레이할까? */}
        {/* [TODO] isMenuOpen이 true이면 화면 늘렸다가 줄였을 때 메뉴 자동으로 뜨는 문제 */}
        <button className="sm:hidden" onClick={() => setIsMenuOpen((prev) => !prev)}>
          <Menu size={24} color='white' />
        </button>
        <nav
          className="overflow-y-hidden absolute top-30 right-2 flex flex-col items-center gap-3 w-30 border border-gray-100 rounded-xl shadow-md transition-[max-height, padding] duration-300 ease-in-out sm:hidden"
          style={
            isMenuOpen ? {
              maxHeight: '10rem',
              paddingTop: '1.2rem',
              paddingBottom: '1.2rem'
            } : {
              maxHeight: 0,
              padding: 0,
              borderWidth: 0
            }
          }
          >
          <Link to="/mypage">
            <span className={`text-[#767676] transition duration-200 ease-in-out hover:text-black ${location.pathname === '/mypage' && 'text-black font-bold'}`}>내 정보</span>
          </Link>
          <Link to="/members">
            <span className={`text-[#767676] transition duration-200 ease-in-out hover:text-black ${location.pathname === '/members' && 'text-black font-bold'}`}>회원 조회</span>
          </Link>
          <button className="text-[#767676] transition duration-200 ease-in-out hover:text-black" onClick={() => { handleClickLogout(); }}>로그아웃</button>
          <button className="text-[#767676] transition duration-200 ease-in-out hover:text-black" onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }}>회원탈퇴</button>
        </nav>
      </header>
      { isModalOpen && <Modal onClose={() => setIsModalOpen(false)} /> }
    </>
  );
};

export default Header;