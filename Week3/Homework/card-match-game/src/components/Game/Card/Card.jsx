import * as C from './Card.styled.js';

export default function Card({ value, isOpened, isMatched, level, onClick }) {
  return (
    <C.Card isOpened={isOpened} isMatched={isMatched} onClick={onClick}>
      <C.FrontSide level={level}>
        <span>?</span>
      </C.FrontSide>
      <C.BackSide isOpened={isOpened} isMatched={isMatched} level={level}>
        <span>{value}</span>
      </C.BackSide>
    </C.Card>
  );
};