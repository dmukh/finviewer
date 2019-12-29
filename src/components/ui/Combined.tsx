import * as React from 'react';

import { Button, Modal, Radio } from 'antd';
import 'antd/dist/antd.css';

import { BalanceData, ProfitData, PercentData } from './AccountData';
import Line from '../viz/Line';

interface CombinedProps {
  data: object;
}

interface CombinedState {
  lineData: object;
}

export default class Combined extends React.Component<CombinedProps, CombinedState> {
  constructor(props) {
    super(props);
    this.state = {
      lineData: BalanceData(this.props.data[1]),
    };
  }

  formLineData = () => {
    let data = BalanceData(this.props.data[1]);
    return(data);
  }

  handleChange = e => {
    let line = [];
    if (e.target.value === 'balance') {
      line = BalanceData(this.props.data[1]);
    } else if (e.target.value === 'profit') {
      line = ProfitData(this.props.data[1]);
    } else if (e.target.value === 'percent') {
      line = PercentData(this.props.data[1]);
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
