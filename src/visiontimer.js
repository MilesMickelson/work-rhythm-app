import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fragmentContainer: {
    height: '100%',
    width: '100%',
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const VisionTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(! isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (! isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const classes = useStyles();
  return (
    <div className={ classes.fragmentContainer }>
      <div id='timer-wrap'>
        <div id='col-left-control'>
          <button type='submit' onClick={ toggle } className='vis-button' title='Play Button'>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button type='submit' onClick={ reset } className='vis-button' title='Reset Button'>Reset</button>
        </div>
        <div id='vision-timer'>
          { seconds }
        </div>
        <div id='col-right-control'>
          <button type='submit' className='vis-button' title='DND Button1'>30 Minutes</button>
          <button type='submit' className='vis-button' title='DND Button2'>60 Minutes</button>
          <button type='submit' className='vis-button' title='DND Button3'>90 Minutes</button>
        </div>
      </div>
    </div>
  );
};

export default VisionTimer;
