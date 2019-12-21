import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Layout, Menu, Icon, Empty } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import 'antd/dist/antd.css';

import Account from './Account';
import { NewAccount } from './NewAccount';

interface HomeState {
  menuTemplate: any[];
  collapsed: boolean;
  firstRender: boolean;
}

export class HomePage extends React.Component<object, HomeState> {
  constructor(props: object) {
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

  getSiderMenu = () => {
    return(
      <Sider
        collapsible
        collapsed = {this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="dark"
        style={{ overflowX: 'auto' }}
        >
        <Menu theme="dark" defaultOpenKeys={['home']} mode="inline">
          <Menu.Item key='home'>
            <Icon type='home' />
            <span>home</span>
            <Link to='/' />
          </Menu.Item>
          <Menu.Item key='spartan' onClick={this.setFirstRenderFalse}>
            <Icon type='fund' />
            <span>spartan trading</span>
            <Link to='/spartan' />
          </Menu.Item>
          <Menu.Item key='robinhood' onClick={this.setFirstRenderFalse}>
            <Icon type='stock' />
            <span>spartan trading</span>
            <Link to='/robinhood' />
          </Menu.Item>
          <Menu.Item key='new-account' onClick={this.setFirstRenderFalse}>
            <Icon type='plus-circle' />
            <span>new account</span>
            <Link to='/new-account' />
          </Menu.Item>
        </Menu>
      </Sider>
    );
  };

  getRoutes = () => {
    let data = require('../data/data.json');
    return([
      <Route 
        exact path='/'
        render={(props) => <Account {...props} data={data} />}       
      />,
      <Route 
        path='/spartan'
        render={(props) => <Account {...props} data={data} />}       
      />,
      <Route 
        path='/robinhood'
        render={(props) => <Account {...props} data={data} />}       
      />,
      <Route
        path='/new-account'
        render={(props) => <NewAccount {...props} dataPath="data-path" />}
      />
    ]);
  };

  render() {
    let data = require('../data/data.json');
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
