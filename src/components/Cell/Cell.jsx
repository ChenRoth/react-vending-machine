import React from 'react';
import { Product } from '../Product/Product';
import {Button} from 'react-bootstrap';

export class Cell extends React.Component {
    render() {
        const {product} = this.props;
        return (
            <div>
                <Product {...product} />
                <Button variant="primary" onClick={this.handleOnBeforeBuy}>BUY</Button>
            </div>
        )
    }

    handleOnBeforeBuy = () => {
        const { product, onBeforeBuy } = this.props;
        onBeforeBuy(product);
    }
}
