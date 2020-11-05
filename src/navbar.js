import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter as Router } from 'react-router';

import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Box
} from '@material-ui/core';

import {
  FormatListBulleted as ListIcon,
  Visibility as VisionIcon,
  AccessibilityNew as PostureIcon,
  Equalizer as StatsIcon,
  Alarm as AlarmIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';

import Workflow from './workflow';
import Vision from './vision';
import Posture from './posture';
import Statistics from './stats';
import Custom from './custom';
import Settings from './settings';

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

function LinkTab(props) {
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
  linkTab: {
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
  }
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
            <LinkTab
              icon={ <ListIcon /> }
              label='Workflow'
              href='/Workflow'
              className={ classes.linkTab }
              aria-label='workflow pane'
              {...a11yProps(0)}
            />
            <LinkTab
              icon={ <VisionIcon /> }
              label='Vision'
              href='/Vision'
              className={ classes.linkTab }
              aria-label='vision pane'
              {...a11yProps(1)}
            />
            <LinkTab
              icon={ <PostureIcon /> }
              label='Posture'
              href='/Posture'
              className={ classes.linkTab }
              aria-label='posture pane'
              {...a11yProps(2)}
            />
            <LinkTab
              icon={ <AlarmIcon /> }
              label='Custom'
              href='/Custom'
              className={ classes.linkTab }
              aria-label='custom pane'
              {...a11yProps(3)}
            />
            <LinkTab
              icon={ <StatsIcon /> }
              label='Statistics'
              href='/Stats'
              className={ classes.linkTab }
              aria-label='statistics pane'
              {...a11yProps(4)}
            />
            <LinkTab
              icon={ <SettingsIcon /> }
              label='Settings'
              href='/Settings'
              className={ classes.linkTab }
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
      </Router>
    </>
  );
};

export default NavBar;
