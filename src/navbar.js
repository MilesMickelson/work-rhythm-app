import React from 'react';

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
          <button type='submit' className='nav-button' title='Tasks Pane'>
            <a
              href='#/'
              rel='noopener noreferrer'
            >
              Tasks
            </a>
          </button>
          <button type='submit' className='nav-button' title='Posture Pane'>
            <a
              href='#/StandTimer'
              rel='noopener noreferrer'
            >
              Posture
            </a>
          </button>
          <button type='submit' className='nav-button' title='Vision Pane'>
            <a
              href='#/VisionTimer'
              rel='noopener noreferrer'
            >
              Vision
            </a>
          </button>
          <button type='submit' className='nav-button' title='Settings Pane'>
            <a
              href='#/Settings'
              rel='noopener noreferrer'
            >
              Settings
            </a>
          </button>
        </nav>
      </div>
    );
  }
}
