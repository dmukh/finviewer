import * as React from 'react';
import { StockPerformance } from './StockPerformance';

interface LineState {
  data: object;
}

export default class Line extends React.Component<LineState> {
  public render() {
    return (
      <div style={{ height: 400, }} >
        <StockPerformance data={this.props.data} />
      </div>
    )
  }
}
