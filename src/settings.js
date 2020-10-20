import React, { useState, useEffect } from 'react';

import {
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import theme from './theme';

const SettingSwitch = withStyles({
  switchBase: {
    color: theme.palette.secondary.light,
    '&$checked': {
      color: theme.palette.secondary.dark,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Settings = () => {
  const [state, setState] = React.useState({
    startOnLogin: true,
    startVisLogin: true,
    showVisTime: true,
    showTaskName: true,
    showTaskTime: true,
    soundVisionStart: false,
    soundVisionEnd: true,
    soundTaskStart: false,
    soundTaskEnd: true,
    soundPostureStart: true,
    taskTimerInactive: true,
    visionTimerInactive: true,
    postureTimerInactive: true,
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
          <h4 className='em-label'>Sound</h4>
          <FormControlLabel
            control={ <SettingSwitch checked={ state.soundVisionStart } onChange={ handleChange } name='soundVisionStart' id='soundVisionStart' /> }
            label='Play sound on vision break start'
            className={ classes.label }
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.soundVisionEnd } onChange={ handleChange } name='soundVisionEnd' id='soundVisionEnd' /> }
            label='Play sound on vision break end'
            className={ classes.label }
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.soundTaskStart } onChange={ handleChange } name='soundTaskStart' id='soundTaskStart' /> }
            label='Play sound on To-Do item timer start'
            className={ classes.label }
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.soundTaskEnd } onChange={ handleChange } name='soundTaskEnd' id='soundTaskEnd' /> }
            label='Play sound on To-Do item timer end'
            className={ classes.label }
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.soundPostureStart } onChange={ handleChange } name='soundPostureStart' id='soundPostureStart' /> }
            label='Play sound on start of posture change interval'
            className={ classes.label }
          />
          <h4 className='em-label'>Notifications</h4>
          <FormControlLabel
            control={ <SettingSwitch checked={ state.taskTimerInactive } onChange={ handleChange } name='taskTimerInactive' id='taskTimerInactive' /> }
            label='Remind me if a To-Do item is not activated after 5 minutes'
            className={ classes.label }
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.visionTimerInactive } onChange={ handleChange } name='visionTimerInactive' id='visionTimerInactive' /> }
            label='Remind me if my vision break timer is not set after 5 minutes'
            className={ classes.label }
          />
          <FormControlLabel
            control={ <SettingSwitch checked={ state.postureTimerInactive } onChange={ handleChange } name='postureTimerInactive' id='postureTimerInactive' /> }
            label='Remind me if my posture change timer is not set after 5 minutes'
            className={ classes.label }
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
