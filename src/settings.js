import React, { useState, useEffect } from 'react';

import {
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const SettingSwitch = withStyles({
  switchBase: {
    color: indigo[200],
    '&$checked': {
      color: indigo[400],
    },
    '&$checked + $track': {
      backgroundColor: indigo[400],
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {},
}));

const Settings = () => {
  const [state, setState] = React.useState({
    startOnLogin: true,
    startVisLogin: true,
    darkTheme: false,
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

  const classes = useStyles();
  return (
    <>
      <div id='settings-wrap'>
        <FormGroup>
          <h4 className='em-label'>General</h4>
          <FormControlLabel
            control={ <SettingSwitch checked={ state.startOnLogin } onChange={ handleChange } name='startOnLogin' id='startOnLogin' /> }
            label='Start Work Rhythm on Login'
            className={ classes.label }
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.startVisLogin } onChange={ handleChange } name='startVisLogin' id='startVisLogin' /> }
            label='Start vision break interval on Login'
          />
          <h4 className='em-label'>Display</h4>
          <FormControlLabel
            control={ <SettingSwitch checked={ state.darkTheme } onChange={ handleChange } name='darkTheme' id='darkTheme' /> }
            label='Dark theme'
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.showVisTime } onChange={ handleChange } name='showVisTime' id='showVisTime' /> }
            label='Show vision break time remaining in toolbar'
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.showTaskName } onChange={ handleChange } name='showTaskName' id='showTaskName' /> }
            label='Show current task name in toolbar'
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.showTaskTime } onChange={ handleChange } name='showTaskTime' id='showTaskTime' /> }
            label='Show current task time in toolbar'
          />
          <h4 className='underline'>Do Not Disturb</h4>
          <FormControlLabel
            control={ <SettingSwitch checked={ state.globalDnd } onChange={ handleChange } name='globalDnd' id='globalDnd' /> }
            label='Turn off all timers and notifications'
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.todoDnd } onChange={ handleChange } name='todoDnd' id='todoDnd' /> }
            label='Turn off all to-do list timers and notifications'
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.visionDnd } onChange={ handleChange } name='visionDnd' id='visionDnd' /> }
            label='Turn off all vision interval timers and notifications'
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.postureDnd } onChange={ handleChange } name='postureDnd' id='postureDnd' /> }
            label='Turn off all postural interval timers and notifications'
          />
        </FormGroup>
      </div>
    </>
  );
};

export default Settings;
