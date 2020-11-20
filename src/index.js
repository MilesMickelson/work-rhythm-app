import React from 'react';
import { render } from 'react-dom';
import App from './app';
// import css from './index.scss';

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
