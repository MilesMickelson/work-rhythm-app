import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
  fragmentContainer: {
    height: '100%',
    width: '100%',
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5
  },
  footerWrap: {
    width: '100%',
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
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
      <div className={ classes.fragmentContainer }>
        <BottomNavigation
          value={ value }
          onChange={ (event, newValue) => {
            setValue(newValue);
          } }
          showLabels
          className={ classes.footerWrap }
        >
          <BottomNavigationAction label='Recents' icon={ <RestoreIcon /> } className={ classes.footerIcon } />
          <BottomNavigationAction label='Favorites' icon={ <FavoriteIcon /> } className={ classes.footerIcon } />
          <BottomNavigationAction label='Nearby' icon={ <LocationOnIcon /> } className={ classes.footerIcon } />
        </BottomNavigation>
      </div>
    </>
  );
};

export default Posture;
