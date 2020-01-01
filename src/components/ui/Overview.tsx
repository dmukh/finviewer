import * as React from 'react';

import { Button, Modal, Radio } from 'antd';
import 'antd/dist/antd.css';

import { BalanceList, ProfitList, PercentList } from './AccountData';
import Line from '../viz/Line';

interface CombinedProps {
  data: any[];
}

interface CombinedState {
  lineData: object;
}

export default class Combined extends React.Component<CombinedProps, CombinedState> {
  constructor(props) {
    super(props);
    this.state = {
      lineData: this.balance(),
    };
  }

  checkForEntry = (total, date) => {
    let found = -1;
    for (let i = 0; i < total.length; ++i) {
      if (total[i]['x'] === date) {
        found = i;
        break;
      }
    }
    return found;
  }

  sortLineChart = (array, key) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return array.sort(
      function(a, b) {
        let a_str = a[key]; let b_str = b[key];
        let a_month = months.indexOf(a_str.substring(0,3));
        let b_month = months.indexOf(b_str.substring(0,3));
        let a_year = a_str.substring(4);
        let b_year = b_str.substring(4);
        if (a_year < b_year) {
          return -1;
        } else if (a_year > b_year) {
          return 1;
        } else {
          if (a_month < b_month) {
            return -1;
          } else if (a_month > b_month) {
            return 1;
          }
        }
        return 0;
      }
    );
  }

  balanceTotal = (data, dataType) => {
    let total = [];
    for (let i = 0; i < this.props.data.length; ++i) {
      if ((dataType === 'total') ||
        ((this.props.data[i]['type'] === dataType) && (dataType !== 'total'))) {
        for (let j = 0; j < data[i]['data'].length; ++j) {
          let entry = this.checkForEntry(total, data[i]['data'][j]['x']);
          if (entry >= 0) {
            total[entry]['y'] = total[entry]['y'] + data[i]['data'][j]['y'];
          } else {
            total.push({
              'x': data[i]['data'][j]['x'],
              'y': data[i]['data'][j]['y']
            });
          }
        }
      }
    }
    return(total);
  }

  balance = () => {
    let data = [];
    for (let i = 0; i < this.props.data.length; ++i) {
      data.push({
        'id': this.props.data[i]['id'],
        'data': BalanceList(this.props.data[i])
      });
    }
    let combined = ['liquid', 'retirement', 'total'];
    for (let i = 0; i < combined.length; ++i) {
      let total = this.balanceTotal(data, combined[i]);
      data.push({
        'id': combined[i],
        'data': this.sortLineChart(total, 'x')
      });
    }
    return(data);
  }

  profit = () => {
    let data = [];
    for (let i = 0; i < this.props.data.length; ++i) {
      data.push({
        'id': this.props.data[i]['id'],
        'data': ProfitList(this.props.data[i])
      });
    }
    return(data);
  }

  percent = () => {
    let data = [];
    for (let i = 0; i < this.props.data.length; ++i) {
      data.push({
        'id': this.props.data[i]['id'],
        'data': PercentList(this.props.data[i])
      });
    }
    return(data);
  }

  handleChange = e => {
    let line = [];
    if (e.target.value === 'balance') {
      line = this.balance();
    } else if (e.target.value === 'profit') {
      line = this.profit();
    } else if (e.target.value === 'percent') {
      line = this.percent();
    }
    this.setState({lineData: line});
  }

  public render() {
    return (
      <div style={{ height: 400, marginTop: 16 }} >
        <Radio.Group defaultValue="balance" size="small" onChange={this.handleChange} >
          <Radio.Button value='balance'>Balance</Radio.Button>
          <Radio.Button value='profit'>Profit</Radio.Button>
          <Radio.Button value='percent'>Percentage</Radio.Button>
        </Radio.Group>
        <Line data={ this.state.lineData } />
      </div>
    )
  }
}
