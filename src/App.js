import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import history from './common/history';
import Schedule from './features/schedule/Schedule';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default function App() {
  return (
    <div>
      <div className="app-container">
        {/* <MuiThemeProvider>
          <Provider store={store}> */}
        <Router history={history}>
          <Route path="/" exact component={Schedule} />
        </Router>
        <CssBaseline />
        {/* </Provider>
        </MuiThemeProvider> */}
      </div>
    </div>
  );
}
