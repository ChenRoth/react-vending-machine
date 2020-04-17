import React, { Component } from 'react';
import './App.css';
import { VendingMachine } from './components/VendingMachine/VendingMachine';

class App extends React.Component {
  render() {
    return (
      <div>
        <VendingMachine onBeforeInsert={(coin) => coin < 10}/>
      </div>
    )
  }
}

export default App;
