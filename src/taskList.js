import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

let urgent = [];
let high = [];
let medium = [];
let low = [];
let todoListGroups = [];
let deletedGroup = [];

export default function TaskList() {
  const classes = useStyles();
  return (
    <div className='main-container'>
      <div className='viewPane-wrap'>
        <div className='taskItem'>
          <div className={ classes.root }>
            WIP
          </div>
        </div>
      </div>
    </div>
  );
}


