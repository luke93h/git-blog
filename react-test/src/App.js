import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    a: 1,
  }
  onClick = () => {
    this.setState({
      a: '1'
    })
  }
  render() {
    return (
      <div onClick={this.onClick}>
        REACT------COMPONENT
      </div>
    );
  }
}

export default App;
