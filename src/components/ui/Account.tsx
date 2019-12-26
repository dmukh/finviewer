import * as React from 'react';

import { Button, Modal, Radio } from 'antd';
import 'antd/dist/antd.css';

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
      lineData: this.formLineData(),
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
    let data = this.balanceData();
    return(data);
  }

  balanceData = () => {
    let line_data = [];
    for (let i = 0; i < this.props.data['data'].length; ++i) {
      line_data.push({
        'x': this.props.data['data'][i]['date'],
        'y': this.props.data['data'][i]['total']
      });
    }

    let data = [{
      'id': this.props.data['id'],
      'color': this.props.data['color'],
      'data': line_data
    }];

    this.setState({lineData: data});
    return(data);
  }

  percentData = () => {
    let line_data = [];
    for (let i = 0; i < this.props.data['data'].length; ++i) {
      line_data.push({
        'y': this.props.data['data'][i]['date'],
        'x': this.props.data['data'][i]['total']
      });
    }

    let data = [{
      'id': this.props.data['id'],
      'color': this.props.data['color'],
      'data': line_data
    }];

    this.setState({lineData: data});
  }

  handleChange = e => {
    if (e.target.value === 'balance') {
        this.balanceData();
    } else {
        this.percentData();
    }
  }

  formTableData = () => {
    return this.props.data['data'];
  }

  public render() {
    return (
      <div style={{ height: 400, marginTop: 16 }} >
        <Radio.Group defaultValue="a" size="small" onChange={this.handleChange} >
          <Radio.Button value='balance'>Balance</Radio.Button>
          <Radio.Button value='percent'>Percent</Radio.Button>
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
