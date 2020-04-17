import React from 'react';

export class CoinSlot extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => this.handleBeforeInsert(5)}>5 ₪</button>
                <button onClick={() => this.handleBeforeInsert(10)}>10 ₪</button>
            </div>
        )
    }

    handleBeforeInsert = (coin) => {
        const {onBeforeInsert} = this.props;
        onBeforeInsert(coin);
    }
}