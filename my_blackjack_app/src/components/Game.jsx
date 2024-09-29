import React, { useState, useEffect } from 'react';
import Hand from './Hand';
import Controls from './Controls';
import './Game.css';

const Game = () => {
  const [deckId, setDeckId] = useState(null);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.json();
      setDeckId(data.deck_id);
      setGameState('ready');
      setMessage('Click "Deal" to start the game');
    } catch (error) {
      console.error('Error initializing game:', error);
      setMessage('Error initializing game. Please refresh.');
    }
  };

  const dealInitialCards = async () => {
    if (!deckId) return;
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`);
      const data = await response.json();
      setPlayerHand(data.cards.slice(0, 2));
      setDealerHand(data.cards.slice(2, 4));
      setGameState('playing');
      setMessage('Your turn: Hit or Stand?');
    } catch (error) {
      console.error('Error dealing initial cards:', error);
      setMessage('Error dealing cards. Please try again.');
    }
  };

  const handleHit = async () => {
    if (!deckId || gameState !== 'playing') return;
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await response.json();
      if (data.cards && data.cards.length > 0) {
        const newPlayerHand = [...playerHand, data.cards[0]];
        setPlayerHand(newPlayerHand);
        const playerScore = calculateScore(newPlayerHand);
        if (playerScore > 21) {
          setGameState('ended');
          setMessage('Bust! You lose.');
        } else {
          setMessage('Hit or Stand?');
        }
      }
    } catch (error) {
      console.error('Error hitting:', error);
      setMessage('Error drawing card. Please try again.');
    }
  };

  const handleStand = async () => {
    if (gameState !== 'playing') return;
    setGameState('dealer-turn');
    setMessage("Dealer's turn...");
    
    let currentDealerHand = [...dealerHand];
    let dealerScore = calculateScore(currentDealerHand);
    
    while (dealerScore < 17) {
      try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await response.json();
        if (data.cards && data.cards.length > 0) {
          currentDealerHand = [...currentDealerHand, data.cards[0]];
          setDealerHand(currentDealerHand);
          dealerScore = calculateScore(currentDealerHand);
        }
      } catch (error) {
        console.error('Error in dealer turn:', error);
        setMessage('Error during dealer turn. Please try again.');
        return;
      }
    }
    
    const playerScore = calculateScore(playerHand);
    setGameState('ended');
    
    if (dealerScore > 21 || playerScore > dealerScore) {
      setMessage('You win!');
    } else if (dealerScore > playerScore) {
      setMessage('Dealer wins!');
    } else {
      setMessage('It\'s a tie!');
    }
  };

  const calculateScore = (hand) => {
    let score = 0;
    let aceCount = 0;
    for (let card of hand) {
      if (card.value === 'ACE') {
        aceCount++;
        score += 11;
      } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    }
    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }
    return score;
  };

  return (
    <div className="game-container">
      <div className="game-board">
        <div className="hand-column">
          <Hand name="Dealer" cards={dealerHand} />
        </div>
        <div className="hand-column">
          <Hand name="Player" cards={playerHand} />
        </div>
      </div>
      <div className="game-controls">
        <Controls 
          onDeal={dealInitialCards} 
          onHit={handleHit} 
          onStand={handleStand}
          gameState={gameState}
        />
        <p className="message">{message}</p>
        {gameState === 'ended' && (
          <button onClick={initializeGame} className="play-again">Play Again</button>
        )}
      </div>
    </div>
  );
};

export default Game;