import styled from '@emotion/styled';

export const Card = styled.div`
  display: inline-grid;
  width: ${({ level }) => level.level !== 3 ? '7rem' : '5rem'};
  height: ${({ level }) => level.level !== 3 ? '7rem' : '5rem'};
  font-size: ${({ theme, level }) => level.level !== 3 ? theme.fonts.xl : theme.fonts.lg};
  cursor: pointer;
  transform: perspective(800px) rotateY(${({ isOpened, isMatched }) => isOpened || isMatched ? '180deg' : '0deg'});
  transform-style: preserve-3d;
  transition: transform 0.3s;
`;

export const CardSide = styled.div`
  grid-area: 1 / 1 / 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fonts.xl};
  font-weight: ${({ theme }) => theme.weights.extraBold};
  backface-visibility: hidden;

  *::selection {
    background: transparent;
    color: inherit;
  }
`;

export const FrontSide = styled(CardSide)`
  background-color: ${({ theme }) => theme.colors.card};

  span {
    color: ${({ theme }) => theme.colors.white}
  }
`;

export const BackSide = styled(CardSide)`
  background-color: ${({ theme, isMatched }) => isMatched ? theme.colors.matchedCard : theme.colors.white};
  transform: rotateY(180deg);
  transition: background-color 0.2s linear 0.06s;

  span {
    color: ${({ theme, isMatched }) => isMatched ? theme.colors.white : theme.colors.black }
  }
`;