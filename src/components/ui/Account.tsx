import * as React from 'react';

import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';

import Line from '../viz/Line';
import EditableTable  from '../viz/EditableTable';
import '../viz/EditableTable.css';


export default class Account extends React.Component {

  showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this account?',
      content: 'This decision cannot be reversed and data will be lost.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() { console.log('OK'); },
      onCancel() {},
    });
  } 
  
  public render() {
    let data = require('../data/data.json');
    return (
      <div style={{ height: 400, }} >
        <Button
          type='danger'
          onClick={this.showDeleteConfirm}
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          Delete Account
        </Button>
        <Line data={data} />
        <EditableTable />
      </div>
    )
  }
}
