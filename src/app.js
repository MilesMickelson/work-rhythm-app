import React from 'react';

import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import {
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import theme from './theme';

import TaskList from './taskList';
import StandTimer from './standTimer';
import VisionTimer from './visiontimer';
import Settings from './settings';
import NavBar from './navbar';

// setConfig({
//   showReactDomPatchNotification: false
// });

// import { useIdleTimer } from 'react-idle-timer';

// useEffect(() => {
//   const handleOnIdle = event => {
//     console.log('user is idle', event)
//     console.log('last active', getLastActiveTime())
//   }

//   const handleOnActive = event => {
//     console.log('user is active', event)
//     console.log('time remaining', getRemainingTime())
//   }

//   const handleOnAction = (e) => {
//     console.log('user did something', e)
//   }

//   const { getRemainingTime, getLastActiveTime } = useIdleTimer({
//     timeout: 1000 * 60 * 15,
//     onIdle: handleOnIdle,
//     onActive: handleOnActive,
//     onAction: handleOnAction,
//     debounce: 500
//   });

export default function App() {
  const useStyles = makeStyles(() => ({
    appContainer: {
      background: 'linear-gradient(130deg, #26a0da 0%, #314755 100%)',
      height: '100%',
      maxWidth: '100%',
    },
  }));

  const classes = useStyles();
  return (
    <ThemeProvider theme={ theme }>
      <Container className={ classes.appContainer } disableGutters='true'>
        <CssBaseline />
        <NavBar />
        <Router>
          <Route exact path='/' component={ TaskList } />
          <Route exact path='/StandTimer' component={ StandTimer } />
          <Route exact path='/VisionTimer' component={ VisionTimer } />
          <Route exact path='/Settings' component={ Settings } />
        </Router>
      </Container>
    </ThemeProvider>
  );
}
