import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from '~/components/GlobalStyle';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
);
