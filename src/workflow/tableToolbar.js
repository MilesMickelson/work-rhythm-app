import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';
import Calendar from 'react-calendar';

import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import useInputState from '../hooks/useInputState';
import useTodoState from '../hooks/useTodoState';
import useOpenDialog from '../hooks/useOpenDialog';
import CalDialog from './dialog';

// let newTodoItem = {
//   'key': key,
//   'title': title,
//   'priority': priority,
//   'recurring': recurring,
//   'timer': timer,
//   'due': due,
//   'details': details,
//   'invites': invites,
//   'actions': actions,
//   'reminders': reminders,
// }

// ! Old Mock Data+Creation //
// function createData(key, id, title, priority, recur, timer, due) {
//   return {
//     key,
//     id,
//     title,
//     priority,
//     recur,
//     timer,
//     due,
//     details: [
//       {
//         notes: '', added: '', actions: '', invites: ''
//       },
//     ],
//   };
// }

// createData(1, 7, 'Title of my todo', 1, 'Everyday', 20, '1-1-2021', 'these are my details for id 1', '11-1-20', 'Email', '3'),
// const todoItems = [];

// ! TextField Input Component //
const CssTextField = withStyles(() => ({
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

const EnhancedTableToolbar = (props, todoItems, addTodoItem, saveTodoItem) => {
  const { numSelected } = props;
  const classes = useStyles();
  const { value, reset, onChange } = useInputState();
  const { handleOpenDialog } = useOpenDialog();
  // const { todoItems, addTodoItem } = useTodoState([]);
  const [priority, setPriority] = React.useState(0);
  const [recur, setRecur] = React.useState('');
  const [due, setDue] = React.useState(new Date());
  const [notes, setNotes] = React.useState('');
  const [actions, setActions] = React.useState('');
  const [invites, setInvites] = React.useState('');
  const [reminders, setReminders] = React.useState('');
  const [editing, setEditing] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [showInput, setShowInput] = React.useState(false);
  // const [todoItems, setTodoItems] = React.useState([
  //   { text: 'Write more code!' },
  //   { text: 'Write even more code!' },
  //   { text: 'Write the most code!' }
  // ]);
  // console.log('EnhancedTableToolbarNameState ->', title);
  console.log('Toolbar todoItems state:', todoItems);
  // const handleTitle = (event) => {
  //   setTitle(event.target.value);
  // };
  const handlePriority = (event) => {
    setPriority(event.target.value);
  };
  const handleRecur = (event) => {
    setRecur(event.target.value);
  };
  const handleDue = (event) => {
    setDue(event.target.value);
  };
  const handleNotes = (event) => {
    setNotes(event.target.value);
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
  const handleShowInputClick = () => {
    setShowInput(! showInput);
  };
  const handleEditing = () => {
    setEditing(! editing);
  };
  const handleCompleted = () => {
    setCompleted(! completed);
  };
  // const handleAddTodoItem = () => {
  //   const checkRequired = document.getElementById('title' + key).value;
  //   if (checkRequired.trim() === '');
  //   return (null);
  // };
  // let todoItem = (title, priority, recur, due, notes, actions, invites, reminders);
  // const addTodoItem = () => {
  //   const id = nanoid();
  //   const newTodoItem = [...todoItems, {
  //     id,
  //     title,
  //     priority,
  //     recur,
  //     due,
  //     notes,
  //     actions,
  //     invites,
  //     reminders,
  //   }];
  //   setTodoItems(newTodoItem);
  //   console.log('New todoItem:', newTodoItem);
  // };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (! value) return;
  //   addTodoItem(value);
  //   setValue('');
  // };
  return (
    <>
      <form
        // onSubmit={ handleSubmit }
        onSubmit={ (event) => {
          event.preventDefault();
          saveTodoItem(value);
          reset();
        } }
      >
        <Collapse
          aria-label='show more'
          aria-expanded={ showInput }
          in={ showInput }
          timeout='auto'
          unmountOnExit
        >
          <div className={ classes.inputWrap }>
            <FormControl className={ classes.margin }>
              <CssTextField
                multiline
                margin='dense'
                variant='filled'
                value={ value }
                onChange={ onChange }
                label='Title'
                id='title'
                // reset={ () => setValue='' }
              />
            </FormControl>
            <FormControl variant='filled' size='small' className={ classes.topMargin }>
              <InputLabel htmlFor='priority'>Priority</InputLabel>
              <Select
                native
                onChange={ handlePriority }
                value={ priority }
                id='priority'
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
                id='recur'
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
                onClick={ handleOpenDialog }
                onChange={ handleDue }
                value={ due }
                id='due'
              >
                <CalDialog />
              </Select>
            </FormControl>
            <FormControl className={ classes.margin }>
              <CssTextField
                multiline
                margin='dense'
                variant='filled'
                label='Notes'
                value={ notes }
                id='notes'
                onChange={ handleNotes }
              />
            </FormControl>
            <FormControl variant='filled' size='small' className={ classes.topMargin }>
              <InputLabel htmlFor='actions'>Actions</InputLabel>
              <Select
                native
                onChange={ handleActions }
                value={ actions }
                id='actions'
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
              <InputLabel htmlFor='invite'>Invites</InputLabel>
              <Select
                native
                onChange={ handleInvites }
                value={ invites }
                id='invites'
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
                id='reminders'
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
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              aria-label='show input'
              aria-expanded={ showInput }
              className={ classes.button }
              startIcon={ <SaveAltIcon /> }
              // onClick={ () => { handleAddTodoItem(); handleShowInputClick(); } }
              onClick={ handleShowInputClick }
            >
              Save
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='large'
              aria-label='show input'
              aria-expanded={ showInput }
              className={ classes.button }
              startIcon={ <CloseIcon /> }
              onClick={ handleShowInputClick }
            >
              Cancel
            </Button>
          </div>
        </Collapse>
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
              <IconButton
                aria-label='show input'
                aria-expanded={ showInput }
                onClick={ handleShowInputClick }
              >
                { showInput ? <Tooltip title='Cancel Item Input'><RemoveCircleIcon className={ classes.closeTodo } fontSize='large' /></Tooltip> : <Tooltip title='Add Todo Item'><AddCircleIcon className={ classes.addTodo } fontSize='large' /></Tooltip>}
              </IconButton>
            </>
          )}
        </Toolbar>
      </form>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
