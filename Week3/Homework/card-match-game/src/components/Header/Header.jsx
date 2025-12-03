import { useState } from 'react';
import * as H from './Header.styled.js';

export default function Header({ onChangeView }) {
  const [selected, setSelected] = useState('game');

  const handleClickButton = (e) => {
    onChangeView(e.target.value);
    setSelected(e.target.value);
  };

  return (
    <H.Header>
      <H.Title>숫자 카드 짝 맞추기</H.Title>
      <H.ButtonWrapper>
        <H.Button type="button" value="game" selected={selected === 'game'} aria-label="게임 실행" onClick={handleClickButton}>게임</H.Button>
        <H.Button type="button" value="ranking" selected={selected === 'ranking'} aria-label="랭킹 확인" onClick={handleClickButton}>랭킹</H.Button>
      </H.ButtonWrapper>
    </H.Header>
  );
};