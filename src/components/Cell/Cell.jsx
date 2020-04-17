import React from 'react';
import { Product } from '../Product/Product';
import { Button, Card } from 'react-bootstrap';

export class Cell extends React.Component {
    render() {
        const { product } = this.props;
        return (
            <Card>
                <Card.Header>
                    <Product {...product} />
                </Card.Header>
                <Card.Footer>
                    <Button variant="primary" onClick={this.handleOnBeforeBuy}>BUY</Button>
                </Card.Footer>
            </Card>
        )
    }

    handleOnBeforeBuy = () => {
        const { product, onBeforeBuy } = this.props;
        onBeforeBuy(product);
    }
}
