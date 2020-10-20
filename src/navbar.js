import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { makeStyles } from '@material-ui/core/styles';

const chair = require('./images/chair.png');
const eye = require('./images/eye.png');
const list = require('./images/list.png');
const settings = require('./images/settings.png');

const useStyles = makeStyles((theme) => ({
  fragmentContainer: {
    height: '100%',
    width: '100%',
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <div className={ classes.fragmentContainer }>
      <nav className={ classes.root } aria-label='primary'>
        <ButtonGroup color='primary' aria-label='text primary button group'>
          <a href='#/' type='button' rel='noopener noreferrer'>
            <img src={ list } className='nav-icon' alt='' />
          </a>
          <a href='#/VisionTimer' type='button' rel='noopener noreferrer'>
            <img src={ eye } className='nav-icon' alt='' />
          </a>
          <a href='#/StandTimer' type='button' rel='noopener noreferrer'>
            <img src={ chair } className='nav-icon' alt='' />
          </a>
          <a href='#/Settings' type='button' rel='noopener noreferrer'>
            <img src={ settings } className='nav-icon' alt='' />
          </a>
        </ButtonGroup>
      </nav>
    </div>
  );
};

export default NavBar;
