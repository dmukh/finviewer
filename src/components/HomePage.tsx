import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import 'antd/dist/antd.css';

import { TitleBar } from 'electron-react-titlebar';

import Line from './charts/Line';

interface HomeState {
  menuTemplate: any[];
  collapsed: boolean;
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
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
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
              <Menu.Item key='spartan'>
                <Icon type='fund' />
                <span>spartan trading</span>
                <Link to='/spartan' />
              </Menu.Item>
              <Menu.Item key='robinhood'>
                <Icon type='stock' />
                <span>robinhood</span>
                <Link to='/robinhood' />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              <Route exact path='/' component={Line} />
              <Route path='/spartan' component={Line} />
              <Route path='/robinhood' component={Line} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
