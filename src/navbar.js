import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import VisionIcon from '@material-ui/icons/Visibility';
import PostureIcon from '@material-ui/icons/AccessibilityNew';
import SettingsIcon from '@material-ui/icons/Settings';
import Workflow from './taskList';
import Vision from './visiontimer';
import Posture from './standTimer';
import Settings from './settings';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={ value !== index }
      id={ `nav-tabpanel-${index}` }
      aria-labelledby={ `nav-tab-${index}` }
      {...other}
    >
      {value === index && (
        <Box p={ 4 }>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component='a'
      onClick={ (event) => {
        event.preventDefault();
      } }
      { ...props }
    />
  );
}

const useStyles = makeStyles((theme) => ({
  navPaper: {
    width: '100%',
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  root: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={ classes.navPaper }>
      <AppBar position='static'>
        <Tabs
          variant='fullWidth'
          value={ value }
          onChange={ handleChange }
          aria-label='nav tabs example'
        >
          <LinkTab icon={ <CheckIcon /> } label='Workflow' component={ Workflow } to='/Workflow' {...a11yProps(0)} />
          <LinkTab icon={ <VisionIcon /> } label='Vision' component={ Vision } to='/Vision' {...a11yProps(1)} />
          <LinkTab icon={ <PostureIcon /> } label='Posture' component={ Posture } to='/Posture' {...a11yProps(2)} />
          <LinkTab icon={ <SettingsIcon /> } label='Settings' component={ Settings } to='/Settings' {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={ value } index={ 0 }>
          <Workflow />
        </TabPanel>
        <TabPanel value={ value } index={ 1 }>
          <Vision />
        </TabPanel>
        <TabPanel value={ value } index={ 2 }>
          <Posture />
        </TabPanel>
        <TabPanel value={ value } index={ 3 }>
          <Settings />
        </TabPanel>
      </AppBar>
    </div>
  );
};

export default NavBar;

// const NavBar = (props) => {
//   const classes = useStyles();
// const [value, setValue] = React.useState(0);

// const handleChange = (event, newValue) => {
//   setValue(newValue);
// };

// const handleCallToRouter = (value) => {
//   this.props.history.push(value);
// };

//   return (
//     <Router>
//       <Paper round elevation={ 3 } variant='outlined fullWidth' className={ classes.navPaper }>
//         <Tabs
//           variant='fullWidth'
//           // value={ value }
//           // onChange={ handleChange }
//           value={ value }
//           onChange={ handleCallToRouter }
//           indicatorColor='secondary'
//           textColor='secondary'
//           aria-label='icon label tabs example'
//           centered
//         >
//           <Tab icon={ <CheckIcon fontSize='large' /> } label='Workflow' value='/Workflow'>
//             <Route exact path='/Workflow' component={ Workflow } />
//           </Tab>
//           <Tab icon={ <VisionIcon fontSize='large' /> } label='Vision' value='/Vision'>
//             <Route exact path='/Vision' component={ Vision } />
//           </Tab>
//           <Tab icon={ <PostureIcon fontSize='large' /> } label='Posture' value='/Posture'>
//             <Route exact path='/Posture' component={ Posture } />
//           </Tab>
//           <Tab icon={ <SettingsIcon fontSize='large' /> } label='Settings' value='/Settings'>
//             <Route exact path='/Settings' component={ Settings } />
//           </Tab>
//         </Tabs>
//       </Paper>
//     </Router>
//   );
// };

// portfolio Navigation
// export default class NavBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       home: true,
//     };
//     this.toggleHome = this.toggleHome.bind(this);
//   }

//   toggleHome() {
//     this.setState({
//       home: true,
//       projects: false,
//       credentials: false,
//       about: false,
//     });
//   }

//   render() {
//     return (
//       <div className='container-A'>
//         <div className='container-B'>
//           <nav id='nav-wrap' aria-label='primary'>
//             <a
//               title='Home Page'
//               href='#/'
//               rel='noopener noreferrer'
//               onClick={ this.toggleHome }
//             >
//               <img
//                 className={ `nav-icon ${this.state.home ? 'isSpinning' : 'notSpinning'}` }
//                 id='wheel'
//                 src={ wheel }
//                 alt='Home'
//               />
//             </a>
//           </nav>
//         </div>
//       </div>
//     );
//   }
// }
