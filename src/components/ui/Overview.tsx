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

  balance = () => {
    let data = [];
    for (let i = 0; i < this.props.data.length; ++i) {
      data.push({
        'id': this.props.data[i]['id'],
        'data': BalanceList(this.props.data[i])
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
