import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Modal } from './index';
import { Menu } from 'lucide-react';
import { cn } from '../utils/cn';
import { getData, clearData } from '../utils/localstorage';

interface HeaderProps {
  myName: string;
  className?: string;
}

const Header = ({ myName, className }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const userPk = getData();

  const baseMenuStyle = 'text-primary-200 transition duration-200 ease-in-out hover:text-white';
  const baseHamburgerStyle = 'text-[#767676] transition duration-200 ease-in-out hover:text-black';

  const handleClickLogout = () => {
    clearData();
    navigate('/login');
  };

  return (
    <>
      <header className="fixed top-0 flex justify-between w-screen pt-7 pr-20 pb-7 pl-20 bg-primary-500">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-white">마이페이지</h1>
          <span className="text-white">안녕하세요, {myName}님</span>
        </div>
        {/* 기본 메뉴 */}
        <nav className="hidden sm:flex sm:items-center sm:gap-4">
          <Link to={`/mypage/${userPk}`}>
            <span className={cn(baseMenuStyle, location.pathname === `/mypage/${userPk}` && 'text-white font-bold', className)}>
              내 정보
            </span>
          </Link>
          <Link to="/members">
            <span className={cn(baseMenuStyle, location.pathname === '/members' && 'text-white font-bold', className)}>회원 조회</span>
          </Link>
          <button className={cn(baseMenuStyle, className)} onClick={handleClickLogout}>로그아웃</button>
          <button className={cn(baseMenuStyle, className)} onClick={() => setIsModalOpen(true)}>회원탈퇴</button>
        </nav>
        {/* 햄버거 메뉴 */}
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
          <Link to={`/mypage/${userPk}`}>
            <span className={cn(baseHamburgerStyle, location.pathname === `/mypage/${userPk}` && 'text-black font-bold', className)}>내 정보</span>
          </Link>
          <Link to="/members">
            <span className={cn(baseHamburgerStyle, location.pathname === '/members' && 'text-black font-bold', className)}>회원 조회</span>
          </Link>
          <button className={cn(baseHamburgerStyle, className)} onClick={handleClickLogout}>로그아웃</button>
          <button className={cn(baseHamburgerStyle, className)} onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }}>회원탈퇴</button>
        </nav>
      </header>
      { isModalOpen && <Modal onClose={() => setIsModalOpen(false)} /> }
    </>
  );
};

export default Header;