import * as React from 'react';

import { Button } from 'antd';
import 'antd/dist/antd.css';

import Line from '../viz/Line';
import EditableTable  from '../viz/EditableTable';
import '../viz/EditableTable.css';

export default class Account extends React.Component {

  handleDelete = () => {

  };

  handleRemoveAccount = () => {

  };

  public render() {
    let data = require('../data/data.json');
    return (
      <div style={{ height: 400, }} >
        <Button
          type='danger'
          onClick={this.handleDelete}
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          Delete Account
        </Button>
        <Line />
        <EditableTable />
      </div>
    )
  }
}
