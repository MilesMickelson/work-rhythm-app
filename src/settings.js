import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';

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
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className='main-container'>
      <div id='settings-wrap'>
        <FormGroup>
          <h4 className='em-label'>General</h4>
          <Divider className='divider' />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.checkedA } onChange={ handleChange } name='checkedA' id='general-settings' /> }
            label='Start Work Rhythm on Login'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.checkedA } onChange={ handleChange } name='checkedA' id='general-settings' /> }
            label='Start vision break interval on Login'
          />
          <h4 className='em-label'>Display</h4>
          <Divider className='divider' />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.checkedA } onChange={ handleChange } name='checkedA' id='general-settings' /> }
            label='Show vision break time remaining in toolbar'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.checkedA } onChange={ handleChange } name='checkedA' id='general-settings' /> }
            label='Show current task name in toolbar'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.checkedA } onChange={ handleChange } name='checkedA' id='general-settings' /> }
            label='Show current task time in toolbar'
          />
          <h4 className='em-label'>Do Not Disturb</h4>
          <Divider className='divider' />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.checkedA } onChange={ handleChange } name='checkedA' id='general-settings' /> }
            label='Turn off all timers and notifications'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.checkedA } onChange={ handleChange } name='checkedA' id='general-settings' /> }
            label='Turn off all to-do list timers and notifications'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.checkedA } onChange={ handleChange } name='checkedA' id='general-settings' /> }
            label='Turn off all vision interval timers and notifications'
          />
          <FormControlLabel
            control={ <PurpleSwitch checked={ state.checkedA } onChange={ handleChange } name='checkedA' id='general-settings' /> }
            label='Turn off all postural interval timers and notifications'
          />
        </FormGroup>
      </div>
    </div>
  );
}
