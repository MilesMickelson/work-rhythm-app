import React from 'react';
import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';

import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Collapse from '@material-ui/core/Collapse';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

// const names = [
//   'Everyday at 9am',
//   '1 hour before',
//   '3 hours before',
//   '12 hours before',
//   '1 day before',
//   '3 days before',
//   '1 week before',
//   '1 month before',
//   '3 months before',
// ];

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

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
  inputGroupA: {
    margin: theme.spacing(1),
  },
  selectGroupB: {
    margin: theme.spacing(1),
    marginTop: 6,
    width: 212,
    minWidth: 120,
    maxWidth: 300,
  },
  button: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

const InputForm = (props) => {
  const {
    todaysTime,
    todaysDate,
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
    handleCancelInput,
  } = props;
  const classes = useStyles();
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
          <FormControl className={ classes.inputGroupA }>
            <CssTextField
              label='Title'
              variant='filled'
              margin='dense'
              multiline={ true }
              required={ true }
              value={ title || '' }
              onChange={ handleTitle }
            />
          </FormControl>
          <FormControl className={ classes.inputGroupA }>
            <CssTextField
              label='Notes'
              margin='dense'
              variant='filled'
              multiline={ true }
              value={ notes || '' }
              onChange={ handleNotes }
            />
          </FormControl>
          <FormControl variant='filled' size='small' className={ classes.selectGroupB }>
            <InputLabel htmlFor='priority'>Priority</InputLabel>
            <Select
              native={ true }
              value={ priority || '' }
              onChange={ handlePriority }
            >
              <option aria-label='none' value={ null } />
              <option value={ 3 }>High</option>
              <option value={ 2 }>Medium</option>
              <option value={ 1 }>Low</option>
            </Select>
          </FormControl>
          <FormControl variant='filled' size='small' className={ classes.selectGroupB }>
            <InputLabel htmlFor='repeat'>Repeat</InputLabel>
            <Select
              native={ true }
              value={ repeat || '' }
              onChange={ handleRepeat }
            >
              <option aria-label='none' value='' />
              <option value={ 15 }>Everyday</option>
              <option value={ 14 }>Every 2 days</option>
              <option value={ 13 }>Every 3 days</option>
              <option value={ 12 }>Every 4 days</option>
              <option value={ 11 }>Every 5 days</option>
              <option value={ 10 }>Mon-Fri</option>
              <option value={ 9 }>Weekends</option>
              <option value={ 8 }>Weekly</option>
              <option value={ 7 }>Bi-Weekly</option>
              <option value={ 6 }>Tri-Weekly</option>
              <option value={ 5 }>Monthly</option>
              <option value={ 4 }>Bi-Monthly</option>
              <option value={ 3 }>Tri-Monthly</option>
              <option value={ 2 }>Bi-Annually</option>
              <option value={ 1 }>Annually</option>
            </Select>
          </FormControl>
          <FormControl variant='filled' size='small' className={ classes.selectGroupB }>
            <InputLabel htmlFor='actions'>Actions</InputLabel>
            <Select
              native={ true }
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
          <FormControl variant='filled' size='small' className={ classes.selectGroupB }>
            <InputLabel htmlFor='invite'>Invites</InputLabel>
            <Select
              native={ true }
              value={ invites || '' }
              onChange={ handleInvites }
            >
              <option aria-label='None' value='' />
              <option value={ 1 }>Brad Pitt</option>
              <option value={ 2 }>Ryan Reynolds</option>
              <option value={ 3 }>Ryan Gosling</option>
              <option value={ 4 }>Robert Downey</option>
            </Select>
          </FormControl>
          <FormControl className={ classes.selectGroupB }>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
              <DatePicker
                label='Date Due'
                variant='dialog'
                inputVariant='filled'
                margin='normal'
                autoOk='true'
                disablePast='true'
                value={ dueDate || '' }
                onChange={ handleDueDate }
                placeholder={ todaysDate }
                InputLabelProps={ { shrink: true } }
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl className={ classes.selectGroupB }>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
              <TimePicker
                label='Set Time'
                variant='dialog'
                inputVariant='filled'
                margin='normal'
                views={ ['hours', 'minutes'] }
                format='HH:mm'
                placeholder='––:––'
                minutesStep={ 5 }
                native={ true }
                autoOk={ true }
                value={ dueTime || '' }
                onChange={ handleDueTime }
                InputLabelProps={ { shrink: true } }
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl size='small' className={ classes.selectGroupB }>
            <InputLabel htmlFor='reminder'>Reminders</InputLabel>
            <Select
              size='small'
              native
              multiple
              value={ reminders }
              onChange={ handleReminders }
              // input={ <Input /> }
              // renderValue={ (selected) => selected.join(', ') }
            >
              <option aria-label='None' value='' />
              <option value={ 1 }>
                <Checkbox />
                1 hour before
              </option>
            </Select>
          </FormControl>
          <Button
            type='submit'
            variant='contained'
            color='primary'
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
