import React from 'react';


const Card = ({ suit, value }) => {
  return (
    <div className={`card ${suit.toLowerCase()}`}>
      <div className="card-value">{value}</div>
      <div className="card-suit">{getSuitSymbol(suit)}</div>
    </div>
  );
};

function getSuitSymbol(suit) {
  switch (suit.toLowerCase()) {
    case 'hearts': return '♥';
    case 'diamonds': return '♦';
    case 'clubs': return '♣';
    case 'spades': return '♠';
    default: return suit;
  }
}

export default Card;