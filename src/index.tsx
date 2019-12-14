import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';
import './index.css';

document.title = 'finviewer';
const rootElem = document.createElement('div');
rootElem.style.height = '100%';
document.body.appendChild(rootElem);

const render = Component => {
    ReactDOM.render(<AppContainer><Component /></AppContainer>, rootElem);
}

if ((module as any).hot) {
    (module as any).hot.accept('./components/App', () => { render(App); });
}

render(App);
