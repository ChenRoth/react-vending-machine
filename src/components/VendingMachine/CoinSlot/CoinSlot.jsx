import React from 'react';
import {Button} from 'react-bootstrap'

export class CoinSlot extends React.Component {
    render() {
        return (
            <div>
                <Button variant="success" onClick={() => this.handleBeforeInsert(5)}>5 ₪</Button>
                <Button variant="success" onClick={() => this.handleBeforeInsert(10)}>10 ₪</Button>
            </div>
        )
    }

    handleBeforeInsert = (coin) => {
        const {onBeforeInsert} = this.props;
        onBeforeInsert(coin);
    }
}