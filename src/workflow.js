import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Calendar from 'react-calendar';

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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

// ! Later implementation for unique id's-use nano id repo instead
// const shortid = require('shortid');
// function createNewTodo(text) {
//   return {
//     completed: false,
//     id: shortid.generate(),
//     text
//   };
// }

// ! Data creation and simulation //
function createData(name, id, priority, recurring, time, due) {
  return {
    name,
    id,
    priority,
    recurring,
    time,
    due,
    details: [
      { notes: '', added: '' },
    ],
  };
}

const rows = [
  createData('Write more code!', 1, 1, 'Everyday', 14.3, '1-1-2021', 'these are my details for id 1', '11-1-20'),
  createData('Eat healthy', 2, 2, 'Weekly', 14.3, '2-1-2021', 'these are my details for id 2', '11-2-20'),
  createData('Cook dinner', 3, 3, 'Business Days', 14.3, '3-1-2021', 'these are my details for id 3', '11-3-20'),
  createData('Exercise', 4, 4, 'Bi-Weekly', 14.3, '4-1-2021', 'these are my details for id 4', '11-4-20'),
  createData('Call mom', 5, 5, 'Monthly', 14.3, '5-1-2021', 'these are my details for id 5', '11-5-20'),
];

// ! Sorting Logic //
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

// ! Table Header Labels
const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'priority',
    numeric: true,
    disablePadding: false,
    label: 'Priority'
  },
  {
    id: 'recurring',
    numeric: true,
    disablePadding: false,
    label: 'Recurring'
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: 'Time Remaining'
  },
  {
    id: 'due',
    numeric: true,
    disablePadding: false,
    label: 'Due'
  },
  {
    id: 'expand',
    numeric: false,
    disablePadding: false,
    label: 'Expand'
  },
];

