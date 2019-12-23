import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Layout, Menu, Icon, Empty } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import 'antd/dist/antd.css';

import Account from './Account';
import NewAccount from './NewAccount';

interface HomeProps {
  workspace: any[];
}

interface HomeState {
  menuTemplate: any[];
  collapsed: boolean;
  firstRender: boolean;
}

export class HomePage extends React.Component<HomeProps, HomeState> {
  constructor(props) {
    super(props);
    this.state = {
      menuTemplate: [
        {
          label: 'File',
        }
      ],
      collapsed: true,
      firstRender: true,
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  setFirstRenderFalse = () => {
    this.setState({ firstRender: false }); 
  };

  getMenuEntries = () => {
    let entries = [
      <Menu.Item key='home' >
        <Icon type='home' />
        <span>home</span>
        <Link to='/' />
      </Menu.Item>
    ];

    for (let i = 0; i < this.props.workspace.length; ++i) {
      entries.push(
        <Menu.Item key={ this.props.workspace[i]['name'] } onClick={this.setFirstRenderFalse}>
          <Icon type={ this.props.workspace[i]['icon'] } />
          <span>{ this.props.workspace[i]['name'] }</span>
          <Link to={ this.props.workspace[i]['link'] } />
        </Menu.Item>
      );
    };

    entries.push(
      <Menu.Item key='new-account' onClick={this.setFirstRenderFalse}>
        <Icon type='plus-circle' />
        <span>new account</span>
        <Link to='/new-account' />
      </Menu.Item>
    );

    return(entries);
  };

  getSiderMenu = () => {
    let entries = this.getMenuEntries();
    return(
      <Sider
        collapsible
        collapsed = {this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="dark"
        style={{ overflowX: 'auto' }}
        >
        <Menu theme="dark" defaultOpenKeys={['home']} mode="inline">
          { this.getMenuEntries() }
        </Menu>
      </Sider>
    );
  };

  getRoutes = () => {
    let data = require('../data/data.json');
    let routes = [
      <Route
        exact path='/'
        render={(props) => <Account {...props} data={data[0]} />}
      />
    ];

    for (let i = 0; i < this.props.workspace.length; ++i) {
      routes.push(
        <Route
          path={ this.props.workspace[i]['link'] }
          render={(props) => <Account {...props} data={data[0]} />}
        />
      );
    };

    routes.push(
      <Route
        path='/new-account'
        render={(props) => <NewAccount {...props} dataPath="data-path" />}
      />
    );

    return(routes);
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          { this.getSiderMenu() }
          <Layout>
            {this.state.firstRender ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : null}
            <Content style={{ margin: '0 16px' }}>
              { this.getRoutes() }
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
