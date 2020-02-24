import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import store from './store';
import Data from './application/Singers/data';
import routes from './routes';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <IconStyle />
        <Data>
          {renderRoutes(routes)}
        </Data>
      </Router>
    </Provider>
  );
}

export default App;
