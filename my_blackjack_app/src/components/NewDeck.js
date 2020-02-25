import React from 'react';
import axios from 'axios';

class NewDeck extends React.Component {
    State = { deck: []};

        freshDeck = async () => {
            try {
                let res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6");
                debugger
                this.setState({ deck:res })
            
            } catch (error) {
                this.setState({deck: []})
                console.log(error)

            }
        }
        render() {
            return (
                <section>

                    <button>hit me</button>
                </section>
                
            )
            
        }

}

export default NewDeck;