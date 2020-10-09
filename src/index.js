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
