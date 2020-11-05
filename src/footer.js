import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import InfoIcon from '@material-ui/icons/Info';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
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
  footerIcon: {
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

const Posture = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <>
      <BottomNavigation
        value={ value }
        onChange={ (event, newValue) => {
          setValue(newValue);
        } }
        showLabels
        className={ classes.footerWrap }
      >
        <BottomNavigationAction label='About' icon={ <InfoIcon /> } className={ classes.footerIcon } />
        <BottomNavigationAction label='Do Not Disturb' icon={ <NotificationsOffIcon /> } className={ classes.footerIcon } />
        <BottomNavigationAction label='Account' icon={ <AccountCircleIcon /> } className={ classes.footerIcon } />
      </BottomNavigation>
    </>
  );
};

export default Posture;
