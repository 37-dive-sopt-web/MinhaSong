import { useState } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header/Header.jsx';
import Game from './components/Game/Game.jsx';
import Ranking from './components/Ranking/Ranking.jsx';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function App() {
  const [activeView, setActiveView] = useState('game');

  return (
    <AppContainer>
      <Header onChangeView={setActiveView} />
      {activeView === 'game' && <Game />}
      {activeView === 'ranking' && <Ranking />}
    </AppContainer>
  );
};