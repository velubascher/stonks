import React from 'react';
import './App.css';
import io from 'socket.io-client'
import { Autocomplete } from '@material-ui/lab';
import { Container, Button, TextField, Paper, Grid, TableContainer, Divider } from '@material-ui/core'
import StockTable from './components/StockTable'
import ExchangesTable from './components/ExchangesTable'
import { createChart } from 'lightweight-charts';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.chart = React.createRef()
    this.state = {
      isConnected: true,
      update: [],
      buy: [],
      sell: [],
      exchanges: [],
      stocks: [],
      selectedStock: null,
      selectedExchange: null,
    };
    
    this.handleConnectClick = this.handleConnectClick.bind(this);
    this.handleDisconnectClick = this.handleDisconnectClick.bind(this);
  }
  
  componentWillUnmount() {
    // cosas
  }
  
  componentDidMount() {
    this.connectSockets();
    const chart = createChart(this.chart.current, { width: 430, height: 400 });
    this.lineSeries = chart.addLineSeries();
  }

  componentDidUpdate() {
    let { update, selectedStock } = this.state;
    if (selectedStock && update) {
      let currentStock = update.filter((stock) => stock.ticker === selectedStock.ticker);
      this.currentStockData = currentStock;
      this.lineSeries.setData(this.currentStockData);
    }
  }
  
  handleConnectClick() {
    this.connectSockets();
    this.setState({isConnected: true});
  }
  
  handleDisconnectClick() {
    this.setState({isConnected: false});
    this.socket.close()
  }
  
  connectSockets = () => {
    this.socket = io('wss://le-18262636.bitzonte.com', {
      path: '/stocks'
    });
    this.socket.on('UPDATE', data => this.setState((prevState) => ({ update: [...prevState.update, data] })))
    this.socket.on('BUY', data => this.setState((prevState) => ({ buy: [...prevState.buy, data] })))
    this.socket.on('SELL', data => this.setState((prevState) => ({ sell: [...prevState.sell, data] })))
    
    // Mandar eventos al servidor
    this.socket.emit('STOCKS')
    this.socket.emit('EXCHANGES')
    this.socket.on('EXCHANGES', data => this.setState({ exchanges: data }))
    this.socket.on('STOCKS', data => this.setState({ stocks: data, selectedStock: data[0] }))
  }

  render() {

    const { isConnected } = this.state;

    return (
      <div className='App'>
        <Container maxWidth='lg'>
          <Grid container direction='row' alignContent='flex-start' spacing={1} className='button'>
            <Grid item>
            {!isConnected ?
              <Button variant="contained" color='primary' onClick={this.handleConnectClick}>
                Conectar
              </Button>
              :
              <Button variant="contained" color='secondary' onClick={this.handleDisconnectClick}>
                Desconectar
              </Button>
            }
            </Grid>
          </Grid>
          <Grid container spacing={2} justify='space-between'>
            <Grid item xs={8}>
              <Paper className='paper' spacing={2}>
                <h3>Búsqueda de Stocks</h3>
                <Grid container spacing={5} alignContent="center">
                  <Grid item>
                    <Autocomplete
                      id="stock-selector"
                      options={this.state.stocks}
                      value={this.state.selectedStock}
                      getOptionLabel={(option) => option.ticker}
                      style={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Stocks" variant="outlined" />}
                      onChange={(event, newValue) => {
                        this.setState({selectedStock: newValue});
                      }}
                    />
                  </Grid>
                  <Grid container direction='row' justify='center' spacing={2}>
                    <Grid item xs={7}>
                      <div ref={this.chart} />
                    </Grid>
                    <Grid item xs={5}>
                      <TableContainer component={Paper} variant='outlined'>
                        <h4>{this.state.selectedStock && this.state.selectedStock.ticker}</h4>
                        <p>{this.state.selectedStock && this.state.selectedStock.company_name} - {this.state.selectedStock && this.state.selectedStock.country}</p>
                        <Divider/>
                        <StockTable
                          update={this.currentStockData}
                          buy={this.state.buy}
                          sell={this.state.sell}
                          stock={this.state.selectedStock}
                        />    
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className='paper'>
                <h3>Búsqueda de Exchanges</h3>
                <Autocomplete
                  id="exchanges-selector"
                  options={Object.keys(this.state.exchanges)}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Exchanges" variant="outlined" />}
                  onChange={(event, newValue) => {
                    this.setState({selectedExchange: newValue});
                  }}
                />
                <ExchangesTable
                  update={this.currentStockData}
                  buy={this.state.buy}
                  sell={this.state.sell}
                  exchange={this.state.selectedExchange}
                  exchanges={this.state.exchanges}
                  stocks={this.state.stocks}
                />
              </Paper>
            </Grid>
          </Grid>
          
          <Grid container>
          </Grid>
        </Container>

      </div>
    );
}
}
export default App;
