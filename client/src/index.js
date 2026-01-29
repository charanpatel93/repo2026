import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
let initialStorage={
  userDetails:{}
}

let redux=(latestStorage=initialStorage,dispatchedData)=>{

  if(dispatchedData.type==="login"){
    return{...latestStorage,userDetails:dispatchedData.data}
  }
  return latestStorage
}

let store=createStore(redux);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <App />
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
