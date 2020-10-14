import React from 'react';
import ReactDOM from 'react-dom';

import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import './index.scss';
import TaskList from './taskList';
import StandTimer from './standTimer';
import VisionTimer from './visiontimer';
import Settings from './settings';
import NavBar from './navbar';
import * as serviceWorker from './serviceWorker';

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
//   })

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
    <Router>
      <Route exact path='/' component={ TaskList } />
      <Route exact path='/StandTimer' component={ StandTimer } />
      <Route exact path='/VisionTimer' component={ VisionTimer } />
      <Route exact path='/Settings' component={ Settings } />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
