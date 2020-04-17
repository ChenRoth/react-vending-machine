import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap'

export class CoinSlot extends React.Component {
    render() {
        return (
            <ButtonGroup vertical>
                <Button variant="outline-success" onClick={() => this.handleBeforeInsert(5)}>5 ₪</Button>
                <Button variant="outline-success" onClick={() => this.handleBeforeInsert(10)}>10 ₪</Button>
            </ButtonGroup>
        )
    }

    handleBeforeInsert = (coin) => {
        const {onBeforeInsert} = this.props;
        onBeforeInsert(coin);
    }
}