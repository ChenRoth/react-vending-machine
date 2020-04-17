import React from 'react';
import { Display } from '../Display/Display';
import { CoinSlot } from './CoinSlot/CoinSlot';
import { Product } from '../Product/Product';

export class VendingMachine extends React.Component {
    state = {
        products: [
            {
                img: 'https://i7.pngguru.com/preview/328/478/357/world-of-coca-cola-soft-drink-papua-new-guinea-the-coca-cola-company-coca-cola-bottle-png-image.jpg',
                price: 10.5,
            },
            {
                img: 'https://i7.pngguru.com/preview/328/478/357/world-of-coca-cola-soft-drink-papua-new-guinea-the-coca-cola-company-coca-cola-bottle-png-image.jpg',
                price: 10.5,
            }
        ],
        msg: '',
        amount: 0,
    }

    render() {
        const { msg, products } = this.state;
        return (
            <div>
                <Display msg={msg} />
                <CoinSlot onBeforeInsert={this.handleOnBeforeInsert} />
                {products.map((p, i) =>
                    <Product key={i} {...p} />
                )}
            </div>
        )
    }

    handleOnBeforeInsert = (coin) => {
        const { onBeforeInsert } = this.props;
        const { amount } = this.state;
        const shouldInsertCoin = onBeforeInsert(coin);
        if (!shouldInsertCoin) {
            return;
        }

        this.setState({
            amount: amount + coin,
        });
    }
}