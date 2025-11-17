import Portal from './Portal.tsx';
import { Button } from '../components/index';

// [TODO] interface/type 통일
interface ModalProps {
  onClose: () => void;
}

// [TODO] 회원탈퇴 실패 시 에러메시지 alert 출력
// [TODO] 회원탈퇴 성공 시 alert 출력 후 login 페이지로 이동

const Modal = ({ onClose }: ModalProps) => {
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
            <Button label="취소" onClick={onClose} />
            {/* [TODO] 회원탈퇴 버튼 색깔 */}
            <Button label="회원탈퇴" />
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;