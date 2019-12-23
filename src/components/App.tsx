import * as React from 'react';
import { HomePage } from './ui/HomePage';

export default class App extends React.Component {
  public render() {
    let workspace = require('./config/workspace.json');
    return (
      <div className="App">
        <HomePage workspace={workspace} />
      </div>
    )
  }
}
