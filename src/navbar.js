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

import Workflow from './taskList';
import Vision from './visiontimer';
import Posture from './standTimer';
import Statistics from './stats';
import Custom from './customTime';
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
const useStyles = makeStyles(() => ({
  appContainer: {
    background: 'linear-gradient(130deg, #B2D1DD 0%, #406371 100%)',
    height: '100%',
    maxWidth: '100%',
  },
  navPaper: {
    width: '100%',
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
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
      <div className={ classes.navPaper }>
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
              aria-label='workflow pane'
              {...a11yProps(0)}
            />
            <LinkTab
              icon={ <VisionIcon /> }
              label='Vision'
              href='/Vision'
              aria-label='vision pane'
              {...a11yProps(1)}
            />
            <LinkTab
              icon={ <PostureIcon /> }
              label='Posture'
              href='/Posture'
              aria-label='posture pane'
              {...a11yProps(2)}
            />
            <LinkTab
              icon={ <AlarmIcon /> }
              label='Custom'
              href='/Custom'
              aria-label='custom pane'
              {...a11yProps(3)}
            />
            <LinkTab
              icon={ <StatsIcon /> }
              label='Statistics'
              href='/Stats'
              aria-label='statistics pane'
              {...a11yProps(4)}
            />
            <LinkTab
              icon={ <SettingsIcon /> }
              label='Settings'
              href='/Settings'
              aria-label='settings pane'
              {...a11yProps(5)}
            />
          </Tabs>
        </AppBar>
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
      </div>
    </>
  );
};

export default NavBar;
