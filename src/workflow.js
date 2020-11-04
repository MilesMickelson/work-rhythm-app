import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import AlarmIcon from '@material-ui/icons/Alarm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
    '&:hover': {
      backgroundColor: '#66ccff',
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#66ccff',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath"
        + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.00 "
        + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
  fragmentContainer: {
    height: '100%',
    width: '100%',
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '15px',
  },
}));

// let urgent = [];
// let high = [];
// let medium = [];
// let low = [];
// let todoListGroups = [];
// let deletedGroup = [];

const columns = [
  { field: 'priority', headerName: 'Priority', width: 80 },
  { field: 'toDoItem', headerName: 'To-Do Item', width: 400 },
  { field: 'dateAdded', headerName: 'Date Added', width: 110 },
  { field: 'dateDue', headerName: 'Date Due', width: 100 },
  { field: 'taskTimeRemaining', headerName: 'Time Remaining', width: 165 },
];

const rows = [
  { id: 1, priority: 'Urgent', toDoItem: 'Write more code', dateAdded: '10-19', dateDue: '10-25', taskTimeRemaining: '6d-12h-35m' },
];

export default function Workflow() {
  const classes = useStyles();
  return (
    <>
      <div className={ classes.fragmentContainer }>
        <Accordion>
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon /> }
            aria-label='Expand'
            aria-controls='additional-actions1-content'
            id='additional-actions1-header'
          >
            <FormControlLabel
              aria-label='Acknowledge'
              onClick={ (event) => event.stopPropagation() }
              onFocus={ (event) => event.stopPropagation() }
              control={ <Checkbox /> }
              label='I acknowledge that I should stop the click event propagation'
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color='textSecondary'>
              The click event of the nested action will propagate up and expand the accordion unless
              you explicitly stop it.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <div style={ { height: 820, width: '100%' } }>
          <DataGrid rows={ rows } columns={ columns } pageSize={ 10 } checkboxSelection />
        </div>
      </div>
    </>
  );
}
