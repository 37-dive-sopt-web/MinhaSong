import styled from '@emotion/styled';

export const Main = styled.main`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  width: 80%;
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
  // [TODO] theme.js palette에 추가
  background-color: ${({ theme }) => theme.colors.resetButton};
  color: ${({ theme }) => theme.colors.white};
  // [TODO] hover 시 transition
  &:hover {
    background-color: ${({ theme }) => theme.colors.resetButtonHover};
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 7rem);
  gap: ${({ theme }) => theme.spacing.xs};
  // [TODO] 카드 (수직) 가운데 정렬 안 됨 / 정렬 방식 수정 필요
  // align-items: center;
  justify-content: center;
  // margin: auto;
  // [TODO] 100px 가변적으로 수정
`;

export const GameStatus = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 3;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  // [TODO] status 이름 수정
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
`;

export const GameStatTitle = styled.span`

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