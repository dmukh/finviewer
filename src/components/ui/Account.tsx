import * as React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

import Line from '../charts/Line';

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
          shape='circle'
          icon='minus-circle'
          onClick={this.handleDelete}
          style={{ marginTop: 16, marginBottom: 16 }}
        >
        </Button>
        <Line />
      </div>
    )
  }
}
