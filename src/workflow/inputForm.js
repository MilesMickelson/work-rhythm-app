import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

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
    borderBottom: '2px solid #005269',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
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

const InputForm = (props) => {
  const {
    showInput,
    title,
    handleTitle,
    priority,
    handlePriority,
    dueDate,
    handleDueDate,
    dueTime,
    handleDueTime,
    repeat,
    handleRepeat,
    notes,
    handleNotes,
    actions,
    handleActions,
    invites,
    handleInvites,
    reminders,
    handleReminders,
    handleSubmit,
    addTodoItem,
    handleCancelInput
  } = props;
  const classes = useStyles();
  const today = new Date().toLocaleString().replace(',', '');
  return (
    <form
      onSubmit={ handleSubmit }
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
              label='Title'
              value={ title || '' }
              onChange={ handleTitle }
            />
          </FormControl>
          <FormControl className={ classes.margin }>
            <CssTextField
              multiline
              margin='dense'
              variant='filled'
              label='Notes'
              value={ notes || '' }
              onChange={ handleNotes }
            />
          </FormControl>
          <FormControl variant='filled' size='small' className={ classes.topMargin }>
            <InputLabel htmlFor='priority'>Priority</InputLabel>
            <Select
              native
              value={ priority || '' }
              onChange={ handlePriority }
            >
              <option aria-label='none' value='' />
              <option value={ 1 }>Low</option>
              <option value={ 2 }>Medium</option>
              <option value={ 3 }>High</option>
              <option value={ 4 }>Very high</option>
            </Select>
          </FormControl>
          <FormControl variant='filled' size='small' className={ classes.topMargin }>
            <InputLabel htmlFor='repeat'>Repeat</InputLabel>
            <Select
              native
              value={ repeat || '' }
              onChange={ handleRepeat }
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
            <InputLabel htmlFor='reminder'>Reminders</InputLabel>
            <Select
              native
              value={ reminders || '' }
              onChange={ handleReminders }
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
          <FormControl variant='filled' size='small' className={ classes.topMargin }>
            <InputLabel htmlFor='actions'>Actions</InputLabel>
            <Select
              native
              value={ actions || '' }
              onChange={ handleActions }
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
              value={ invites || '' }
              onChange={ handleInvites }
            >
              <option aria-label='None' value='' />
              <option value={ 1 }>Brad Pitt</option>
              <option value={ 2 }>Ryan Reynolds</option>
              <option value={ 3 }>Ryan Gosling</option>
              <option value={ 4 }>Robert Downey Jr.</option>
            </Select>
          </FormControl>
          <FormControl className={ classes.topMargin }>
            <TextField
              type='date'
              label='Due Date'
              size='small'
              variant='filled'
              value={ dueDate || '' }
              onChange={ handleDueDate }
              className={ classes.textField }
              InputLabelProps={ { shrink: true } }
            />
          </FormControl>
          <FormControl className={ classes.topMargin }>
            <TextField
              type='time'
              label='Time of Event(opt.)'
              size='small'
              variant='filled'
              value={ dueTime || '' }
              onChange={ handleDueTime }
              className={ classes.textField }
              InputLabelProps={ { shrink: true } }
              // inputProps={ { step: 300 } }
            />
          </FormControl>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            aria-label='save input'
            className={ classes.button }
            startIcon={ <SaveAltIcon /> }
            onClick={ addTodoItem }
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
            onClick={ handleCancelInput }
          >
            Cancel
          </Button>
        </div>
      </Collapse>
    </form>
  );
};

export default InputForm;
