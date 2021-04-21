import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';
import './styles/app.css';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// client side rendered app: react (cra)
// -> database which is Firebase
// -> react-loading-skeleton
// tailwind

// folder structure
// src
// -> components
// -> constants
// -> context
// -> helpers
// -> hooks
// -> pages
// -> lib (Firebase is going to live in here)
// -> services (Firebase functions in  here)
// eslint-disable-next-line prettier/prettier
// -> styles (tailwind's folder (app/tailwind))
