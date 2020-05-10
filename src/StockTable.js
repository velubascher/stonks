import React from 'react';
import { Table, TableCell, TableRow } from '@material-ui/core'


function totalTradeVolume(ticker, buy, sell){
  let totalBuy = buy.filter((stock) => stock.ticker === ticker).reduce((a, b) => a + b.volume, 0)
  let totalSell = sell.filter((stock) => stock.ticker === ticker).reduce((a, b) => a + b.volume, 0)
  return totalBuy + totalSell;
}

function getMax(data){
  let values = data.map((update) => update.value);
  console.log(values)
  return Math.max(...values);
}

function getMin(data){
  let values = data.map((update) => update.value);
  console.log(values)
  return Math.min(...values);
}

function StockTable(props){
  const { stock, buy, sell, update } = props;
  return (
    <Table aria-label="simple table">
      <TableRow key='volumen total transado'>
        <TableCell component="th" scope="row">
          Volumen Total Transado
        </TableCell>
        <TableCell align="right">{stock? totalTradeVolume(stock.ticker, buy, sell): 0}</TableCell>
      </TableRow>
      <TableRow key='alto historico'>
        <TableCell component="th" scope="row">
          Alto Histórico
        </TableCell>
        <TableCell align="right">{update ? getMax(update) : 0}</TableCell>
      </TableRow>
      <TableRow key='bajo historico'>
        <TableCell component="th" scope="row">
          Bajo Histórico
        </TableCell>
        <TableCell align="right">{update ? getMin(update) : 0}</TableCell>
      </TableRow>
      <TableRow key='ultimo precio'>
        <TableCell component="th" scope="row">
          Último precio
        </TableCell>
        <TableCell align="right">83</TableCell>
      </TableRow>
      <TableRow key='variacion porcentual'>
        <TableCell component="th" scope="row">
          Variación Porcentual
        </TableCell>
        <TableCell align="right">83</TableCell>
      </TableRow>
    </Table>
    )
}

export default StockTable;
