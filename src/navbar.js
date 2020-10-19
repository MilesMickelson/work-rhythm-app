import React, { useState, useEffect } from 'react';

const chair = require('./images/chair.png');
const eye = require('./images/eye.png');
const list = require('./images/list.png');
const settings = require('./images/settings.png');

const NavBar = () => {
  return (
    <>
      <nav className='navBar-wrap' aria-label='primary'>
        <a href='#/' rel='noopener noreferrer'>
          <img src={ list } className='nav-icon' alt='' />
        </a>
        <a href='#/VisionTimer' rel='noopener noreferrer'>
          <img src={ eye } className='nav-icon' alt='' />
        </a>
        <a href='#/StandTimer' rel='noopener noreferrer'>
          <img src={ chair } className='nav-icon' alt='' />
        </a>
        <a href='#/Settings' rel='noopener noreferrer'>
          <img src={ settings } className='nav-icon' alt='' />
        </a>
      </nav>
    </>
  );
};

export default NavBar;
