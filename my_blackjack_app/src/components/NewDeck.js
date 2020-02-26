import React from 'react';
import axios from 'axios';

class NewDeck extends React.Component {
    State = { deck: [] };

        freshDeck = async () => {
            try {
                let res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
                let deckId = res.data.deck_id
                debugger
                let drawTwoCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
                // debugger
                this.setState({ deck: res })
            
            } catch (error) {
                this.setState({deck: []})
                console.log(error)

            }
        }
        render() {
            return (
                <section>

                    <button onClick={this.freshDeck}>hit me</button>
                </section>
                
            )
            
        }

}

export default NewDeck;