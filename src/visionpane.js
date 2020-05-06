import React from 'react';

export default class VisionPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='main-container'>
        <div id='space-holder' />
        <nav id='visButtons-wrap'>
          <button type='submit' className='vis-button' title='Play Button'>Play</button>
          <button type='submit' className='vis-button' title='Pause Button'>Pause</button>
          <button type='submit' className='vis-button' title='Reset Button'>Reset</button>
        </nav>
      </div>
    );
  }
}
