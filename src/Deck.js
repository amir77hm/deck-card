import React, { Component } from 'react'
import Card from "./Card";
import './deck.css'
import axios from "axios";


const base_api_url = 'https://deckofcardsapi.com/api/deck'

export default class Deck extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deck: null,
            drawn: []
        }

        this.getCard = this.getCard.bind(this)
    }

    async componentDidMount() {
        const deck = await axios.get(`${base_api_url}/new/shuffle`)
        this.setState({
            deck: deck.data
        })
    }

    async getCard() {
        try {
            const id = this.state.deck.deck_id
            const cardUrl = `${base_api_url}/${id}/draw`
            const cardRes = await axios.get(cardUrl)

            if (!cardRes.data.success) {
                throw new Error('no card remaining')
            }

            const card = cardRes.data.cards[0]

            this.setState(prevState => ({
                drawn: [
                    ...prevState.drawn,
                    {
                        id: card.code,
                        img: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }))
        } catch (error) {
            alert(error)
        }
    }

    render() {
        return (
            <div className='deck'>
                <button onClick={this.getCard}>get card</button>
                <div className='card'>
                    {
                        this.state.drawn.map(card => {
                            return <Card src={card.img} key={card.id} />
                        })
                    }
                </div>
            </div>
        )
    }
}
