import * as React from 'react'
import Line from './charts/Line'

import { HomePage } from './HomePage'

export default class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <HomePage />
            </div>
        )
    }
}
