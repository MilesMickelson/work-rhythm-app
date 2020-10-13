import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/core/Delete';
import AlarmIcon from '@material-ui/core/Alarm';
import AddShoppingCartIcon from '@material-ui/core/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function IconButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label='delete'>
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label='delete' disabled color='primary'>
        <DeleteIcon />
      </IconButton>
      <IconButton color='secondary' aria-label='add an alarm'>
        <AlarmIcon />
      </IconButton>
      <IconButton color='primary' aria-label='add to shopping cart'>
        <AddShoppingCartIcon />
      </IconButton>
    </div>
  );
};
