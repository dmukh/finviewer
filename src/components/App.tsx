import * as React from 'react'
import Line from './charts/Line'
import './App.css'

export default class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Line />
      </div>
    )
  }
}
