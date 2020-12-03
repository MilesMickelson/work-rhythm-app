import React, { useState, useEffect } from 'react';
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

import Draggable from 'react-draggable';

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

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={ '[class*="MuiDialogContent-root"]' }>
      <Paper { ...props } />
    </Draggable>
  );
}

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
  const [id, setId] = useState(0);
  const [key, setKey] = useState('');
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [repeat, setRepeat] = useState('');
  const [timer, setTimer] = useState('');
  const [dueDate, setDueDate] = useState();
  const [dueTime, setDueTime] = useState();
  const [notes, setNotes] = useState('');
  const [actions, setActions] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [actionChips, setActionChips] = useState([]);
  const [added, setAdded] = useState('');
  const [checked, setChecked] = useState([]);
  const [isRepeating, setIsRepeating] = useState(false);
  const [highPriority, setHighPriority] = useState(false);
  const [activeTimer, setActiveTimer] = useState(false);
  const [editing, setEditing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [drag, setDrag] = React.useState(false);
  const [selected, setSelected] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [itemList, setItemList] = useState([
    {
      actions: 'Gmail',
      activeTimer: true,
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
      timer: '60:00',
      title: 'Hello this is my second todo item and it helps me test what I need to.',
    },
    {
      actions: 'Outlook',
      activeTimer: true,
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
      timer: '60:00',
      title: 'Hello this is my first todo item and it helps me test what I need to. It also does many other things, like telling me two lines here is should be max',
    },
  ]);

  useEffect(() => {
    setItemList(itemList);
  }, [itemList]);

  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE ID:', id);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE KEY:', key);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Title:', title);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Priority:', priority);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Repeat:', repeat);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Date Due:', dueDate);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Time Due:', dueTime);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Notes:', notes);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Timer:', timer);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Actions:', actions);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Reminders:', reminders);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Added:', added);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE Action Chips:', actionChips);
  // eslint-disable-next-line no-console
  console.log('WORKFLOW STATE itemList:', itemList);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleHighPriority = () => {
    if (priority === 'High') {
      setHighPriority(true);
    } else {
      setHighPriority(false);
    }
  };
  const handlePriority = (event) => {
    const notApp = 'N/A';
    const input = event.target.value;
    if (! priority) {
      setPriority(input);
    } else {
      setPriority(notApp);
    }
  };
  const handleIsRepeating = () => {
    if (! repeat) {
      setIsRepeating(false);
    } else {
      setIsRepeating(true);
    }
  };
  const handleRepeat = (event) => {
    const input = event.target.value;
    setRepeat(input);
  };
  const handleAdded = () => {
    setAdded(todaysDate);
  };
  const handleActiveTimer = () => {
    if (! timer) {
      setActiveTimer(false);
    } else {
      setActiveTimer(true);
    }
  };
  const handleDueDate = (date) => {
    const dateToString = date.toLocaleString();
    const newDueDate = dateToString.slice(0, 10);
    setDueDate(newDueDate);
  };
  // todo (date) => Fri Nov 27 2020 14:30:51 GMT-0500 (Eastern Standard Time)
  const handleDueTime = (date) => {
    const timeToString = date.toLocaleString();
    const newDueTime = timeToString.slice(11, 23);
    setDueTime(newDueTime);
  };
  const handleNotes = (event) => {
    setNotes(event.target.value);
  };
  const handleActions = (event) => {
    setActions(event.target.value);
  };
  const handleActionChips = () => {
    switch (actions) {
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
      setActionChips(gmail);
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
      setActionChips(outlook);
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
      setActionChips(research);
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
      setActionChips(message);
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
      setActionChips(read);
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
      setActionChips(zoom);
      break;
    }
    }
  };
  const handleTimer = (event) => {
    setTimer(event.target.value);
  };
  const handleChecked = (event) => {
    setChecked(event.target.value);
  };
  const handleReminders = (event) => {
    setReminders(event.target.value);
  };
  const handleEditing = () => {
    setEditing(! editing);
  };
  const handleCompleted = () => {
    setCompleted(! completed);
  };
  const handleExpandClick = () => {
    setExpanded(! expanded);
  };
  const handleShowInput = () => {
    setShowInput(! showInput);
  };
  const handleDrag = () => {
    setDrag(! drag);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = itemList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // const handleClick = (event, index) => {
  //   const selectedIndex = selected.indexOf(index);
  //   let newSelected = [];
  //   if (selectedIndex === - 1) {
  //     newSelected = newSelected.concat(selected, index);
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
  const handleSetKey = () => {
    const iKey = nanoid();
    setKey(iKey);
  };
  const handleSetId = () => {
    const iD = nanoid();
    setId(iD);
  };
  const addTodoItem = () => {
    handleSetKey();
    handleSetId();
    handleAdded();
    handleHighPriority();
    handleIsRepeating();
    handleActiveTimer();
    handleActionChips();
    const newTodoItem = [
      ...itemList,
      {
        key,
        id,
        title,
        priority,
        highPriority,
        repeat,
        isRepeating,
        added,
        dueDate,
        dueTime,
        notes,
        actions,
        timer,
        reminders,
        activeTimer,
        actionChips,
      }
    ];
    setItemList(newTodoItem);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodoItem(key, id, title, priority, dueDate, dueTime, repeat, notes, actions, timer, checked, reminders);
    setShowInput(! showInput);
    setTitle('');
    setNotes('');
    setPriority('');
    setRepeat('');
    setActions('');
    setTimer('');
    setReminders('');
    setDueDate('');
    setDueTime('');
    setAdded('');
    setHighPriority();
    setIsRepeating();
    setChecked();
    setActionChips([]);
  };

  const handleCancelInput = (event) => {
    event.preventDefault();
    setShowInput(! showInput);
    setTitle('');
    setNotes('');
    setPriority('');
    setRepeat('');
    setActions('');
    setTimer('');
    setReminders('');
    setDueDate('');
    setDueTime('');
    setAdded('');
    setHighPriority();
    setIsRepeating();
    setChecked();
    setActionChips([]);
  };

  // const handleRepeatPopulation = (event) => {
  //   event.preventDefault();
  // };
  // const isSelected = (index) => selected.indexOf(index) !== - 1;
  // const isItemSelected = isSelected(todoItem.index);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, itemList.length - page * rowsPerPage);
  return (
    <div className={ classes.fragContainer }>
      <Paper className={ classes.tableWrap }>
        <InputForm
          todaysTime={ todaysTime }
          todaysDate={ todaysDate }
          showInput={ showInput }
          title={ title }
          priority={ priority }
          repeat={ repeat }
          dueDate={ dueDate }
          dueTime={ dueTime }
          notes={ notes }
          actions={ actions }
          timer={ timer }
          reminders={ reminders }
          editing={ editing }
          completed={ completed }
          checked={ checked }
          handleCancelInput={ handleCancelInput }
          handleSubmit={ handleSubmit }
          addTodoItem={ addTodoItem }
          handleTitle={ handleTitle }
          handlePriority={ handlePriority }
          handleRepeat={ handleRepeat }
          handleDueDate={ handleDueDate }
          handleDueTime={ handleDueTime }
          handleNotes={ handleNotes }
          handleActions={ handleActions }
          handleTimer={ handleTimer }
          handleReminders={ handleReminders }
          handleEditing={ handleEditing }
          handleCompleted={ handleCompleted }
          handleChecked={ handleChecked }
        />
        <EnhancedTableToolbar
          numSelected={ selected.length }
          showInput={ showInput }
          handleShowInput={ handleShowInput }
        />
        <TableContainer>
          <Table
            className={ classes.table }
            aria-labelledby='tableTitle'
            size={ dense ? 'small' : 'medium' }
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={ classes }
              order={ order }
              orderBy={ orderBy }
              onSelectAllClick={ handleSelectAllClick }
              onRequestSort={ handleRequestSort }
              numSelected={ selected.length }
              rowCount={ itemList.length }
            />
            <>
              {itemList.map((todoItem, index) => (
                <TableBody
                  key={ key }
                  id={ id }
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
                        // onClick={ (event) => handleClick(event, todoItem.id) }
                        // checked={ isItemSelected }
                      />
                    </TableCell>
                    <TableCell
                      style={ { textDecoration: todoItem.isCompleted ? 'line-through' : '' } }
                      align='left'
                      component='th'
                      scope='row'
                      padding='none'
                    >
                      <Tooltip title={ `Title: ${todoItem.title}` } aria-label='title' placement='bottom-start' TransitionComponent={ Fade }>
                        <div>
                          {todoItem.title}
                        </div>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={ classes.itemDateCol } align='right' style={ { width: 64 } }>
                      <Tooltip title={ `Due: ${todoItem.dueDate} At:${todoItem.dueTime}` } aria-label='todo time due status'>
                        <div>
                          {todoItem.dueDate}
                        </div>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      className={ classes.itemPriorityCol }
                      style={ { color: todoItem.highPriority ? '#B71C1C' : '' } }
                      align='right'
                    >
                      <Tooltip title={ `Priority: ${todoItem.priority}` } aria-label='priority'>
                        <div>
                          {todoItem.priority}
                        </div>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={ classes.iconTrio } align='right' style={ { width: 64 } }>
                      <Tooltip title={ `Repeat: ${todoItem.repeat}` } aria-label='todo repeat status'>
                        <IconButton
                          size='small'
                          aria-label='show set repeat'
                          style={ { color: todoItem.isRepeating ? '#00C853' : '' } }
                          // aria-expanded={ drag }
                          // onClick={ handleDrag }
                        >
                          <LoopIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={ classes.iconTrio } align='right' style={ { width: 64 } }>
                      <Tooltip title={ `Timer: ${todoItem.timer}` } aria-label='todo timer status'>
                        <IconButton
                          size='small'
                          aria-label='show set timer'
                          aria-expanded={ drag }
                          onClick={ handleDrag }
                          style={ { color: todoItem.activeTimer ? '#00C853' : '' } }
                        >
                          <AlarmIcon />
                        </IconButton>
                      </Tooltip>
                      <Dialog
                        open={ drag }
                        onClose={ handleDrag }
                        PaperComponent={ PaperComponent }
                        aria-labelledby='draggable-dialog-title'
                      >
                        <DialogTitle style={ { cursor: 'move' } } id='draggable-dialog-title'>
                          Task Timer
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            To start a timer please upon adding task please enter your inputs and info here.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button autoFocus onClick={ handleDrag } color='primary'>
                            Save
                          </Button>
                          <Button onClick={ handleDrag } color='primary'>
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                    <TableCell align='right' style={ { width: 64 } }>
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
                      <Collapse in={ expanded } timeout='auto' unmountOnExit>
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
                                <TableCell align='left'>{todoItem.notes}</TableCell>
                                <TableCell align='right'>{todoItem.reminders}</TableCell>
                                <TableCell align='right'>{todoItem.actionChips}</TableCell>
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
                <TableRow style={ { height: (dense ? 33 : 53) * emptyRows } }>
                  <TableCell />
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ [10, 20, 50] }
          component='div'
          count={ itemList.length }
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
      <Paper>{todaysDate}</Paper>
    </div>
  );
};
// {stableSort(itemList, getComparator(order, orderBy))
// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
export default WorkFlow;
