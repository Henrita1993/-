import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import store from "./redux/store"
import App from './App';
// import Text from './text.jsx';

// const AppView = (
//     <Provider store={store}>
//         <App />
//     </Provider>
// )
// ReactDOM.render(<App />, document.getElementById('root'))





ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'))


