import * as React from 'react';

import { Button, Modal, Radio } from 'antd';
import 'antd/dist/antd.css';

import { BalanceData, ProfitData, PercentData } from './AccountData';
import Line from '../viz/Line';
import EditableTable  from '../viz/EditableTable';
import '../viz/EditableTable.css';

interface AccountProps {
  data: object;
}

interface AccountState {
  lineData: object;
  tableData: any[];
}

export default class Account extends React.Component<AccountProps, AccountState> {
  constructor(props) {
    super(props);
    this.state = {
      lineData: BalanceData(this.props.data),
      tableData: this.formTableData(),
    };
  }

  showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this account?',
      content: 'This button does not work as of now.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() { console.log('OK'); },
      onCancel() {},
    });
  } 

  formLineData = () => {
    let data = BalanceData(this.props.data);
    return(data);
  }

  handleChange = e => {
    let line = [];
    if (e.target.value === 'balance') {
      line = BalanceData(this.props.data);
    } else if (e.target.value === 'profit') {
      line = ProfitData(this.props.data);
    } else if (e.target.value === 'percent') {
      line = PercentData(this.props.data);
    }
    this.setState({lineData: line});
  }

  formTableData = () => {
    return this.props.data['data'];
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
        <EditableTable dataSource={ this.state.tableData } />
        <Button
          type='danger'
          onClick={this.showDeleteConfirm}
          style={{ marginTop: 32, marginBottom: 16 }}
        >
          Delete Account
        </Button>
      </div>
    )
  }
}
