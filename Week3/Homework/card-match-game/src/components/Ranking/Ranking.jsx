import { useState, useEffect } from 'react';
import { loadLocalStorage, clearLocalStorage } from '../../utils/localstorage.js';
import { sortGameHistory } from '../../utils/sortGameHistory.js';
import * as R from './Ranking.styled.js';

export default function Ranking() {
  const [gameHistory, setGameHistory] = useState([]);

  const handleClickButton = () => {
    clearLocalStorage();
    setGameHistory([]);
  };

  useEffect(() => {
    const original = loadLocalStorage();
    const sorted = sortGameHistory(original);

    setGameHistory(sorted);
  }, []);

  return (
    <R.Main>
      <R.RankingBoard>
        <R.RankingBoardHeader>
          <h3>랭킹 보드</h3>
          <R.ResetButton onClick={handleClickButton}>기록 초기화</R.ResetButton>
        </R.RankingBoardHeader>
        <R.TableWrapper>
          <R.Table>
            <colgroup>
              <R.RankingCol />
              <R.LevelCol />
              <R.ClearTimeCol />
              <R.CreatedAtCol />
            </colgroup>
            <thead>
              <R.TheadTr>
                <th>순위</th>
                <th>레벨</th>
                <th>클리어 시간(초)</th>
                <th>기록 시각</th>
              </R.TheadTr>
            </thead>
            <tbody>
              {gameHistory.length === 0
                ? <td colspan="4">기록이 존재하지 않아요.</td>
                : gameHistory.map(({ id, level, clearTime, createdAt }, idx) => (
                    <tr key={id}>
                      <td role="cell">{idx + 1}</td>
                      <td role="cell">Level {level}</td>
                      <td role="cell">{clearTime}</td>
                      <td role="cell">{createdAt}</td>
                    </tr>
                  ))
              }
            </tbody>
          </R.Table>
        </R.TableWrapper>
      </R.RankingBoard>
    </R.Main>
  );
};