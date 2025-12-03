import { useState, useEffect } from 'react';
import { buildDeck } from '../utils/deck.js';

export function useDeck(level) {
  const [deckInfo, setDeckInfo] = useState({ status: 'idle', data: null, level: 1 });
  const [openedCard, setOpenedCard] = useState([]);
  const [matchedCard, setMatchedCard] = useState([]);

  const totalPairCount = (deckInfo.data?.length ?? 0) / 2;
  const matchedPairCount = matchedCard.length / 2;
  const remainingPairCount = totalPairCount - matchedPairCount;

  const getValues = (openedCard) => {
    const [firstId, secondId] = openedCard;
    const firstValue = deckInfo.data.find((card) => card.id === firstId).value;
    const secondValue = deckInfo.data.find((card) => card.id === secondId).value;
    return [firstValue, secondValue];
  };

  const openCard = (cardId) => {
    setOpenedCard((prev) => [ ...prev, cardId ]);
  };

  const closeCard = () => {
    setTimeout(() => { setOpenedCard([]); }, 600);
  };

  const matchCard = () => {
    setMatchedCard((prev) => [ ...prev, ...openedCard ]);
  };

  const resetCard = () => {
    setOpenedCard([]);
    setMatchedCard([]);
  };

  const checkIsOpened = (cardId) => {
    return openedCard.includes(cardId);
  };

  const checkIsMatched = (cardId) => {
    return matchedCard.includes(cardId);
  };

  const checkCardsMatch = () => {
    const [firstValue, secondValue] = getValues(openedCard);
    return firstValue === secondValue;
  };

  useEffect(() => {
    const data = buildDeck(level);
    setDeckInfo({ status: 'ready', data, level: level });
  }, [level]);

  return { deckInfo, openedCard, totalPairCount, matchedPairCount, remainingPairCount, getValues, openCard, closeCard, matchCard, resetCard, checkIsOpened, checkIsMatched, checkCardsMatch };
};