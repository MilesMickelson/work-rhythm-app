import React, { useState } from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  border: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const TodoItem = (todoItem) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(! expanded);
  };
  console.log('TodoItem item state:',);

  return (
    <>
      <TableRow tabIndex={ - 1 } className={ classes.border }>
        <TableCell padding='checkbox'>
          <Checkbox
            role='checkbox'
            // onClick={ (event) => handleClick(event, todoItem.id) }
            // aria-checked={ isItemSelected }
            // selected={ isItemSelected }
            // checked={ isItemSelected }
          />
        </TableCell>
        <TableCell
          // style={ { textDecoration: todoItem.isCompleted ? 'line-through' : '' } }
          align='left'
          component='th'
          scope='row'
          padding='none'
        >
          {todoItem.title}
        </TableCell>
        <TableCell align='right'>{todoItem.priority}</TableCell>
        <TableCell align='right'>{todoItem.recur}</TableCell>
        <TableCell align='right'>{todoItem.timer}</TableCell>
        <TableCell align='right'>{todoItem.due}</TableCell>
        <TableCell>
          <IconButton
            aria-label='show more'
            aria-expanded={ expanded }
            size='small'
            onClick={ handleExpandClick }
            className={ clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            }) }
          >
            <ExpandMoreIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={ { paddingBottom: 0, paddingTop: 0 } } colSpan={ 6 }>
          <Collapse in={ expanded } timeout='auto' unmountOnExit>
            <Box margin={ 1 }>
              <Typography variant='h6' gutterBottom component='div'>
                Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell align='right'>Notes</TableCell>
                    <TableCell align='right'>Date Added</TableCell>
                    <TableCell align='right'>Total Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align='right'>{todoItem.notes}</TableCell>
                    <TableCell align='right'>{todoItem.actions}</TableCell>
                    <TableCell align='right'>{todoItem.invites}</TableCell>
                    <TableCell align='right'>{todoItem.reminders}</TableCell>
                    <TableCell align='right'>{todoItem.added}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TodoItem;
