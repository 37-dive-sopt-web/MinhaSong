import Portal from './Portal.jsx';
import * as M from './Modal.styled.js';

export default function Modal({ isOpen, type, level, clearTime, modalCountdown, onClose }) {
  if (!isOpen) return null;

  return (
    <Portal selector="#modal-root">
      <M.ModalOverlay onClick={onClose}>
        <M.ModalContent onClick={(e) => e.stopPropagation()}>
          {type === 'success' 
            ? (
              <>
                <M.ModalTitle>축하합니다✨</M.ModalTitle>
                <span>Level {level}을 {clearTime}초 안에 클리어했어요!</span>
                <M.ModalLoading>{modalCountdown}초 후 자동으로 새 게임을 시작해요.</M.ModalLoading>
              </>
              )
            : (
              <>
                <M.ModalTitle>실패했어요💩</M.ModalTitle>
                <span>다시 시도해보세요!</span>
                <M.ModalLoading>{modalCountdown}초 후 자동으로 새 게임을 시작해요.</M.ModalLoading>
              </>
              )
          }
        </M.ModalContent>
      </M.ModalOverlay>
    </Portal>
  );
};