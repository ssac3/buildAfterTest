import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {GlobalStyles} from './styles/GlobalStyle';
import {ThemeProvider} from 'styled-components';
import theme from './styles/theme';
import store from 'redux/stores';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import history from 'utils/history';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <ThemeProvider theme={{ ...theme }}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    <GlobalStyles />
  </Provider>,
);