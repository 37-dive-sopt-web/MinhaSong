import styled from '@emotion/styled';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.modalOverlay};
  z-index: 10;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 420px;
  padding: ${({ theme }) => theme.spacing.xl};
  border-width: 0;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.colors.modal};
`;

export const ModalTitle = styled.span`
  font-size: ${({ theme }) => theme.fonts.md};
  font-weight: ${({ theme }) => theme.weights.semiBold};
`;

export const ModalLoading = styled.span`
  color: ${({ theme }) => theme.colors.modalLoading};
  font-weight: ${({ theme }) => theme.weights.semiBold};
`;