import React from "react";
import axios from "axios";

class NewDeck extends React.Component {
  state = { deck: "", cards: [] };

  componentDidMount() {
    this.freshDeck();
  }

  freshDeck = async () => {
    try {
      let res = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      let deck = res.data;
      let deckId = deck.deck_id;
      this.setState({ deck: deckId , cards: deckId});

      let drawTwoCards = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
      );

      debugger
    //   let firstCard = drawTwoCards.data.cards[0];
    //   let secondCard = drawTwoCards.data.cards[1];
    //   console.log(firstCard , secondCard);

      //   const drawTwo = () => {
      //     twoCards.map((el)=> {
      //       return el;
      //     });
      //   };
      //   let pair = drawTwo();
      //   console.log(drawTwo());
      debugger;
    //   this.setState({ cards: ? );
    } catch (error) {
      //   this.setState({ deck: [] });
      console.log(error);
    }
  };
  render() {
    return (
      <section>
        <p>{this.state.cards}</p>
        <button onClick={this.freshDeck}>start game</button>
        <p>Deck ID :{this.state.deck}</p>
      </section>
    );
  }
}

export default NewDeck;
