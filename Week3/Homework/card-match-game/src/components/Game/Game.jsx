import { useState, useEffect, useRef } from 'react';
import { buildDeck } from '../../utils/deck.js';
import { loadLocalStorage, saveLocalStorage } from '../../utils/localstorage.js';
import Card from './Card/Card.jsx';
import Modal from './Modal/Modal.jsx';
import * as G from './Game.styled.js';

export default function Game() {
  {/* 상태 정의 */}
  
  // 게임 시작 여부
  const [didStart, setDidStart] = useState(false);
  // 카드
  const [deckInfo, setDeckInfo] = useState({ status: 'idle', data: null, level: 1 });
  const [openedCard, setOpenedCard] = useState([]);
  const [matchedCard, setMatchedCard] = useState([]);
  // 레벨
  const [selectedLevel, setSelectedLevel] = useState(1);
  // 남은 시간
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(45000);
  // 안내 메시지
  const [currentStatus, setCurrentStatus] = useState('idle');
  // 최근 히스토리
  const [history, setHistory] = useState([]);
  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [clearTime, setClearTime] = useState(0);

  {/* 변수 정의 */}

  // 남은 시간
  const displayTime = (timeLeft / 1000).toFixed(2);
  // 성공, 잔여
  // [TODO] 처음에 totalPairCount가 0이 되는 문제
  const totalPairCount = (deckInfo.data?.length ?? 0) / 2;
  const matchedPairCount = matchedCard.length / 2;
  const remainingPairCount = totalPairCount - matchedPairCount;

  {/* 내부 로직 함수 정의 */}

  const getValues = (openedCard) => {
    const [firstId, secondId] = openedCard;
    const firstValue = deckInfo.data.find((card) => card.id === firstId).value;
    const secondValue = deckInfo.data.find((card) => card.id === secondId).value;
    return [firstValue, secondValue];
  }

  // 타이머 관련
  const resetTimer = () => {
    setTimeLeft(45000);
    clearInterval(timerRef.current);
  };
  // 카드 관련
  const openCard = (cardId) => {
    setOpenedCard((prev) => [ ...prev, cardId ]);
  };
  const closeCard = () => {
    const timer = setTimeout(() => { setOpenedCard([]); }, 600);
    return () => clearTimeout(timer);
  };
  const matchCard = () => {
    setMatchedCard((prev) => [ ...prev, ...openedCard ]);
  }
  const resetCard = () => {
    setOpenedCard([]);
    setMatchedCard([]);
  };
  const checkIsOpened = (cardId) => {
    return openedCard.includes(cardId) || matchedCard.includes(cardId);
  };
  const checkIsMatched = () => {
    const [firstValue, secondValue] = getValues(openedCard);
    return firstValue === secondValue;
  };
  // 게임 기록 관련 (history는 전체 기록, record는 하나의 기록)
  const addRecord = (openedCard, isMatched) => {
    setHistory((prev) => [ { pair: getValues(openedCard), result: isMatched ? '성공' : '실패' }, ...prev ]);
  }
  const sortGameRecord = (history) => {
    return history.sort((a, b) => a.clearTime - b.clearTime);
  };
  const saveGameRecord = () => {
    const original = loadLocalStorage();
    const id = original.length > 0 ? original[original.length - 1].id + 1 : 1;
    const record = ((45000 - timeLeft) /  1000).toFixed(2);

    setClearTime(record);
    const createdAt = new Date().toLocaleString();
    const updated = [ ...original, { id, level: selectedLevel, clearTime: record, createdAt }];
    const sorted = sortGameRecord(updated);
    saveLocalStorage(sorted);
  };
    // 게임 관련
  const startGame = () => {
    setDidStart(true);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 10;
        if (next <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return next;
      });
    }, 10);
  };
  const succeedGame = () => {
    setModalType('success');
    setIsModalOpen(true);
    saveGameRecord();
    resetGame();
  };
  const failGame = () => {
    setModalType('fail');
    setIsModalOpen(true);
    resetGame();
  };
  const resetGame = () => {
    resetCard();
    resetTimer();
    setCurrentStatus('idle');
    setHistory([]);
    setDidStart(false);
  };
  // 모달 관련
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };
  // 안내 메시지 관련
  const setMessage = () => {
    let message = ''
    switch (currentStatus) {
      case ('idle'):
        message = '카드를 눌러 게임을 시작하세요🔥';
        break;
      case ('waiting'):
        message = '카드 선택을 기다리는 중💭';
        break;
      case ('matched'):
        message = '✨성공✨';
        break;
      case ('unmatched'):
        message = '💩실패💩';
        break;
    };
    return message;
  };

  {/* 이벤트 핸들러 정의 */}

  const handleSelectLevel = (e) => {
    setSelectedLevel(Number(e.target.value));
  }

  const handleClickCard = (cardId) => {
    if (!didStart) startGame();
    if (openedCard.length === 2) return;
    openCard(cardId);
  };

  {/* useEffect 훅 정의 */}

  // 덱 생성
  useEffect(() => {
    const data = buildDeck(selectedLevel);
    setDeckInfo({ status: 'ready', data, level: selectedLevel });
  }, [selectedLevel]);

  // 게임 성공/실패 결정
  useEffect(() => {
    if (timeLeft > 0 && totalPairCount && matchedPairCount === totalPairCount) {
      succeedGame();
    } else if (timeLeft <= 0) {
      failGame();
    }
  }, [timeLeft, matchedPairCount]);

  // 카드 뒤집기
  useEffect(() => {
    const openedCount = openedCard.length;
    if ((didStart && openedCount === 0) || openedCount === 1) {
      setCurrentStatus('waiting');
    } else if (openedCount === 2) {
      const isMatched = checkIsMatched();
      if (isMatched) {
        setCurrentStatus('matched');
        matchCard();
        closeCard();
      } else {
        setCurrentStatus('unmatched');
        closeCard();
      }
      addRecord(openedCard, isMatched);
    }
  }, [openedCard]);

  // 3초 뒤 모달 닫기
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        closeModal();
        resetGame();
        startGame();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <G.Main>
      <G.GameBoard>
        <G.GameBoardHeader>
          <h3>게임 보드</h3>
          <G.Button onClick={resetGame}>게임 리셋</G.Button>
        </G.GameBoardHeader>
        <G.CardWrapper>
          {deckInfo.status === 'ready' && (
            deckInfo.data.map((card) => <Card key={card.id} value={card.value} isOpened={checkIsOpened(card.id)} onClick={() => handleClickCard(card.id)} />)
          )}
        </G.CardWrapper>
      </G.GameBoard>
      <G.GameStatus>
        <G.Select onChange={() => handleSelectLevel()}>
          <option value="1" selected>Level 1</option>
          <option value="2" disabled>Level 2</option>
          <option value="3" disabled>Level 3</option>
        </G.Select>
        <G.GameStatWrapper>
          <G.GameStat>
            <G.GameStatTitle>남은 시간</G.GameStatTitle>
            <G.GameStatValue>{displayTime}</G.GameStatValue>
          </G.GameStat>
          <G.GameStat>
            <G.GameStatTitle>성공</G.GameStatTitle>
            <G.GameStatValue>{matchedPairCount}/{totalPairCount}</G.GameStatValue>
          </G.GameStat>
          <G.GameStat>
            <G.GameStatTitle>잔여</G.GameStatTitle>
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
      <Modal isOpen={isModalOpen} type={modalType} onClose={closeModal} level={selectedLevel} clearTime={clearTime} />
    </G.Main>
  );
};