import React from 'react';
import { Display } from '../Display/Display';
import { CoinSlot } from './CoinSlot/CoinSlot';
import { Cell } from '../Cell/Cell';

export class VendingMachine extends React.Component {
    state = {
        products: [
            {
                id: 1,
                img: 'https://i7.pngguru.com/preview/328/478/357/world-of-coca-cola-soft-drink-papua-new-guinea-the-coca-cola-company-coca-cola-bottle-png-image.jpg',
                price: 10.5,
            },
            {
                id: 2,
                img: 'https://i7.pngguru.com/preview/328/478/357/world-of-coca-cola-soft-drink-papua-new-guinea-the-coca-cola-company-coca-cola-bottle-png-image.jpg',
                price: 10.5,
            },
            {
                id: 3,
                img: 'https://i7.pngguru.com/preview/328/478/357/world-of-coca-cola-soft-drink-papua-new-guinea-the-coca-cola-company-coca-cola-bottle-png-image.jpg',
                price: 10.5,
            },
            {
                id: 4,
                img: 'https://i7.pngguru.com/preview/328/478/357/world-of-coca-cola-soft-drink-papua-new-guinea-the-coca-cola-company-coca-cola-bottle-png-image.jpg',
                price: 10.5,
            },
            {
                id: 5,
                img: 'https://i7.pngguru.com/preview/328/478/357/world-of-coca-cola-soft-drink-papua-new-guinea-the-coca-cola-company-coca-cola-bottle-png-image.jpg',
                price: 10.5,
            },
            {
                id: 6,
                img: 'https://i7.pngguru.com/preview/328/478/357/world-of-coca-cola-soft-drink-papua-new-guinea-the-coca-cola-company-coca-cola-bottle-png-image.jpg',
                price: 10.5,
            }
        ],
        msg: '',
        insertedMoney: 0,
        revenue: 0,
    }

    render() {
        const { msg, products } = this.state;
        return (
            <div>
                <Display msg={msg} />
                <CoinSlot onBeforeInsert={this.handleOnBeforeInsert} />
                {products.map((p, i) =>
                    <Cell key={i} product={p} onBeforeBuy={this.handleOnBeforeBuy} />
                )}
            </div>
        )
    }

    handleOnBeforeBuy = (product) => {
        if (!product) {
            this.setState({
                msg: 'Sold out, please pick another',
            });
            return;
        }

        const {price} = product;
        const {onBuy} = this.props;
        const {insertedMoney, products, revenue} = this.state;
        const isEnoughMoney = price <= insertedMoney;
        if (!isEnoughMoney) {
            this.setState({
                msg: 'Sorry dude, not enough dineros'
            });
            return;
        }
        /*
          when a product is bought, we do the following:
          1) show a message
          2) reset the machine's insertedMoney
          3) increase the revenue by the product price
          4) remove the product from the machine
          5) hand the product and change (can be 0) to the customer
        */

        const index = products.findIndex(p => p.id === product.id);
        const modifiedProducts = products.slice();
        modifiedProducts[index] = null;
        this.setState({
            insertedMoney: 0, 
            revenue: revenue + price,
            products: modifiedProducts,
            msg: 'Thank you!',
        });

        const change = insertedMoney - price;
        onBuy(product, change);
    }

    handleOnBeforeInsert = (coin) => {
        const { onBeforeInsert } = this.props;
        const { insertedMoney } = this.state;
        const shouldInsertCoin = onBeforeInsert(coin);
        if (!shouldInsertCoin) {
            return;
        }

        this.setState({
            insertedMoney: insertedMoney + coin,
        });
    }
}