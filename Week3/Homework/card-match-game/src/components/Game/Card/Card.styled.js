import styled from '@emotion/styled';

export const Card = styled.div`
  display: inline-grid;
  cursor: pointer;
  transition: transform 0.3s;
  transform: perspective(800px) rotateY(${({ isOpened }) => isOpened ? '180deg' : '0deg'});
  transform-style: preserve-3d;
`;

export const CardSide = styled.div`
  grid-area: 1 / 1 / 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 7rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fonts.xl};
  font-weight: ${({ theme }) => theme.weights.extraBold};
  backface-visibility: hidden;
`;

export const FrontSide = styled(CardSide)`
  background-color: ${({ theme }) => theme.colors.card};
`;

export const BackSide = styled(CardSide)`
  background-color: ${({ theme }) => theme.colors.white};
  transform: rotateY(180deg);
`;