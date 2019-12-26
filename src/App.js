import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import store from './store';
import routes from './routes';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <IconStyle />
        {renderRoutes(routes)}
      </Router>
    </Provider>
  );
}

export default App;
