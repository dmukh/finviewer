import * as React from 'react';

export function BalanceData(data) {
  let profit_data = [];
  let capital_data = [];
  let capital_value = 0;
  for (let i = 0; i < data['data'].length; ++i) {
    if (data['data'][i]['type'] === 'Profit') {
      profit_data.push({
        'x': data['data'][i]['date'],
        'y': data['data'][i]['balance']
      });
      capital_data.push({
        'x': data['data'][i]['date'],
        'y': capital_value
      });
    } else {
      capital_value = capital_value + data['data'][i]['change'];
      capital_data.push({
        'x': data['data'][i]['date'],
        'y': capital_value
      });
    }
  }

  let balance_data = [
    {
      'id': 'balance',
      'color': data['color'],
      'data': profit_data
    },
    {
      'id': 'capital',
      'color': 'hsl(210, 70%, 50%)',
      'data': capital_data
    }
  ];

  return(balance_data);
}

export function ProfitData(data) {
  let line_data = [];
  for (let i = 0; i < data['data'].length; ++i) {
    if (data['data'][i]['type'] === 'Profit') {
      line_data.push({
        'x': data['data'][i]['date'],
        'y': data['data'][i]['net-profit']
      });
    }
  }

  let profit_data = [{
    'id': data['id'],
    'color': data['color'],
    'data': line_data
  }];

  return(profit_data);
}

export function PercentData(data) {
  let line_data = [];
  let capital_value = 0;
  let percent_value = 0;
  for (let i = 0; i < data['data'].length; ++i) {
    if (data['data'][i]['type'] === 'Deposit') {
      capital_value = capital_value + data['data'][i]['change'];
    } else if (data['data'][i]['type'] === 'Profit') {
      percent_value = 100.0*data['data'][i]['net-profit']/capital_value;
      line_data.push({
        'x': data['data'][i]['date'],
        'y': percent_value
      });
    }
  }

  let percent_data = [{
    'id': data['id'],
    'color': data['color'],
    'data': line_data
  }];

  return(percent_data);

}
