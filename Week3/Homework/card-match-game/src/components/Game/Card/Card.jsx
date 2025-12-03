import * as C from './Card.styled.js';

export default function Card({ value, isOpened, isMatched, level, onClick }) {
  return (
    <C.Card isOpened={isOpened} isMatched={isMatched} onClick={onClick} level={level}>
      <C.FrontSide>
        <span>?</span>
      </C.FrontSide>
      <C.BackSide isOpened={isOpened} isMatched={isMatched}>
        <span>{value}</span>
      </C.BackSide>
    </C.Card>
  );
};