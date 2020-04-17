import React, { Component } from 'react';
import './App.css';
import { VendingMachine } from './components/VendingMachine/VendingMachine';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <VendingMachine onBeforeInsert={(coin) => true} onBuy={console.log}/>
      </div>
    )
  }
}

export default App;
