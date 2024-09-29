import React from 'react';
import Card from './Card';
import './Hand.css';

const Hand = ({ name, cards }) => {
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
    <div className="hand">
      <h2>{name}'s Hand (Score: {calculateScore(cards)})</h2>
      <div className="cards">
        {cards.map((card, index) => (
          <Card key={index} suit={card.suit} value={card.value} />
        ))}
      </div>
    </div>
  );
};

export default Hand;