import React, { Component } from 'react';
import './App.css';
import { VendingMachine } from './components/VendingMachine/VendingMachine';

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
