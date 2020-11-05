import React from 'react';

import {
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import theme from './theme';

import NavBar from './navbar';
import Footer from './footer';

// setConfig({
//   showReactDomPatchNotification: false
// });

const App = () => {
  const useStyles = makeStyles(() => ({
    appContainer: {
      height: '100%',
      maxWidth: '100%',
      margin: '0',
      backgroundSize: 'cover',
      backgroundPosition: 'fixed',
      background: 'linear-gradient(130deg, #B2D1DD 0%, #406371 100%)',
      paddingTop: 5,
      paddingBottom: 5,
    },
  }));

  const classes = useStyles();
  return (
    <ThemeProvider theme={ theme }>
      <Container className={ classes.appContainer } disableGutters>
        <CssBaseline />
        <NavBar />
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
