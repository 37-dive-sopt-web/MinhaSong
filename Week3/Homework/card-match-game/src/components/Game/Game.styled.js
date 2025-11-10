import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-0.4rem); }
  40%, 80% { transform: translateX(0.4rem); }
`;

export const Main = styled.main`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  width: 80%;
  min-width: 1110px;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.colors.main};
`;

export const GameBoard = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  flex: 7;
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const GameBoardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.resetButton};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.resetButtonHover};
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ level }) => level.cols}, ${({ level }) => level.level !== 3 ? '7rem' : '5rem'});
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
  justify-content: center;
  animation: ${({ isShaking }) => isShaking && css`${shake} 0.5s ease;`};
`;

export const GameStatus = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 3;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.colors.status};
`;

export const GameStatusDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.colors.gameDiv};
`;

export const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.xs};
  border-width: 0;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.colors.gameDiv};
`;

export const GameStatWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const GameStat = styled(GameStatusDiv)`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  min-width: 7rem;

  &:nth-child(2),
  &:nth-child(3) {
    min-width: 5rem;
  }
`;

export const GameStatValue = styled.span`
  font-size: ${({ theme }) => theme.fonts.lg};
  font-weight: ${({ theme }) => theme.weights.extraBold};
`;

export const GameMessage = styled(GameStatusDiv)`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const GameHistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  max-height: 250px;
  overflow-y: scroll;
`;

export const NoHistory = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const GameHistory = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.colors.gameDiv};
`;

export const MatchedPair = styled.div`
  color: ${({ theme }) => theme.colors.matchedPair};
  font-weight: ${({ theme }) => theme.weights.semiBold};
`;

export const MismatchedPair = styled.div`
  color: ${({ theme }) => theme.colors.mismatchedPair};
  font-weight: ${({ theme }) => theme.weights.semiBold};
`;