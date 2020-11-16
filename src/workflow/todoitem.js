import React, { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';

import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

import useInputState from '../hooks/useInputState';
import useSetSelected from '../hooks/useSetSelected';
import useTodoState from '../hooks/useTodoState';

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

const itemId = nanoid();

const TodoItem = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { itemList } = useTodoState([]);
  // const [selected, setSelected] = useSetSelected([]);

  const handleExpandClick = () => {
    setExpanded(! expanded);
  };
  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = itemList.map((n) => n.id);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };
  // const handleClick = (event, id) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected = [];
  //   if (selectedIndex === - 1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, - 1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  return (
    <>
      {itemList.map((itemList, index) => (
        <div
          hover
          tabIndex={ - 1 }
          key={ itemId }
          index={ index }
          // aria-checked={ isItemSelected }
          // selected={ isItemSelected }
        >
          <TableRow>
            <TableCell padding='checkbox'>
              <Checkbox
                role='checkbox'
                // onClick={ (event) => handleClick(event, todoItem.id) }
                // aria-checked={ isItemSelected }
                // selected={ isItemSelected }
                // checked={ isItemSelected }
              />
            </TableCell>
            <TableCell align='left' component='th' scope='row' padding='none'>{itemList.title}
            </TableCell>
            <TableCell align='right'>{itemList.priority}</TableCell>
            <TableCell align='right'>{itemList.recur}</TableCell>
            <TableCell align='right'>{itemList.timer}</TableCell>
            <TableCell align='right'>{itemList.due}</TableCell>
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
                        <TableCell align='right'>{itemList.notes}</TableCell>
                        <TableCell align='right'>{itemList.actions}</TableCell>
                        <TableCell align='right'>{itemList.invites}</TableCell>
                        <TableCell align='right'>{itemList.reminders}</TableCell>
                        <TableCell align='right'>{itemList.added}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </div>
      ))}
    </>
  );
};

export default TodoItem;
