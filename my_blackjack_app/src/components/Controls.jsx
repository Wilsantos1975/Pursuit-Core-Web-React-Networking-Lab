import React from 'react';
import './Controls.css';

const Controls = ({ onDeal, onHit, onStand, gameState }) => {
  return (
    <div className="controls">
      <button onClick={onDeal} disabled={gameState !== 'ready'}>Deal</button>
      <button onClick={onHit} disabled={gameState !== 'playing'}>Hit</button>
      <button onClick={onStand} disabled={gameState !== 'playing'}>Stand</button>
    </div>
  );
};

export default Controls;