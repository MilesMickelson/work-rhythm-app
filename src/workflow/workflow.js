import React, {
  useState,
  useEffect,
  useRef,
  useReducer
} from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import LoopIcon from '@material-ui/icons/Loop';
import AlarmIcon from '@material-ui/icons/Alarm';
import EmailIcon from '@material-ui/icons/Email';
import SendIcon from '@material-ui/icons/Send';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import BookIcon from '@material-ui/icons/Book';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

import InputForm from './inputForm';
import EnhancedTableToolbar from './tableToolbar';
import EnhancedTableHead from './tableHead';

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return - 1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => - descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const useStyles = makeStyles((theme) => ({
  fragContainer: {
    height: '100%',
    width: '100%',
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tableWrap: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: 8,
    boxShadow: '0 0 0 2px #005269',
  },
  table: {
    width: '100%',
    minWidth: 760,
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  itemRow: {
    borderBottom: '2px solid #005269',
  },
  menuInput: {
    width: 90,
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
  expandHeader: {
    // all: 'unset',
    width: '100%',
    borderBottom: '2px dashed #005269',
  },
  expandRow: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  checkbox: {
    width: 50,
  },
  expandIcon: {
    width: 64,
  },
  remindCol: {
    width: 160,
  },
  itemDateCol: {
    width: 90,
    paddingRight: 0,
  },
  itemPriorityCol: {
    width: 90,
    padding: 0,
  },
  iconTrio: {
    padding: 0,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

// const today = new Date().toLocaleString().replace(',', '');
const today = new Date();
const todayToString = today.toLocaleString().replace(',', '');
const todaysDate = todayToString.slice(0, 10);
const todaysTime = todayToString.slice(10, 18);

const WorkFlow = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    showAdditional: false,
    key: '',
    actions: '',
    actionChips: [],
    added: '',
    checked: [],
    dense: false,
    dueDate: '',
    dueTime: '',
    expanded: false,
    highPriority: false,
    id: 0,
    isRepeating: false,
    notes: '',
    order: 'asc',
    orderBy: '',
    priority: '',
    reminders: '',
    repeat: '',
    page: 0,
    selected: '',
    stopwatchActive: false,
    showInput: false,
    title: '',
    rowsPerPage: 10,
    itemList: [
      {
        actions: 'Gmail',
        stopwatchActive: true,
        added: '12/1/2020 ',
        dueDate: '12/31/2020',
        dueTime: '6:45:00 PM',
        highPriority: true,
        id: 'JgKzuOY1ViP-L2678678',
        isRepeating: true,
        key: 'ufR9N2I28ceGkb678679',
        notes: 'These are my notes for my second todo item in order to help me test.',
        priority: 'High',
        reminders: '1 hour before',
        repeat: 'Everyday',
        title: 'Hello this is my second todo item and it helps me test what I need to.',
      },
      {
        actions: 'Outlook',
        stopwatchActive: true,
        added: '12/1/2020 ',
        dueDate: '12/31/2020',
        dueTime: '6:30:21 PM',
        highPriority: true,
        id: 'JgKzuOYwlPW1ViP-L26q9',
        isRepeating: true,
        key: 'ufR9N2I28ceGkbcPfFvoC',
        notes: 'These are my notes for my first todo item in order to help me test.',
        priority: 'High',
        reminders: '1 hour before',
        repeat: 'Everyday',
        title: 'Hello this is my first todo item and it helps me test: One Line Max!',
      },
    ]
  });
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE State:', state);

  const handleValue = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleExpandClick = () => {
    setState({ ...state, expanded: ! state.expanded });
  };
  const handleShowInput = () => {
    setState({ ...state, showInput: ! state.showInput });
  };
  const handleSwitch = () => {
    setState({ ...state, showAdditional: ! state.showAdditional });
  };
  const handleStopwatch = () => {
    setState({ ...state, stopwatchActive: ! state.stopwatchActive });
  };
  const handleDueDate = (date) => {
    const dateToString = date.toLocaleString();
    const newDueDate = dateToString.slice(0, 10);
    setState({ ...state, dueDate: newDueDate });
  };
  // todo 'Date Object Ex.' = (date) => Fri Nov 27 2020 14:30:51 GMT-0500 (Eastern Standard Time)
  const handleDueTime = (date) => {
    const timeToString = date.toLocaleString();
    const newDueTime = timeToString.slice(11, 23);
    setState({ ...state, dueTime: newDueTime });
  };

  // ! Material-UI Sorting Functions
  const handleRequestSort = (event, property) => {
    const isAsc = state.orderBy === property && state.order === 'asc';
    setState({ ...state, order: isAsc ? 'desc' : 'asc' });
    // setOrder(isAsc ? 'desc' : 'asc');
    setState({ ...state, orderBy: property });
    // setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setState({ ...state, setPage: newPage });
    // setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setState({ ...state, rowsPerPage: parseInt(event.target.value, 10) });
    // setRowsPerPage(parseInt(event.target.value, 10));
    setState({ ...state, page: 0 });
    // setPage(0);
  };
  const handleChangeDense = (event) => {
    setState({ ...state, dense: event.target.checked });
    // setDense(event.target.checked);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = state.itemList.map((n) => n.id);
      setState({ ...state, selected: newSelecteds });
      // setSelected(newSelecteds);
      return;
    }
    setState({ ...state, selected: [] });
    // setSelected([]);
  };
  // const handleClick = (event, index) => {
  //   const selectedIndex = state.selected.indexOf(index);
  //   let newSelected = [];
  //   if (selectedIndex === - 1) {
  //     newSelected = newSelected.concat(state.selected, index);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(state.selected.slice(1));
  //   } else if (selectedIndex === state.selected.length - 1) {
  //     newSelected = newSelected.concat(state.selected.slice(0, - 1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       state.selected.slice(0, selectedIndex),
  //       state.selected.slice(selectedIndex + 1),
  //     );
  //   }
  //   setState({ ...state, selected: newSelected });
  //   // setSelected(newSelected);
  // };

  const handleActionChips = () => {
    switch (state.actions) {
    default: {
      break;
    }
    case 'gmail': {
      const gmail = (
        <Chip
          size='small'
          avatar={ <EmailIcon /> }
          label='Gmail'
          clickable={ true }
        />
      );
      setState({ ...state, actionChips: gmail });
      break;
    }
    case 'outlook': {
      const outlook = (
        <Chip
          size='small'
          avatar={ <EmailIcon /> }
          label='Outlook'
          clickable={ true }
        />
      );
      setState({ ...state, actionChips: outlook });
      break;
    }
    case 'research': {
      const research = (
        <Chip
          size='small'
          avatar={ <SearchIcon /> }
          label='Research'
          clickable={ true }
        />
      );
      setState({ ...state, actionChips: research });
      break;
    }
    case 'message': {
      const message = (
        <Chip
          size='small'
          avatar={ <SendIcon /> }
          label='Message'
          clickable={ true }
        />
      );
      setState({ ...state, actionChips: message });
      break;
    }
    case 'read': {
      const read = (
        <Chip
          size='small'
          avatar={ <BookIcon /> }
          label='Read'
          clickable={ true }
        />
      );
      setState({ ...state, actionChips: read });
      break;
    }
    case 'zoom': {
      const zoom = (
        <Chip
          size='small'
          avatar={ <VideoCallIcon /> }
          label='Zoom'
          clickable={ true }
        />
      );
      setState({ ...state, actionChips: zoom });
      break;
    }
    }
  };
  const handleKey = () => {
    const newKey = nanoid();
    setState({ ...state, key: newKey });
  };
  const handleId = () => {
    setState({ ...state, id: state.id + 1 });
  };
  const handleAdded = () => {
    setState({ ...state, added: todaysDate });
  };
  const handleHighPriority = () => {
    if (state.priority === 'High') {
      setState({ ...state, highPriority: ! state.highPriority });
    }
  };
  const handleIsRepeating = () => {
    if (state.repeat !== '') {
      setState({ ...state, isRepeating: ! state.isRepeating });
    }
  };
  const addTodoItem = () => {
    handleKey();
    handleId();
    handleAdded();
    handleHighPriority();
    handleIsRepeating();
    handleActionChips();
    const newTodoItem = [
      ...state.itemList,
      {
        key: state.key,
        id: state.id,
        title: state.title,
        priority: state.priority,
        highPriority: state.highPriority,
        repeat: state.repeat,
        isRepeating: state.isRepeating,
        added: state.added,
        dueDate: state.dueDate,
        dueTime: state.dueTime,
        notes: state.notes,
        actions: state.actions,
        stopwatchActive: state.stopwatchActive,
        reminders: state.reminders,
        actionChips: state.actionChips,
        checked: state.checked,
        expanded: false,
      },
    ];
    setState({ ...state, itemList: newTodoItem });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (! state.title) {
      // eslint-disable-next-line no-alert
      alert('Please enter a title');
      return;
    }
    setState(
      {
        ...state, title: '', priority: '', dueDate: '', dueTime: '', repeat: '', notes: '', actions: '', stopwatchActive: false, checked: '', reminders: '', showInput: false
      }
    );
  };
  const handleCancelInput = (event) => {
    event.preventDefault();
    setState(
      {
        ...state, title: '', priority: '', dueDate: '', dueTime: '', repeat: '', notes: '', actions: '', stopwatchActive: false, checked: '', reminders: '', showInput: false
      }
    );
  };
  // const handleRepeatPopulation = (event) => {
  //   event.preventDefault();
  // };
  // const isSelected = (index) => selected.indexOf(index) !== - 1;
  // const isItemSelected = isSelected(todoItem.index);
  const emptyRows = state.rowsPerPage - Math.min(state.rowsPerPage, state.itemList.length - state.page * state.rowsPerPage);
  return (
    <div className={ classes.fragContainer }>
      <Paper className={ classes.tableWrap }>
        <InputForm
          state={ state }
          todaysDate={ todaysDate }
          todaysTime={ todaysTime }
          addTodoItem={ addTodoItem }
          handleCancelInput={ handleCancelInput }
          handleSubmit={ handleSubmit }
          handleDueDate={ handleDueDate }
          handleDueTime={ handleDueTime }
          handleSwitch={ handleSwitch }
          handleValue={ handleValue }
          handleStopwatch={ handleStopwatch }
        />
        <EnhancedTableToolbar
          state={ state }
          numSelected={ state.selected.length }
          showInput={ state.showInput }
          handleShowInput={ handleShowInput }
        />
        <TableContainer>
          <Table
            className={ classes.table }
            aria-labelledby='tableTitle'
            size={ state.dense ? 'small' : 'medium' }
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={ classes }
              state={ state }
              order={ state.order }
              orderBy={ state.orderBy }
              numSelected={ state.selected.length }
              rowCount={ state.itemList.length }
              onSelectAllClick={ handleSelectAllClick }
              onRequestSort={ handleRequestSort }
            />
            <>
              {state.itemList.map((item, index) => (
                <TableBody
                  key={ item.key }
                  id={ item.id }
                  index={ index }
                  tabIndex={ - 1 }
                  className={ classes.itemRow }
                  // aria-checked={ isItemSelected }
                  // selected={ isItemSelected }
                >
                  <TableRow
                    className={ classes.border }
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        role='checkbox'
                        // onClick={ (event) => handleClick(event, item.id) }
                        // checked={ isItemSelected }
                      />
                    </TableCell>
                    <TableCell
                      style={ { textDecoration: item.isCompleted ? 'line-through' : '' } }
                      align='left'
                      component='th'
                      scope='row'
                      padding='none'
                    >
                      <Tooltip title={ `Title: ${item.title}` } aria-label='title' placement='bottom-start' TransitionComponent={ Fade }>
                        <div>
                          {item.title}
                        </div>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={ classes.itemDateCol } align='right' style={ { width: 64 } }>
                      <Tooltip title={ `Due:${item.dueDate} At:${item.dueTime}` } aria-label='todo time due status'>
                        <div>
                          {item.dueDate}
                        </div>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      className={ classes.itemPriorityCol }
                      style={ { color: item.highPriority ? '#B71C1C' : '' } }
                      align='right'
                    >
                      <Tooltip title={ `Priority: ${item.priority}` } aria-label='priority' placement='bottom'>
                        <div>
                          {item.priority}
                        </div>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={ classes.iconTrio } align='right' style={ { width: 64 } }>
                      <Tooltip title={ `Repeat: ${item.repeat}` } aria-label='todo repeat status'>
                        <IconButton
                          size='small'
                          aria-label='show set repeat'
                          style={ { color: item.isRepeating ? '#00C853' : '' } }
                        >
                          <LoopIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={ classes.iconTrio } align='right' style={ { width: 64 } }>
                      <Tooltip title='Activate Stopwatch' aria-label='todo stopwatch status'>
                        <IconButton
                          size='small'
                          aria-label='show set stopwatch'
                          onClick={ handleStopwatch }
                          style={ { color: item.stopwatchActive ? '#00C853' : '' } }
                        >
                          <AlarmIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align='right' style={ { width: 64 } }>
                      <IconButton
                        aria-label='show more'
                        aria-expanded={ state.expanded }
                        size='small'
                        onClick={ handleExpandClick }
                        className={ clsx(classes.expand, {
                          [classes.expandOpen]: state.expanded,
                        }) }
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow className={ classes.expandRow }>
                    <TableCell
                      style={
                        {
                          paddingTop: 0,
                          paddingRight: 8,
                          paddingBottom: 0,
                          paddingLeft: 24,
                        }
                      }
                      colSpan={ 16 }
                    >
                      <Collapse in={ state.expanded } timeout='auto' unmountOnExit>
                        <Box margin={ 1 }>
                          <Typography variant='h6' style={ { fontStyle: 'italic' } } gutterBottom>
                            Details
                          </Typography>
                          <Table size='small' aria-label='details'>
                            <TableHead>
                              <TableRow className={ classes.expandHeader }>
                                <TableCell align='left'>Notes</TableCell>
                                <TableCell align='right' className={ classes.remindCol }>Reminders</TableCell>
                                <TableCell align='right' className={ classes.expandIcon }>Actions</TableCell>
                                <TableCell align='right' className={ classes.expandIcon }>Info</TableCell>
                                <TableCell align='right' className={ classes.expandIcon }>Edit</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow className={ classes.expandRow }>
                                <TableCell align='left'>{item.notes}</TableCell>
                                <TableCell align='right'>{item.reminders}</TableCell>
                                <TableCell align='right'>{item.actionChips}</TableCell>
                                <TableCell align='right'>
                                  <IconButton
                                    aria-label='extra item info'
                                    size='small'
                                  >
                                    <InfoIcon />
                                  </IconButton>
                                </TableCell>
                                <TableCell align='right'>
                                  <IconButton
                                    aria-label='edit item'
                                    size='small'
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </>
            {emptyRows > 0 && (
              <TableBody>
                <TableRow style={ { height: (state.dense ? 33 : 53) * emptyRows } }>
                  <TableCell />
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ [10, 20, 50] }
          component='div'
          count={ state.itemList.length }
          rowsPerPage={ state.rowsPerPage }
          page={ state.page }
          onChangePage={ handleChangePage }
          onChangeRowsPerPage={ handleChangeRowsPerPage }
        />
      </Paper>
      <FormControlLabel
        control={ <Switch checked={ state.dense } onChange={ handleChangeDense } /> }
        label='Condense'
      />
      <Paper>{todaysDate}</Paper>
    </div>
  );
};
// {stableSort(itemList, getComparator(order, orderBy))
// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
export default WorkFlow;
