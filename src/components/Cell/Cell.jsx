import React from 'react';
import { Product } from '../Product/Product';

export class Cell extends React.Component {
    render() {
        const {product} = this.props;
        return (
            <div>
                <Product {...product} />
                <button onClick={this.handleOnBeforeBuy}>BUY</button>
            </div>
        )
    }

    handleOnBeforeBuy = () => {
        const { product, onBeforeBuy } = this.props;
        onBeforeBuy(product);
    }
}
