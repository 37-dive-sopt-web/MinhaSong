import { useNavigate } from 'react-router';
import Portal from './Portal.tsx';
import { Button } from '../components/index';
import { deleteUser } from '../api/user';
import { getData, clearData } from '../utils/localstorage';

interface ModalProps {
  onClose: () => void;
}

const Modal = ({ onClose }: ModalProps) => {
  const navigate = useNavigate();

  const userPk = getData();

  const handleDeleteUser = async () => {
    try {
      await deleteUser(Number(userPk));

      clearData();
      alert('회원탈퇴에 성공했어요.');
      navigate('/login');
    } catch (e) {
      console.error(e);
      alert('회원탈퇴에 실패했어요.');
    }
  };

  const handleClickButton = () => {
    handleDeleteUser();
  };

  return (
    <Portal selector="#modal-root">
      <div
        className="absolute top-0 flex justify-center items-center w-screen h-screen bg-[#0000004D]"
        onClick={onClose}>
        <div className="flex flex-col justify-center items-center gap-8 w-110 pt-8 pr-14 pb-8 pl-14 rounded-xl bg-white" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col items-center gap-3">
            <span className="text-xl font-bold">정말 탈퇴하시겠어요?</span>
            <span>탈퇴 후에는 모든 정보가 삭제돼요.</span>
          </div>
          <div className="flex gap-3 w-full">
            <Button onClick={onClose}>취소</Button>
            <Button className="bg-[#F04150] hover:bg-[#EE2A3D]" onClick={handleClickButton}>회원탈퇴</Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;