import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ProviderLayer from './ProviderLayer';
import { FirebaseAppProvider } from 'reactfire';

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGE_ID = process.env.REACT_APP_FIREBASE_MESSAGE_ID;
const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;
const FIREBASE_DB_URL = process.env.REACT_APP_FIREBASE_DB_URL;


const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_ID,
  appId: FIREBASE_APP_ID,
  databaseURL: FIREBASE_DB_URL,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider  firebaseConfig={firebaseConfig}>
        <ProviderLayer />
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();