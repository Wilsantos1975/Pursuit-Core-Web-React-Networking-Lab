import React from 'react';
import Game from './components/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blackjack Royale</h1>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;
