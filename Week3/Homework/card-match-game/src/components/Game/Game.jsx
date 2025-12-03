import { useState } from 'react';
import { useTimer } from '../../hooks/useTimer.js';
import { useModal } from '../../hooks/useModal.js';
import { useDeck } from '../../hooks/useDeck.js';
import { useGame } from '../../hooks/useGame.js';
import Card from './Card/Card.jsx';
import Modal from './Modal/Modal.jsx';
import * as G from './Game.styled.js';

export default function Game() {
  const [selectedLevel, setSelectedLevel] = useState({ level: 1, timeLimit: 45000, cols: 4 });

  const timerHook = useTimer(selectedLevel.timeLimit);
  const modalHook = useModal();
  const deckHook = useDeck(selectedLevel.level);
  const gameHook = useGame(selectedLevel, timerHook, modalHook, deckHook);

  const { displayTime } = timerHook;
  const { isModalOpen, modalType, clearTime, modalCountdown, closeModal } = modalHook;
  const { deckInfo, openedCard, totalPairCount, matchedPairCount, remainingPairCount, openCard, checkIsOpened, checkIsMatched } = deckHook;
  const { didStart, setCurrentStatus, history, isShaking, startGame, resetGame, setMessage, triggerInvalidShake } = gameHook;

  const handleSelectLevel = (e) => {
    const level = Number(e.target.value);
    let timeLimit = 0;
    let cols = 0;

    switch(level) {
      case 1:
        timeLimit = 45000;
        cols = 4;
        break;
      case 2:
        timeLimit = 60000;
        cols = 6;
        break;
      case 3:
        timeLimit = 100000;
        cols = 6;
        break;
    }

    setSelectedLevel({ level, timeLimit, cols });
    resetGame();
  }

  const handleClickCard = (cardId) => {
    if (!didStart) startGame();
    if (openedCard.length === 2) return;
    if (checkIsOpened(cardId) || checkIsMatched(cardId)) {
      triggerInvalidShake();
      setCurrentStatus('invalid');
      const timer = setTimeout(() => {
        setCurrentStatus('waiting')
      }, 1000);
      return () => clearTimeout(timer);
    }
    openCard(cardId);
  };

  return (
    <G.Main>
      <G.GameBoard>
        <G.GameBoardHeader>
          <h3>게임 보드</h3>
          <G.Button onClick={resetGame}>게임 리셋</G.Button>
        </G.GameBoardHeader>
        <G.CardWrapper isShaking={isShaking} level={selectedLevel}>
          {deckInfo.status === 'ready' && (
            deckInfo.data.map((card) => <Card key={card.id} value={card.value} isOpened={checkIsOpened(card.id)} isMatched={checkIsMatched(card.id)} level={selectedLevel} onClick={() => handleClickCard(card.id)} />)
          )}
        </G.CardWrapper>
      </G.GameBoard>
      <G.GameStatus>
        <G.Select value={selectedLevel.level} onChange={(e) => handleSelectLevel(e)}>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </G.Select>
        <G.GameStatWrapper>
          <G.GameStat>
            <span>남은 시간</span>
            <G.GameStatValue>{displayTime}</G.GameStatValue>
          </G.GameStat>
          <G.GameStat>
            <span>성공</span>
            <G.GameStatValue>{matchedPairCount}/{totalPairCount}</G.GameStatValue>
          </G.GameStat>
          <G.GameStat>
            <span>잔여</span>
            <G.GameStatValue>{remainingPairCount}</G.GameStatValue>
          </G.GameStat>
        </G.GameStatWrapper>
        <h4>안내 메시지</h4>
        <G.GameMessage>{setMessage()}</G.GameMessage>
        <h4>최근 히스토리</h4>
        <G.GameHistoryWrapper>
          {!didStart
            ? <G.NoHistory>아직 뒤집은 카드가 없어요.</G.NoHistory>
            : (history.map((record) => (
                <G.GameHistory>
                  {record.result === '성공'
                    ? <G.MatchedPair>{record.pair.join(', ')}</G.MatchedPair>
                    : <G.MismatchedPair>{record.pair.join(', ')}</G.MismatchedPair>
                  }
                  <div>{record.result}</div>
                </G.GameHistory>
              )))
          }
        </G.GameHistoryWrapper>
      </G.GameStatus>
      <Modal isOpen={isModalOpen} type={modalType} level={selectedLevel.level} clearTime={clearTime} modalCountdown={modalCountdown} onClose={closeModal} />
    </G.Main>
  );
};