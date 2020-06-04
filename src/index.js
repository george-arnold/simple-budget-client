import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div
        style={{
          width: '100%',
          height: '100',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Loader type="ThreeDots" color="#000000" height="100" width="100" />
      </div>
    )
  );
};

ReactDOM.render(
  <BrowserRouter>
    <LoadingIndicator />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
