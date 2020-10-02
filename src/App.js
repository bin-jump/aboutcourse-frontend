import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import history from './common/history';
import Schedule from './features/schedule/Schedule';
import Container from './features/frame/Container';
import Account from './features/account/Account';
import Lecture from './features/lecture/Lecture';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#133d4b',
      light: '#0ee37d',
    },
    secondary: {
      main: '#0ee37d',
      light: '#ffffff',
    },
  },
  status: {
    danger: 'orange',
  },
});

export default function App() {
  return (
    <div>
      <div className="app-container">
        <Router history={history}>
          <Container>
            <MuiThemeProvider theme={theme}>
              {/* <Provider store={store}> */}

              <Route path="/" exact component={Schedule} />
              <Route path="/account" exact component={Account} />
              <Route path="/lecture" exact component={Lecture} />

              <CssBaseline />
              {/* </Provider> */}
            </MuiThemeProvider>
          </Container>
        </Router>
      </div>
    </div>
  );
}
