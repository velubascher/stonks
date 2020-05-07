import React from 'react';
import './App.css';
import io from 'socket.io-client'
import { Button } from '@material-ui/core'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
    };

    this.handleConnectClick = this.handleConnectClick.bind(this);
    this.handleDisconnectClick = this.handleDisconnectClick.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidMount() {
    // cosas
  }
  
  handleConnectClick() {
    this.socket = io('wss://le-18262636.bitzonte.com', {
      path: '/stocks'
    });
    this.connectSockets();
    this.setState({isConnected: true});
  }

  handleDisconnectClick() {
    this.setState({isConnected: false});
    this.socket.close()
  }

  connectSockets = () => {
    this.socket.on('UPDATE', data => console.log(data))
    this.socket.on('BUY', data => console.log(data))
    this.socket.on('SELL', data => console.log(data))
    this.socket.on('EXCHANGES', data => console.log(data))
    this.socket.on('STOCKS', data => console.log(data))
  }

  render() {
    
    const isConnected = this.state.isConnected;

    return (
      <div>
        <h1>STONKS</h1>
        {!isConnected ?
          <Button variant="contained" color='primary' onClick={this.handleConnectClick}>
            Conectar
          </Button>
          :
          <Button variant="contained" color='secondary' onClick={this.handleDisconnectClick}>
            Desconectar
          </Button>
        }
        
      </div>
    );
}
}
export default App;
