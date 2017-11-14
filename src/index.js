import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import reducer from './reducers/reducers'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom';

const store = createStore(
    reducer,
)

ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
