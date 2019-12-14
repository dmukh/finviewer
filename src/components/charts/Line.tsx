import * as React from 'react'

import { StockPerformance } from './StockPerformance';

export default class Line extends React.Component {
    public render() {
        let data = require('../data/data.json');
        return (
            <div style={{ height: 400, }} >
            <StockPerformance data={data} />
            </div>
        )
    }
}
