import React, { useState } from 'react';

import Calendar from 'react-calendar';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import useOpenDialog from '../hooks/useOpenDialog';
import useInputState from '../hooks/useInputState';
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
  margin: {
    margin: theme.spacing(1),
  },
  topMargin: {
    marginTop: 16,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const InputForm = (saveTodoItem) => {
  const classes = useStyles();
  const { handleOpenDialog } = useOpenDialog([]);
  const { value, reset, onChange } = useInputState(title);
  // const { value: title, bind: bindtitle, reset: resettitle } = useInput('');
  // const [itemList, setItemList] = useState([
  //   {
  //     title: 'This is my first todo item',
  //     priority: 'High',
  //     recur: 'Bi-weekly',
  //     due: '11-15-2021',
  //     notes: 'these are some notes for my first todo item',
  //     actions: 'email',
  //     invites: 'Brad Pitt',
  //     reminders: '1 day before',
  //     added: '11-16-2020',
  //   },
  //   {
  //     title: 'This is my second todo item',
  //     priority: 'Medium',
  //     recur: 'Weekly',
  //     due: '11-16-2021',
  //     notes: 'these are some notes for my second todo item',
  //     actions: 'message',
  //     invites: 'Ryan Reynolds',
  //     reminders: '3 days before',
  //     added: '11-16-2020',
  //   },
  //   {
  //     title: 'This is my third todo item',
  //     priority: 'Low',
  //     recur: 'Everyday',
  //     due: '11-18-2021',
  //     notes: 'these are some notes for my third todo item',
  //     actions: 'email',
  //     invites: 'Brad Pitt',
  //     reminders: '3 days before',
  //     added: '11-16-2020',
  //   },
  // ]);
  // const [title, setTitle] = useState('');
  // const [priority, setPriority] = useState(0);
  // const [recur, setRecur] = useState('');
  // const [due, setDue] = useState(new Date());
  // const [notes, setNotes] = useState('');
  // const [actions, setActions] = useState('');
  // const [invites, setInvites] = useState('');
  // const [reminders, setReminders] = useState('');
  // const [editing, setEditing] = useState(false);
  // const { showInput, useHandleShowInput } = useShowInput(false);
  // const handleTitle = (event) => {
  //   setTitle(event.target.value);
  // };
  // const handlePriority = (event) => {
  //   setPriority(event.target.value);
  // };
  // const handleRecur = (event) => {
  //   setRecur(event.target.value);
  // };
  // const handleDue = (event) => {
  //   setDue(event.target.value);
  // };
  // const handleNotes = (event) => {
  //   setNotes(event.target.value);
  // };
  // const handleActions = (event) => {
  //   setActions(event.target.value);
  // };
  // const handleInvites = (event) => {
  //   setInvites(event.target.value);
  // };
  // const handleReminders = (event) => {
  //   setReminders(event.target.value);
  // };
  // const handleEditing = () => {
  //   setEditing(! editing);
  // };
  // const handleCompleted = () => {
  //   setCompleted(! completed);
  // };
  // const addTodoItem = (title, priority, recur, due, notes, actions, invites, reminders) => {
  //   const newTodoItems = [
  //     ...itemList,
  //     {
  // title,
  // priority,
  // recur,
  // due,
  // notes,
  // actions,
  // invites,
  // reminders
  //     }
  //   ];
  //   setItemList(newTodoItems);
  // };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (! title) return;
  //   addTodoItem(title, priority, recur, due, notes, actions, invites, reminders);
  //   setValue('');
  //   // reset();
  // };
  // console.log('inputForm State for Title:', title);
  // console.log('inputForm State for Priority:', priority);
  return (
    <form
      onSubmit={
        (event) => {
          event.preventDefault();
          saveTodoItem(value);
          reset();
        }
      }
    >
      {/* <Collapse
        aria-label='show more'
        aria-expanded={ showInput }
        in={ showInput }
        onChange={ useHandleShowInput }
        timeout='auto'
        unmountOnExit
      > */}
      <div className={ classes.inputWrap }>
        <FormControl className={ classes.margin }>
          <CssTextField
            multiline
            margin='dense'
            variant='filled'
            value={ value }
            onChange={ onChange }
            // onKeyPress={ props.onInputKeyPress }
            // reset={ () => setValue='' }
            label='Title'
          />
        </FormControl>
        <FormControl variant='filled' size='small' className={ classes.topMargin }>
          <InputLabel htmlFor='priority'>Priority</InputLabel>
          <Select
            native
            value={ value }
            onChange={ onChange }
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
            value={ value }
            onChange={ onChange }
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
            value={ value }
            onChange={ onChange }
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
            id='notes'
            value={ value }
            onChange={ onChange }
          />
        </FormControl>
        <FormControl variant='filled' size='small' className={ classes.topMargin }>
          <InputLabel htmlFor='actions'>Actions</InputLabel>
          <Select
            native
            value={ value }
            onChange={ onChange }
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
            value={ value }
            onChange={ onChange }
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
            value={ value }
            onChange={ onChange }
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
          aria-label='save input'
          className={ classes.button }
          startIcon={ <SaveAltIcon /> }
          // onClick={ () => { handleAddTodoItem(); handleShowInputClick(); } }
          // onClick={ useHandleShowInput }
        >
          Save
        </Button>
        <Button
          variant='contained'
          color='primary'
          size='large'
          aria-label='cancel input'
          className={ classes.button }
          startIcon={ <CloseIcon /> }
          // onClick={ useHandleShowInput }
        >
          Cancel
        </Button>
      </div>
      {/* </Collapse> */}
    </form>
  );
};

export default InputForm;
