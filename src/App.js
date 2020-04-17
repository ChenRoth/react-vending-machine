import React from 'react';
import './App.css';
import { VendingMachine } from './components/VendingMachine/VendingMachine';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = {
    moneyInPocket: 30,
    products: [],
  }
  render() {
    const {products} = this.state;
    return (
      <div>
        <VendingMachine onBeforeInsert={this.handleOnBeforeInsert} onBuy={this.handleOnBuy} />
        {products.map((p, i) =>
          <img key={i} src={p.img} alt="azov" />
        )}
      </div>
    )
  }

  handleOnBuy = (product, change) => {
    const { moneyInPocket, products } = this.state;
    this.setState({
      moneyInPocket: moneyInPocket + change,
      products: products.concat(product),
    });
  }

  handleOnBeforeInsert = (coin) => {
    const { moneyInPocket } = this.state;
    const isEnoughMoney = moneyInPocket > coin;
    if (!isEnoughMoney) {
      return false;
    }

    this.setState({
      moneyInPocket: moneyInPocket - coin,
    });

    return true;
  }
}

export default App;
