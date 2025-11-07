import * as C from './Card.styled.js';

export default function Card({ value, isOpened, onClick }) {
  return (
    <C.Card isOpened={isOpened} onClick={onClick}>
      <C.FrontSide>
        <span>?</span>
      </C.FrontSide>
      <C.BackSide>
        <span>{value}</span>
      </C.BackSide>
    </C.Card>
  );
};