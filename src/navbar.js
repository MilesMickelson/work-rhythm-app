import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter as Router } from 'react-router';

import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';

import {
  FormatListBulleted as ListIcon,
  Visibility as VisionIcon,
  AccessibilityNew as PostureIcon,
  Alarm as AlarmIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
// import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
// import InfoIcon from '@material-ui/icons/Info';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Workflow from './workflow/workflow';
import Vision from './vision';
import Posture from './posture';
import Statistics from './stats';
import Custom from './custom';
import Settings from './settings';
import Account from './account';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;
  return (
    <div
      role='tabpanel'
      hidden={ value !== index }
      id={ `scrollable-force-nav-tabpanel-${index}` }
      aria-labelledby={ `scrollable-force-nav-tab-${index}` }
      {...other}
    >
      {value === index && (
        <Box>{children}</Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
// children: PropTypes.node, --included in Mat Ui's doc

function a11yProps(index) {
  return {
    id: `scrollable-force-nav-tab-${index}`,
    'aria-controls': `scrollable-force-nav-tabpanel-${index}`,
  };
}

function TabLink(props) {
  return (
    <Tab
      component='a'
      onClick={ (event) => {
        event.preventDefault();
      } }
      {...props}
    />
  );
}
const useStyles = makeStyles((theme) => ({
  navWrap: {
    width: '100%',
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.primary.light,
    borderTopWidth: 5,
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.primary.dark,
    borderRadius: 3,
    boxShadow: '0 0 0 0.1rem #005269',
  },
  navLink: {
    '&:hover': {
      color: theme.palette.secondary.light,
    },
    '&:active': {
      color: theme.palette.secondary.light,
      top: 2,
    },
    '&:focus': {
      color: theme.palette.secondary.light,
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={ classes.navWrap }>
        <AppBar position='static'>
          <Tabs
            value={ value }
            onChange={ handleChange }
            variant='scrollable'
            wrapped='true'
            scrollButtons='off'
            indicatorColor='secondary'
            aria-label='scrollable navigation tabs'
          >
            <TabLink
              icon={ <ListIcon /> }
              label='Workflow'
              href='/Workflow'
              className={ classes.navLink }
              aria-label='workflow pane'
              {...a11yProps(0)}
            />
            <TabLink
              icon={ <VisionIcon /> }
              label='Vision'
              href='/Vision'
              className={ classes.navLink }
              aria-label='vision pane'
              {...a11yProps(1)}
            />
            <TabLink
              icon={ <PostureIcon /> }
              label='Posture'
              href='/Posture'
              className={ classes.navLink }
              aria-label='posture pane'
              {...a11yProps(2)}
            />
            <TabLink
              icon={ <AlarmIcon /> }
              label='Custom'
              href='/Custom'
              className={ classes.navLink }
              aria-label='custom pane'
              {...a11yProps(3)}
            />
            <TabLink
              icon={ <SettingsIcon /> }
              label='Settings'
              href='/Settings'
              className={ classes.navLink }
              aria-label='settings pane'
              {...a11yProps(5)}
            />
            <TabLink
              icon={ <AccountCircleIcon /> }
              className={ classes.navLink }
              label='Account'
              href='/Account'
              aria-label='account pane'
              {...a11yProps(6)}
            />
          </Tabs>
        </AppBar>
      </div>
      <Router>
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
          <Custom />
        </TabPanel>
        <TabPanel value={ value } index={ 4 }>
          <Statistics />
        </TabPanel>
        <TabPanel value={ value } index={ 5 }>
          <Settings />
        </TabPanel>
        <TabPanel value={ value } index={ 6 }>
          <Account />
        </TabPanel>
      </Router>
    </>
  );
};

export default NavBar;
