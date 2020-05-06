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
          <button type='submit' className='nav-button' title='Tasks Pane'>Tasks</button>
          <button type='submit' className='nav-button' title='Posture Pane'>Posture</button>
          <button type='submit' className='nav-button' title='Vision Pane'>Vision</button>
          <button type='submit' className='nav-button' title='Settings Pane'>Settings</button>
        </nav>
      </div>
    );
  }
}
