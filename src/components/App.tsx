import * as React from 'react'
import Line from './viz/Line'

import EditableTable from './viz/EditableTable'
import './viz/EditableTable.css'

export default class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Line />
        <EditableTable />
      </div>
    )
  }
}
