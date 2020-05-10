import React from 'react';
import { Table, TableCell, TableRow } from '@material-ui/core'


function buyVolume(tickers, buy){
  let totalBuy = 0;
  for(let i = 0; i < tickers.length; i++){
    totalBuy += buy.filter((stock) => stock.ticker === tickers[i]).reduce((a, b) => a + b.volume, 0)  
  }
  console.log(totalBuy)
  console.log(buy)
  // totalBuy = buy.filter((stock) => stock.ticker === ticker).reduce((a, b) => a + b.volume, 0)
  return totalBuy;
}

function getTickers(exchange, exchanges, stocks){
  const companies = exchanges[exchange].listed_companies
  const tickers = stocks.map((stock) => {
    if (companies.includes(stock.company_name)) return stock.ticker;
    return null;
  })
  return tickers.filter(ticker => ticker);
}

function ExchangesTable(props){
    const { exchange, exchanges, stocks, buy, sell, update } = props;
    let exchangeStocks;
    if (exchange && exchanges && stocks){
      exchangeStocks = getTickers(exchange, exchanges, stocks);
    }
    exchange && console.log(exchanges)
    exchangeStocks && buyVolume(exchangeStocks, buy)
    return (
      <Table aria-label="simple table">
        <TableRow key='volumen compra'>
          <TableCell component="th" scope="row">
            Volumen Compra
          </TableCell>
          <TableCell align="right">{exchangeStocks && buyVolume(exchangeStocks, buy)}</TableCell>
        </TableRow>
        <TableRow key='volumen venta'>
          <TableCell component="th" scope="row">
            Volumen Venta
          </TableCell>
          <TableCell align="right">0</TableCell>
        </TableRow>
        <TableRow key='volumen total'>
          <TableCell component="th" scope="row">
            Volumen Total
          </TableCell>
          <TableCell align="right">0</TableCell>
        </TableRow>
        <TableRow key='cantidad acciones'>
          <TableCell component="th" scope="row">
            Cantidad de Acciones
          </TableCell>
          <TableCell align="right">0</TableCell>
        </TableRow>
        <TableRow key='participacion de mercado'>
          <TableCell component="th" scope="row">
            Participación de Mercado
          </TableCell>
          <TableCell align="right">0</TableCell>
        </TableRow>
      </Table>
      )
  }
  
  export default ExchangesTable;
  