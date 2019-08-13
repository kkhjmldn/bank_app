import React from 'react';
import ReactDOM from 'react-dom';

import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './pages/todo/reducers'

import App from './app';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer)

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


serviceWorker.unregister();
