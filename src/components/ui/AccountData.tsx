import * as React from 'react';

export function BalanceData(data) {
  return([
    {
      'id': 'balance',
      'data': BalanceList(data)
    },
    {
      'id': 'capital',
      'data': CapitalList(data)
    }
  ]);
}

export function ProfitData(data) {
  return([{
    'id': data['id'],
    'data': ProfitList(data)
  }]);
}

export function PercentData(data) {
  return([{
    'id': data['id'],
    'data': PercentList(data)
  }]);
}

export function BalanceList(data) {
  let balance_data = [];
  for (let i = 0; i < data['data'].length; ++i) {
    if (data['data'][i]['type'] === 'Profit') {
      balance_data.push({
        'x': data['data'][i]['date'],
        'y': data['data'][i]['balance']
      });
    }
  }
  return(balance_data);
}

export function CapitalList(data) {
  let capital_data = [];
  let capital_value = 0;
  let prev_value = 0;
  let change = 0;
  for (let i = 0; i < data['data'].length; ++i) {
    change = data['data'][i]['balance'] - prev_value;
    prev_value = data['data'][i]['balance'];
    if (data['data'][i]['type'] !== 'Profit') {
      capital_value = capital_value + change;
    }
    capital_data.push({
      'x': data['data'][i]['date'],
      'y': capital_value
    });
  }
  return(capital_data);
}

export function ProfitList(data) {
  let profit_data = [];
  let prev_value = 0;
  let change = 0;
  let profit = 0;
  for (let i = 0; i < data['data'].length; ++i) {
    if (data['data'][i]['type'] === 'Profit') {
      profit = profit + data['data'][i]['balance'] - prev_value;
      profit_data.push({
        'x': data['data'][i]['date'],
        'y': profit.toFixed(2)
      });
    }
    change = data['data'][i]['balance'] - prev_value;
    prev_value = data['data'][i]['balance'];
  }
  return(profit_data);
}

export function PercentList(data) {
  let percent_data = [];
  let capital_value = 0;
  let prev_value = 0;
  let change = 0;
  let profit = 0;
  for (let i = 0; i < data['data'].length; ++i) {
    if (data['data'][i]['type'] === 'Profit') {
      profit = profit + data['data'][i]['balance'] - prev_value;
      let percent_value = 100.0*profit/capital_value;
      percent_data.push({
        'x': data['data'][i]['date'],
        'y': percent_value.toFixed(2)
      });
      prev_value = data['data'][i]['balance'];
    } else if (data['data'][i]['type'] === 'Deposit') {
      change = data['data'][i]['balance'] - prev_value;
      prev_value = data['data'][i]['balance'];
      capital_value = capital_value + change;
    }
  }
  return(percent_data);
}
