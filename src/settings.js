import React, { useState, useEffect } from 'react';

const Settings = () => {

  return (
    <main className='main-container'>
      <form>
        <div className='radio'>
          <label htmlFor='openApp-switch'>
            <input type='radio' value='openApp' checked={ true } className='radioSetting' id='openApp-switch' />
            Start Work Rhythm on Login
          </label>
        </div>
        <div className='radio'>
          <label htmlFor='startVision-switch'>
            <input type='radio' value='start-vision' checked={ true } className='radioSetting' id='startVision-switch' />
            Start vision break interval on Login
          </label>
        </div>
        <div className='radio'>
          <label htmlFor='globalDns-switch'>
            <input type='radio' value='openApp' checked={ false } className='radioSetting' id='globalDns-switch' />
            Turn off all timers and notifications
          </label>
        </div>
        <div className='radio'>
          <label htmlFor='showVision-switch'>
            <input type='radio' value='show-task' checked={ true } className='radioSetting' id='showVision-switch' />
            Show vision break time remaining in toolbar
          </label>
        </div>
        <div className='radio'>
          <label htmlFor='showTask-switch'>
            <input type='radio' value='show-taskName' checked={ true } className='radioSetting' id='showTask-switch' />
            Show current task name in toolbar
          </label>
        </div>
        <div className='radio'>
          <label htmlFor='taskTime-switch'>
            <input type='radio' value='show-taskTime' checked={ true } className='radioSetting' id='taskTime-switch' />
            Show current task time in toolbar
          </label>
        </div>
      </form>
    </main>
  );
};

export default Settings;