// ! Enhanced Table Header Component
function EnhancedTableHead(props) {
  // eslint-disable-next-line object-curly-newline
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={ numSelected > 0 && numSelected < rowCount }
            checked={ rowCount > 0 && numSelected === rowCount }
            onChange={ onSelectAllClick }
            inputProps={ { 'aria-label': 'select all desserts' } }
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={ headCell.id }
            align={ headCell.numeric ? 'right' : 'left' }
            padding={ headCell.disablePadding ? 'none' : 'default' }
            sortDirection={ orderBy === headCell.id ? order : false }
          >
            <TableSortLabel
              active={ orderBy === headCell.id }
              direction={ orderBy === headCell.id ? order : 'asc' }
              onClick={ createSortHandler(headCell.id) }
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={ classes.visuallyHidden }>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// ! Enhanced Table Toolbar Component //
const useToolbarStyles = makeStyles((theme) => ({
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

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={ clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      }) }
    >
      {numSelected > 0 ? (
        <Typography className={ classes.toolheader } color='primary' variant='subname1' component='div'>
          {numSelected}
          Selected
        </Typography>
      ) : (
        <Typography
          className={ classes.toolheader }
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Primary
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title='Filter list'>
            <IconButton aria-label='filter list'>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <IconButton aria-label='add to do item'>
            <AddCircleIcon fontSize='large' />
          </IconButton>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={ classes.root } { ...other }>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='close' className={ classes.closeButton } onClick={ onClose }>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CssTextField = withStyles((theme) => ({
  root: {
    '& label.Select': {
      color: '#262626',
    },
    '& .MuiFilledInput-root': {
      width: 440,
      borderRadius: 5,
      fontSize: 16,
      position: 'relative',
      '& fieldset': {
        border: '2px solid #005269',
      },
      '&:hover fieldset': {
        border: '2px solid #76ff03',
      },
      '&.Mui-focused fieldset': {
        border: '3px solid #76ff03',
      },
    },
  },
}))(TextField);

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
    marginTop: theme.spacing(2),
    borderRadius: 4,
    boxShadow: '0 0 0 2px #005269',
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
  root: {
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
}));

// ! WorkFlow Component Through End //
const WorkFlow = (props) => {
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState('');
  const [priority, setPriority] = React.useState(0);
  const [recur, setRecur] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [details, setDetails] = React.useState('');
  const [actions, setActions] = React.useState('');
  const [invites, setInvites] = React.useState('');
  const [reminders, setReminders] = React.useState('');
  const [orderBy, setOrderBy] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setCalendarOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
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
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  // const handleName = (event, newName) => {
  //   setName(newName);
  // };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePriority = (event) => {
    setPriority(event.target.value);
  };
  const handleRecur = (event) => {
    setRecur(event.target.value);
  };
  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const handleDetails = (event) => {
    setDetails(event.target.value);
  };
  const handleActions = (event) => {
    setActions(event.target.value);
  };
  const handleInvites = (event) => {
    setInvites(event.target.value);
  };
  const handleReminders = (event) => {
    setReminders(event.target.value);
  };
  const handleCalendarClick = () => {
    setCalendarOpen(! open);
  };
  const handleExpandClick = () => {
    setExpanded(! expanded);
  };
  const isSelected = (id) => selected.indexOf(id) !== - 1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // const [state, setState] = React.useState({
  //   age: '',
  //   name: 'hai',
  // });
  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };

  return (
    <div className={ classes.fragContainer }>
      <div className={ classes.inputWrap }>
        <FormControl className={ classes.margin }>
          <CssTextField
            multiline
            label='Title'
            margin='dense'
            variant='filled'
            onChange={ handleName }
            value={ name }
            inputProps={ {
              name: '',
              id: 'title-input',
            } }
          />
        </FormControl>
        <FormControl variant='filled' size='small' className={ classes.topMargin }>
          <InputLabel htmlFor='priority'>Priority</InputLabel>
          <Select
            native
            value={ priority }
            onChange={ handlePriority }
            inputProps={ {
              priority: '',
              id: 'priority',
            } }
          >
            <option aria-label='none' value='' />
            <option value={ 1 }>Low</option>
            <option value={ 2 }>Medium</option>
            <option value={ 3 }>High</option>
            <option value={ 4 }>Very high</option>
          </Select>
        </FormControl>
        <FormControl variant='filled' size='small' className={ classes.topMargin }>
          <InputLabel htmlFor='recur'>Recur</InputLabel>
          <Select
            native
            onChange={ handleRecur }
            value={ recur }
            inputProps={ {
              recur: '',
              id: 'recur',
            } }
          >
            <option aria-label='none' value='' />
            <option value={ 12 }>Everyday</option>
            <option value={ 11 }>Mon-Fri</option>
            <option value={ 10 }>Weekends</option>
            <option value={ 9 }>Weekly</option>
            <option value={ 8 }>Bi-Weekly</option>
            <option value={ 7 }>Tri-Weekly</option>
            <option value={ 6 }>Monthly</option>
            <option value={ 5 }>Bi-Monthly</option>
            <option value={ 4 }>Tri-Monthly</option>
            <option value={ 3 }>Monthly</option>
            <option value={ 2 }>Bi-Annually</option>
            <option value={ 1 }>Annually</option>
          </Select>
        </FormControl>
        <FormControl variant='filled' size='small' className={ classes.topMargin }>
          <InputLabel htmlFor='due'>Due Date</InputLabel>
          <Select
            native
            onClick={ handleCalendarClick }
            onChange={ handleDate }
            value={ date }
            inputProps={ {
              recur: '',
              id: 'due',
            } }
          >
            <Dialog
              onClose={ handleCalendarClick }
              aria-labelledby='dueDate-dialog-title'
              open={ open }
            >
              <DialogTitle id='dueDate-dialog-title' onClose={ handleCalendarClick }>
                Due Date
              </DialogTitle>
              <DialogContent dividers>
                <Calendar
                  id='dueDate-select'
                  onChange={ handleDate }
                  value={ date }
                />
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={ handleCalendarClick }>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Select>
        </FormControl>
        <FormControl className={ classes.margin }>
          <CssTextField
            multiline
            label='Details'
            margin='dense'
            variant='filled'
            onChange={ handleDetails }
            value={ details }
            inputProps={ {
              name: '',
              id: 'details-input',
            } }
          />
        </FormControl>
        <FormControl variant='filled' size='small' className={ classes.topMargin }>
          <InputLabel htmlFor='actions'>Actions</InputLabel>
          <Select
            native
            onChange={ handleActions }
            value={ actions }
            inputProps={ {
              actions: '',
              id: 'actions',
            } }
          >
            <option aria-label='None' value='' />
            <option value={ 1 }>Call</option>
            <option value={ 2 }>Email</option>
            <option value={ 3 }>Message</option>
            <option value={ 4 }>Read</option>
            <option value={ 5 }>Research</option>
          </Select>
        </FormControl>
        <FormControl variant='filled' size='small' className={ classes.topMargin }>
          <InputLabel htmlFor='invite'>Invite</InputLabel>
          <Select
            native
            onChange={ handleInvites }
            value={ invites }
            inputProps={ {
              invites: '',
              id: 'invite',
            } }
          >
            <option aria-label='None' value='' />
            <option value={ 1 }>Brad Pitt</option>
            <option value={ 2 }>Ryan Reynolds</option>
            <option value={ 3 }>Ryan Gosling</option>
            <option value={ 4 }>Robert Downey Jr.</option>
          </Select>
        </FormControl>
        <FormControl variant='filled' size='small' className={ classes.topMargin }>
          <InputLabel htmlFor='reminder'>Reminders</InputLabel>
          <Select
            native
            onChange={ handleReminders }
            value={ reminders }
            inputProps={ {
              reminders: '',
              id: 'reminder',
            } }
          >
            <option aria-label='None' value='' />
            <option value={ 8 }>Everyday at 9am</option>
            <option value={ 7 }>1 day before</option>
            <option value={ 6 }>3 days before</option>
            <option value={ 5 }>1 week before</option>
            <option value={ 4 }>2 weeks before</option>
            <option value={ 3 }>1 month before</option>
            <option value={ 2 }>2 months before</option>
            <option value={ 1 }>3 months before</option>
          </Select>
        </FormControl>
      </div>
      <Paper className={ classes.tableWrap }>
        <EnhancedTableToolbar numSelected={ selected.length } />
        <TableContainer>
          <Table
            className={ classes.table }
            aria-labelledby='tableTitle'
            size={ dense ? 'small' : 'medium' }
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={ classes }
              numSelected={ selected.length }
              order={ order }
              orderBy={ orderBy }
              onSelectAllClick={ handleSelectAllClick }
              onRequestSort={ handleRequestSort }
              rowCount={ rows.length }
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, id) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${id}`;
                  return (
                    <>
                      <TableRow
                        hover
                        tabIndex={ - 1 }
                        key={ row.id }
                        aria-checked={ isItemSelected }
                        selected={ isItemSelected }
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            role='checkbox'
                            onClick={ (event) => handleClick(event, row.id) }
                            aria-checked={ isItemSelected }
                            selected={ isItemSelected }
                            checked={ isItemSelected }
                            inputProps={ { 'aria-labelledby': labelId } }
                          />
                        </TableCell>
                        <TableCell align='left' component='th' id={ labelId } scope='row' padding='none'>
                          {row.title}
                        </TableCell>
                        <TableCell align='right'>{row.priority}</TableCell>
                        <TableCell align='right'>{row.recurring}</TableCell>
                        <TableCell align='right'>{row.time}</TableCell>
                        <TableCell align='right'>{row.due}</TableCell>
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
                        key={ row.id }
                        className={ classes.root }
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
                                  {row.details.map((detailsRow) => (
                                    <TableRow key={ detailsRow.id }>
                                      <TableCell>{detailsRow.notes}</TableCell>
                                      <TableCell align='right'>{detailsRow.added}</TableCell>
                                    </TableRow>
                                  ))}
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
          count={ rows.length }
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
