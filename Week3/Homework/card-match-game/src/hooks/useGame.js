import { useState, useEffect } from 'react';
import { loadLocalStorage, saveLocalStorage } from '../utils/localstorage.js';

const GAME_STATUS = {
  IDLE: 'idle',
  WAITING: 'waiting',
  MATCHED: 'matched',
  MISMATCHED: 'mismatched',
  INVALID: 'invalid'
} 

export function useGame(selectedLevel, timerHook, modalHook, deckHook) {
  const { timerRef, timeLeft, setTimeLeft, resetTimer } = timerHook;
  const { isModalOpen, setModalType, setIsModalOpen, setClearTime, setModalCountdown, closeModal } = modalHook;
  const { openedCard, totalPairCount, matchedPairCount, getValues, closeCard, matchCard, resetCard, checkCardsMatch } = deckHook;

  const [didStart, setDidStart] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('idle');
  const [history, setHistory] = useState([]);
  const [isShaking, setIsShaking] = useState(false);

  const addRecord = (openedCard, isMatched) => {
    setHistory((prev) => [ { pair: getValues(openedCard), result: isMatched ? '성공' : '실패' }, ...prev ]);
  };

  const saveGameRecord = () => {
    const original = loadLocalStorage();
    const id = original.length > 0 ? original.length : 1;
    const record = ((selectedLevel.timeLimit - timeLeft) /  1000).toFixed(2);
    setClearTime(record);
    const createdAt = new Date().toLocaleString();
    const updated = [ ...original, { id, level: selectedLevel.level, clearTime: record, createdAt }];
    saveLocalStorage(updated);
  };

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
    setCurrentStatus(GAME_STATUS.IDLE);
    setHistory([]);
    setDidStart(false);
  };

  const setMessage = () => {
    let message = ''
    switch (currentStatus) {
      case (GAME_STATUS.IDLE):
        message = '카드를 눌러 게임을 시작하세요🔥';
        break;
      case (GAME_STATUS.WAITING):
        message = '카드 선택을 기다리는 중💭';
        break;
      case (GAME_STATUS.MATCHED):
        message = '✨성공✨';
        break;
      case (GAME_STATUS.MISMATCHED):
        message = '💩실패💩';
        break;
      case (GAME_STATUS.INVALID):
        message = '이미 뒤집은 카드는 선택할 수 없어요🐸';
        break;
    };
    return message;
  };
  
  const triggerInvalidShake = () => {
    setIsShaking(true);
    const timer = setTimeout(() => {
      setIsShaking(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (timeLeft > 0 && totalPairCount && matchedPairCount === totalPairCount) {
      succeedGame();
    } else if (timeLeft <= 0) {
      failGame();
    }
  }, [timeLeft, matchedPairCount]);

  useEffect(() => {
    const openedCount = openedCard.length;
    if ((didStart && openedCount === 0) || openedCount === 1) {
      setCurrentStatus(GAME_STATUS.WAITING);
    } else if (openedCount === 2) {
      const isMatched = checkCardsMatch();
      if (isMatched) {
        setCurrentStatus(GAME_STATUS.MATCHED);
        matchCard();
        closeCard();
      } else {
        setCurrentStatus(GAME_STATUS.MISMATCHED);
        closeCard();
      }
      addRecord(openedCard, isMatched);
    }
  }, [openedCard]);

  useEffect(() => {
    if (isModalOpen) {
      setModalCountdown(3);
      const closeModalTimeout = setTimeout(() => {
        closeModal();
        resetGame();
        startGame();
      }, 3000);

      const modalCountdownInterval = setInterval(() => {
        setModalCountdown((prev) => prev - 1);
      }, 1000);

      return () => {
        clearTimeout(closeModalTimeout);
        clearInterval(modalCountdownInterval);
      };
    }
  }, [isModalOpen]);

  return { didStart, setCurrentStatus, history, isShaking, startGame, resetGame, setMessage, triggerInvalidShake };
};