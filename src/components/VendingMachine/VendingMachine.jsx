import React from 'react';
import { Display } from '../Display/Display';
import { CoinSlot } from './CoinSlot/CoinSlot';
import { Cell } from '../Cell/Cell';
import { Container, Col, Row } from 'react-bootstrap';
import './VendingMachine.css';

const PRODUCTS_PER_SHELF = 4;

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

        const numOfShelves = Math.ceil(products.length / PRODUCTS_PER_SHELF);
        const shelves = Array.from(new Array(numOfShelves));
        return (
            <Container className="vending-machine">
                <Row>
                    <Col xs={9}>
                        {shelves.map((_, i) =>
                            <Row key={i}>
                                {products.slice(i * PRODUCTS_PER_SHELF, (i + 1) * PRODUCTS_PER_SHELF).map((p, j) =>
                                    <Col xs={Math.ceil(12 / PRODUCTS_PER_SHELF)} >
                                        <Cell key={j} product={p} onBeforeBuy={this.handleOnBeforeBuy} />
                                    </Col>
                                )}
                            </Row>
                        )}
                    </Col>
                    <Col xs={3}>
                        <div className="py-3">
                            <Display msg={msg} />
                        </div>
                        <CoinSlot onBeforeInsert={this.handleOnBeforeInsert} />
                    </Col>
                </Row>
            </Container>
        )
    }

    handleOnBeforeBuy = (product) => {
        if (!product) {
            this.showMsg('Sold out, please pick another');
            return;
        }

        const { price } = product;
        const { onBuy } = this.props;
        const { insertedMoney, products, revenue } = this.state;
        const isEnoughMoney = price <= insertedMoney;
        if (!isEnoughMoney) {
            this.showMsg('Sorry dude, not enough dineros');
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

        const index = products.findIndex(p => p && p.id === product.id);
        const modifiedProducts = products.slice();
        modifiedProducts[index] = null;
        this.setState({
            insertedMoney: 0,
            revenue: revenue + price,
            products: modifiedProducts,
        });

        this.showMsg('Thank you');

        const change = insertedMoney - price;
        onBuy(product, change);
    }

    showMsg = (msg) => {
        setTimeout(() => {
            this.setState({
                msg,
            });    
        }, 0);
        
        setTimeout(() => {
            this.setState({
                msg: '',
            });
        }, 2000);
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