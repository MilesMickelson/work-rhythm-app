import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useInputState from '../hooks/useInputState';
import useTodoState from '../hooks/useTodoState';
import CalDialog from './dialog';
import EnhancedTableToolbar from './tableToolbar';
import EnhancedTableHead from './tableHead';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return - 1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => - descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  fragContainer: {
    height: '100%',
    width: '100%',
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputWrap: {
    width: '100%',
    borderRadiusTopLeft: 4,
    borderRadiusTopRight: 4,
    borderBottom: '2px solid #005269'
  },
  button: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  closeTodo: {
    color: theme.palette.primary.light,
  },
  addTodo: {
    color: theme.palette.primary.dark,
  },
  tableWrap: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: 4,
    boxShadow: '0 0 0 2px #005269',
  },
  table: {
    width: '100%',
    minWidth: 760,
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: - 1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  border: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  topMargin: {
    marginTop: 16,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
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
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.light,
      },
  toolheader: {
    flex: '1 1 100%',
  },
}));

const WorkFlow = (props) => {
  const classes = useStyles();
  const { todoItems, addTodoItem } = useTodoState([]);
  // const [todoItems, setTodoItems] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = todoItems.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === - 1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, - 1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleExpandClick = () => {
    setExpanded(! expanded);
  };

  const isSelected = (id) => selected.indexOf(id) !== - 1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, todoItems.length - page * rowsPerPage);
  // console.log('Workflow Comp. State ->', name);
  console.log('Workflow State todoItems: ->', todoItems);

  return (
    <div className={ classes.fragContainer }>
      <Paper className={ classes.tableWrap }>
        <EnhancedTableToolbar
          saveTodo={ (title) => {
            const trimmedText = title.trim();
            if (trimmedText.length > 0) {
              addTodoItem(trimmedText);
            } } }
          numSelected={ selected.length }
        />
        <TableContainer>
          <Table
            className={ classes.table }
            aria-labelledby='tableTitle'
            size={ dense ? 'small' : 'medium' }
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              // addTodoItem={ addTodoItem }
              classes={ classes }
              order={ order }
              orderBy={ orderBy }
              onSelectAllClick={ handleSelectAllClick }
              onRequestSort={ handleRequestSort }
              numSelected={ selected.length }
              rowCount={ todoItems.length }
            />
            <TableBody>
              {stableSort(todoItems, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((todoItem, id) => {
                  const isItemSelected = isSelected(todoItem.id);
                  const labelId = `enhanced-table-checkbox-${id}`;
                  return (
                    <>
                      <TableRow
                        hover
                        tabIndex={ - 1 }
                        key={ id.toString() }
                        // key={ index }
                        // index={ index }
                        todoItem={ todoItem }
                        aria-checked={ isItemSelected }
                        selected={ isItemSelected }
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            role='checkbox'
                            onClick={ (event) => handleClick(event, todoItem.id) }
                            aria-checked={ isItemSelected }
                            selected={ isItemSelected }
                            checked={ isItemSelected }
                            inputProps={ { 'aria-labelledby': labelId } }
                          />
                        </TableCell>
                        <TableCell align='left' component='th' id={ labelId } scope='row' padding='none'>
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
                      <TableRow
                        hover
                        tabIndex={ - 1 }
                        key={ todoItem.id }
                        className={ classes.border }
                        aria-checked={ isItemSelected }
                        selected={ isItemSelected }
                      >
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
                                  {/* {todoItems.details.map((detailsRow) => (
                                    <TableRow key={ detailsRow.id }>
                                      <TableCell>{detailsRow.notes}</TableCell>
                                      <TableCell align='right'>{detailsRow.added}</TableCell>
                                    </TableRow>
                                  ))} */}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
            {emptyRows > 0 && (
              <TableRow style={ { height: (dense ? 33 : 53) * emptyRows } }>
                <TableCell colSpan={ 6 } />
              </TableRow>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ [10, 20, 50] }
          component='div'
          count={ todoItems.length }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onChangePage={ handleChangePage }
          onChangeRowsPerPage={ handleChangeRowsPerPage }
        />
      </Paper>
      <FormControlLabel
        control={ <Switch checked={ dense } onChange={ handleChangeDense } /> }
        label='Condense'
      />
    </div>
  );
};

export default WorkFlow;
