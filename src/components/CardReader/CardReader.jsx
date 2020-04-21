import React from 'react';
import {Button} from 'react-bootstrap';

export class CardReader extends React.Component {
    state = {
        num: ''
    }

    render() {
        const {num} = this.state;
        return (
            <div>
                <form onSubmit={this.handleOnSwipe}>
                    <input onChange={this.onChangeNum} value={num} placeholder="type your CC #" maxLength="10" />
                    <Button type="submit">SWIPE CARD</Button>
                </form>
            </div>
        )
    }

    onChangeNum = (e) => {
        const num = e.target.value;
        this.setState({
            num,
        });
    }

    handleOnSwipe = (e) => {
        e.preventDefault();
        const {cards, onInsertCard, showMsg} = this.props;
        const {num} = this.state;
        if (num.length !== 10) {
            showMsg('CC # must be 10 digits');
            return;
        }

        const insertedCard = cards.find(card => card.num === num);
        if (!insertedCard) {
            showMsg('CC is invalid');
            return;
        }

        onInsertCard(insertedCard);
    }
}