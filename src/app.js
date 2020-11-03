import React from 'react';

import {
  makeStyles,
  ThemeProvider,
  withStyles
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import theme from './theme';

import NavBar from './navbar';

// setConfig({
//   showReactDomPatchNotification: false
// });

const App = () => {
  const useStyles = makeStyles(() => ({
    appContainer: {
      background: 'linear-gradient(130deg, #B2D1DD 0%, #406371 100%)',
      height: '100%',
      maxWidth: '100%',
    },
  }));

  const classes = useStyles();
  return (
    <ThemeProvider theme={ theme }>
      <Container className={ classes.appContainer } disableGutters>
        <CssBaseline />
        <NavBar />
      </Container>
    </ThemeProvider>
  );
};

export default App;
