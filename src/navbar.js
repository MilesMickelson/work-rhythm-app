import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter as Router } from 'react-router';

import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Box,
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core';

import {
  FormatListBulleted as ListIcon,
  Visibility as VisionIcon,
  AccessibilityNew as PostureIcon,
  Equalizer as StatsIcon,
  Alarm as AlarmIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import InfoIcon from '@material-ui/icons/Info';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Workflow from './workflow';
import Vision from './vision';
import Posture from './posture';
import Statistics from './stats';
import Custom from './custom';
import Settings from './settings';
import About from './about';
import Account from './account';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;
  return (
    <div
      role='tabpanel'
      hidden={ value !== index }
      id={ `nav-tabpanel-${index}` }
      aria-labelledby={ `nav-tab-${index}` }
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
// children: PropTypes.node, --included in Mat Ui's original tabpanel api doc above index

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
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
  },
  footerWrap: {
    width: '100%',
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    backgroundColor: theme.palette.primary.main,
    borderBottomWidth: 5,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.primary.dark,
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
            variant='fullWidth'
            value={ value }
            onChange={ handleChange }
            aria-label='navigation bar'
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
              icon={ <StatsIcon /> }
              label='Statistics'
              href='/Stats'
              className={ classes.navLink }
              aria-label='statistics pane'
              {...a11yProps(4)}
            />
            <TabLink
              icon={ <SettingsIcon /> }
              label='Settings'
              href='/Settings'
              className={ classes.navLink }
              aria-label='settings pane'
              {...a11yProps(5)}
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
          <About />
        </TabPanel>
        <TabPanel value={ value } index={ 7 }>
          <Account />
        </TabPanel>
      </Router>
      <BottomNavigation
        value={ value }
        onChange={ (event, newValue) => {
          setValue(newValue);
        } }
        showLabels
        className={ classes.footerWrap }
      >
        <BottomNavigationAction
          className={ classes.navLink }
          icon={ <InfoIcon /> }
          href='/Custom'
          label='About'
          aria-label='about page'
          {...a11yProps(6)}
        />
        <BottomNavigationAction
          label='Do Not Distrb'
          icon={ <NotificationsOffIcon /> }
          className={ classes.navLink }
        />
        <BottomNavigationAction
          className={ classes.navLink }
          icon={ <AccountCircleIcon /> }
          href='/Account'
          label='Account'
          aria-label='account page'
          {...a11yProps(7)}
        />
      </BottomNavigation>
    </>
  );
};

export default NavBar;
