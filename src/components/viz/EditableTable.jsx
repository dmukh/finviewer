import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './EditableTable.css';
import { Table, Input, Button, Popconfirm, Form, Radio } from 'antd';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

const tableColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
    width: '15%',
    editable: true,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '35%',
    render: (text, record) => (
      <Radio.Group name="type" defaultValue={text}>
        <Radio value='Deposit'>Deposit</Radio>
        <Radio value='Profit'>Profit</Radio>
        <Radio value='Withdrawal'>Withdrawal</Radio>
      </Radio.Group>
    ),
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    editable: true,
  },
  {
    title: 'Profit/Loss',
    dataIndex: 'change',
  },
  {
    title: 'Net Profit',
    dataIndex: 'net-profit',
  },
//  {
//    title: 'Delete',
//    dataIndex: 'delete',
//    width: '7%',
//    render: (text, record) =>
//      this.state.dataSource.length >= 1 ? (
//        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
//          <Button type="danger">X</Button>
//        </Popconfirm>
//      ) : null,
//   },
];

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { dataSource } = this.state;
    const newData = {
      key: dataSource.length,
      name: '',
      age: '',
      address: '',
    };
    this.setState({
      dataSource: [...dataSource, newData],
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = tableColumns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginTop: 16, marginBottom: 16 }}>
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size="small"
        />
      </div>
    );
  }
}

