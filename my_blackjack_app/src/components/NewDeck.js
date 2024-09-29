import React from "react";

class NewDeck extends React.Component {
  state = { deckId: "", cards: [] };

  componentDidMount() {
    this.freshDeck();
  }

  freshDeck = async () => {
    try {
      // Get a new shuffled deck
      const deckResponse = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const deckData = await deckResponse.json();
      const deckId = deckData.deck_id;
      
      // Draw two cards from the deck
      const drawResponse = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
      );
      const drawData = await drawResponse.json();
      const drawnCards = drawData.cards;

      // Update state with new deck ID and drawn cards
      this.setState({ deckId, cards: drawnCards });
    } catch (error) {
      console.error("Error fetching deck or drawing cards:", error);
    }
  };

  render() {
    return (
      <section>
        <button onClick={this.freshDeck}>Start Game</button>
        <p>Deck ID: {this.state.deckId}</p>
        <div>
          {this.state.cards.map((card, index) => (
            <p key={index}>
              {card.value} of {card.suit}
            </p>
          ))}
        </div>
      </section>
    );
  }
}

export default NewDeck;
