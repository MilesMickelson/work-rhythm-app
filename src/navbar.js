import React from 'react';

const chair = require('./images/chair.png');
const eye = require('./images/eye.png');
const list = require('./images/list.png');
const settings = require('./images/settings.png');

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='main-container'>
        <nav id='nav-wrap' aria-label='primary'>
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
      </div>
    );
  }
}
