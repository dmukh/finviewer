import * as React from 'react';

import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';

import Line from '../viz/Line';
import EditableTable  from '../viz/EditableTable';
import '../viz/EditableTable.css';

interface AccountState {
  data: object;
}

export default class Account extends React.Component<AccountState> {

  showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this account?',
      content: 'This button does not work as of now.',
      //content: 'This decision cannot be reversed and data will be lost.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() { console.log('OK'); },
      onCancel() {},
    });
  } 

  formLineData = () => {
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

    return(data);
  }

  formTableData = () => {
    return this.props.data['data'];
  }

  public render() {
    return (
      <div style={{ height: 400, }} >
        <Line data={ this.formLineData() } />
        <EditableTable dataSource={ this.formTableData() } />
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
