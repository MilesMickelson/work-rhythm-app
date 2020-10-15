import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    '&$checked': {
      color: purple[500],
    },
    '&$checked + $track': {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function Settings() {
  const [state, setState] = React.useState({
    startOnLogin: true,
    startVisLogin: true,
    showVisTime: true,
    showTaskName: true,
    showTaskTime: true,
    globalDnd: false,
    todoDnd: false,
    visionDnd: false,
    postureDnd: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className='main-container'>
      <div id='settings-wrap'>
        <FormGroup>
          <h4 className='em-label'>General</h4>
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.startOnLogin } onChange={ handleChange } name='startOnLogin' id='startOnLogin' /> }
            label='Start Work Rhythm on Login'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.startVisLogin } onChange={ handleChange } name='startVisLogin' id='startVisLogin' /> }
            label='Start vision break interval on Login'
          />
          <h4 className='em-label'>Display</h4>
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.showVisTime } onChange={ handleChange } name='showVisTime' id='showVisTime' /> }
            label='Show vision break time remaining in toolbar'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.showTaskName } onChange={ handleChange } name='showTaskName' id='showTaskName' /> }
            label='Show current task name in toolbar'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.showTaskTime } onChange={ handleChange } name='showTaskTime' id='showTaskTime' /> }
            label='Show current task time in toolbar'
          />
          <h4 className='underline'>Do Not Disturb</h4>
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.globalDnd } onChange={ handleChange } name='globalDnd' id='globalDnd' /> }
            label='Turn off all timers and notifications'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.todoDnd } onChange={ handleChange } name='todoDnd' id='todoDnd' /> }
            label='Turn off all to-do list timers and notifications'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.visionDnd } onChange={ handleChange } name='visionDnd' id='visionDnd' /> }
            label='Turn off all vision interval timers and notifications'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.postureDnd } onChange={ handleChange } name='postureDnd' id='postureDnd' /> }
            label='Turn off all postural interval timers and notifications'
          />
        </FormGroup>
      </div>
    </div>
  );
}
