import React from "react";
import axios from "axios";

class NewDeck extends React.Component {
  state = { deck: "" };

//   componentDidMount(){
// this.freshDeck()
//   }

  freshDeck = async () => {
    try {
      let res = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      let  deck = res.data;
      let deckId = deck.deck_id;
      this.setState({ deck: deckId })
      debugger;
    

    //   let drawTwoCards = await axios.get(
    //     `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    //   );

    //   this.setState({ deck: res });
    } catch (error) {
    //   this.setState({ deck: [] });
      console.log(error);
    }
  };
  render() {
    return (
      <section>
        <button onClick={this.freshDeck}>start game</button>
        <p>Deck ID :{this.state.deck}</p>
      </section>
    );
  }
}

export default NewDeck;
