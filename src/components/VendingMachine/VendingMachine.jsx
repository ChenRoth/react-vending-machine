import React from 'react';
import { Display } from '../Display/Display';
import { CoinSlot } from './CoinSlot/CoinSlot';
import { Cell } from '../Cell/Cell';
import { Container, Col, Row } from 'react-bootstrap';
import './VendingMachine.css';
import { CardReader } from '../CardReader/CardReader';

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
        cards: [
            {
                num: '1234567890',
                credit: 30,
            },
            {
                num: '1111111111',
                credit: 5,
            }
        ],
        insertedCard: null,
        msg: '',
        insertedMoney: 0,
        revenue: 0,
    }

    render() {
        const { msg, products, cards } = this.state;

        const numOfShelves = Math.ceil(products.length / PRODUCTS_PER_SHELF);
        const shelves = Array.from(new Array(numOfShelves));
        return (
            <Container className="vending-machine">
                <Row>
                    <Col xs={9}>
                        {shelves.map((_, i) =>
                            <Row key={i}>
                                {products.slice(i * PRODUCTS_PER_SHELF, (i + 1) * PRODUCTS_PER_SHELF).map((p, j) =>
                                    <Col key={j} xs={Math.ceil(12 / PRODUCTS_PER_SHELF)} >
                                        <Cell product={p} onBeforeBuy={this.handleOnBeforeBuy} />
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
                        <CardReader cards={cards} onInsertCard={this.handleOnInsertCard} showMsg={this.showMsg} />
                    </Col>
                </Row>
            </Container>
        )
    }

    handleOnInsertCard = (insertedCard) => {
        this.setState({
            insertedCard,
        });
    }

    handleOnBeforeBuy = (product) => {
        if (!product) {
            this.showMsg('Sold out, please pick another');
            return;
        }

        const { price } = product;
        const { onBuy } = this.props;
        const { cards, insertedCard, insertedMoney } = this.state;

        if (insertedCard) {
            //  use credit card for payment
            
            if (!this.validateMoney(product, insertedCard.credit)) {
                return;
            }
            
            const cardIndex = cards.findIndex(c => c.num === insertedCard.num);
            const modifiedCards = cards.slice();
            modifiedCards[cardIndex].credit -= price; 

            this.setState({
                insertedCard: null,
                cards: modifiedCards,
            });

            this.finalizeSale(product);
            onBuy(product, 0);

        } else {

            if (!this.validateMoney(product, insertedMoney)) {
                return;
            }
            
            this.setState({
                insertedMoney: 0,
            });

            this.finalizeSale(product);        
            const change = insertedMoney - price;
            onBuy(product, change);
        }
    }

    validateMoney = (product, credit) => {
        const {price} = product;
        const isEnoughMoney = price <= credit;
        if (!isEnoughMoney) {
            this.showMsg('Sorry dude, not enough dineros');
            this.setState({
                insertedCard: null,
            });
            return false;
        }
        return true;
    }

    finalizeSale = (product) => {
        const { price } = product;
        const { revenue } = this.state;
        const modifiedProducts = this.pullProduct(product);
        
        setTimeout(() => {
            this.setState({
                revenue: revenue + price,
                products: modifiedProducts,
            });
        }, 0);
        
        this.showMsg('Thank you');
    }

    pullProduct = (product) => {
        const {products} = this.state;
        const index = products.findIndex(p => p && p.id === product.id);
        const modifiedProducts = products.slice();
        modifiedProducts[index] = null;
        return modifiedProducts;
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