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

export const RankingBoard = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 3;
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const RankingBoardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ResetButton = styled.button`
  background-color: ${({ theme }) => theme.colors.resetButton};
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    background-color: ${({ theme }) => theme.colors.resetButtonHover};
  }
`;

export const TableWrapper = styled.div`
  max-height: 500px;
  overflow-y: scroll;
`;

export const Table = styled.table`
  border-spacing: 0 ${({ theme }) => theme.spacing.xs};
  text-align: center;
  width: 100%;
`;

export const RankingCol = styled.col`
  width: 12%;
`;

export const LevelCol = styled.col`
  width: 12%;
`;

export const ClearTimeCol = styled.col`
  width: 38%;
`;

export const CreatedAtCol = styled.col`
  width: 38%;
`;

export const TheadTr = styled.tr`
  background-color: ${({ theme }) => theme.colors.theadTr};
`;