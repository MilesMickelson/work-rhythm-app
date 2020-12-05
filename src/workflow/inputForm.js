import React from 'react';
import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';

import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const CssTextField = withStyles(() => ({
  root: {
    '& label.Select': {
      color: '#262626',
    },
    '& .MuiFilledInput-root': {
      width: 440,
      height: 56,
      borderRadius: 5,
      fontSize: 18,
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
    flexDirection: 'row',
  },
  title: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  dateAndTime: {
    marginLeft: theme.spacing(2.5),
    width: 220,
    minWidth: 120,
    maxWidth: 300,
  },
  inputGroup2: {
    marginTop: - theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: 212,
    height: 56,
    minWidth: 120,
    maxWidth: 300,
  },
  notes: {
    marginLeft: theme.spacing(2),
  },
  addGroup2: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    height: 56,
    width: 220,
    minWidth: 120,
    maxWidth: 300,
  },
  buttonWrap: {
    display: 'inline',
  },
  addtSwitch: {
    marginTop: - theme.spacing(1),
    marginLeft: theme.spacing(3),
    display: 'inline',
    width: 220,
    minWidth: 120,
    maxWidth: 300,
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 18,
    width: 212,
    height: 50,
    minWidth: 120,
    maxWidth: 300,
  },
}));

const InputForm = (props) => {
  const {
    state,
    handleSwitch,
    handleValue,
    todaysDate,
    handleSubmit,
    addTodoItem,
    handleCancelInput,
    handleDueDate,
    handleDueTime,
  } = props;
  const classes = useStyles();
  return (
    <form
      onSubmit={ handleSubmit }
    >
      <Collapse
        aria-label='show more'
        aria-expanded={ state.showInput }
        in={ state.showInput }
        timeout='auto'
        unmountOnExit
      >
        <div className={ classes.inputWrap }>
          <FormControl>
            <CssTextField
              className={ classes.title }
              label='Title'
              name='title'
              variant='filled'
              margin='dense'
              value={ state.title }
              onChange={ handleValue }
              multiline
            />
          </FormControl>
          <FormControl className={ classes.dateAndTime }>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
              <DatePicker
                label='Due Date'
                name='dueDate'
                variant='dialog'
                inputVariant='filled'
                margin='normal'
                disablePast='true'
                value={ state.dueDate || '' }
                onChange={ handleDueDate }
                placeholder={ todaysDate }
                InputLabelProps={ { shrink: true } }
                native
                autoOk
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl className={ classes.dateAndTime }>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
              <TimePicker
                label='Due Time'
                name='dueTime'
                variant='dialog'
                inputVariant='filled'
                margin='normal'
                views={ ['hours', 'minutes'] }
                format='HH:mm'
                placeholder='––:––'
                minutesStep={ 5 }
                value={ state.dueTime || '' }
                onChange={ handleDueTime }
                InputLabelProps={ { shrink: true } }
                native
                autoOk
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl variant='filled' size='small' className={ classes.inputGroup2 }>
            <InputLabel htmlFor='repeat'>Repeat</InputLabel>
            <Select
              name='repeat'
              value={ state.repeat || '' }
              onChange={ handleValue }
              native
            >
              <option aria-label='none' value='' />
              <option value='Everyday'>Everyday</option>
              <option value='Weekdays'>Weekdays</option>
              <option value='Weekends'>Weekends</option>
              <option value='Weekly'>Weekly</option>
              <option value='Bi-Weekly'>Bi-Weekly</option>
              <option value='Monthly'>Monthly</option>
              <option value='Tri-Monthly'>Tri-Monthly</option>
              <option value='Bi-Annually'>Bi-Annually</option>
              <option value='Annually'>Annually</option>
            </Select>
          </FormControl>
          <FormControl variant='filled' size='small' className={ classes.inputGroup2 }>
            <InputLabel htmlFor='reminders'>Reminders</InputLabel>
            <Select
              name='reminders'
              value={ state.reminders || '' }
              onChange={ handleValue }
              native
            >
              <option aria-label='None' value='' />
              <option value='event time due'>Event time due</option>
              <option value='5 minutes before'>5 minutes before</option>
              <option value='10 minutes before'>10 minutes before</option>
              <option value='15 minutes before'>15 minutes before</option>
              <option value='20 minutes before'>20 minutes before</option>
              <option value='30 minutes before'>30 minutes before</option>
              <option value='1 hour before'>1 hour before</option>
              <option value='2 hours before'>2 hours before</option>
              <option value='1 hour before'>1 day before</option>
              <option value='2 days before'>2 days before</option>
              <option value='1 week before'>1 week before</option>
              <option value='2 weeks before'>2 weeks before</option>
              <option value='1 month before'>1 month before</option>
              <option value='2 months before'>2 months before</option>
              <option value='custom'>Custom</option>
            </Select>
          </FormControl>
          <Collapse in={ state.showAdditional } timeout='auto' collapsedHeight='0' unmountOnExit>
            <FormControl variant='filled' size='small' className={ classes.addGroup2 }>
              <InputLabel htmlFor='priority'>Priority</InputLabel>
              <Select
                name='priority'
                value={ state.priority || '' }
                onChange={ handleValue }
                native
              >
                <option aria-label='none' value='' />
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
              </Select>
            </FormControl>
            <FormControl variant='filled' size='small' className={ classes.addGroup2 }>
              <InputLabel htmlFor='actions'>Actions</InputLabel>
              <Select
                name='actions'
                value={ state.actions || '' }
                onChange={ handleValue }
                native
              >
                <option aria-label='None' value='' />
                <option value='zoom'>Zoom</option>
                <option value='gmail'>Gmail</option>
                <option value='outlook'>Outlook</option>
                <option value='message'>Message</option>
                <option value='read'>Read</option>
                <option value='research'>Research</option>
              </Select>
            </FormControl>
            <FormControl className={ classes.notes }>
              <CssTextField
                label='Notes'
                name='notes'
                margin='dense'
                variant='filled'
                multiline={ true }
                value={ state.notes || '' }
                onChange={ handleValue }
              />
            </FormControl>
            <FormControl className={ classes.addtSwitch }>
              <FormControlLabel
                label='Activate stopwatch'
                labelPlacement='end'
                name='stopwatchActive'
                control={ <Switch checked={ ! state.stopwatchActive } onChange={ handleValue } /> }
              />
            </FormControl>
          </Collapse>
          <br />
          <FormGroup className={ classes.buttonWrap }>
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
              type='submit'
              variant='contained'
              color='primary'
              aria-label='cancel input'
              className={ classes.button }
              startIcon={ <CloseIcon /> }
              onClick={ handleCancelInput }
            >
              Cancel
            </Button>
            <FormControl className={ classes.addtSwitch }>
              <FormControlLabel
                control={ <Switch checked={ state.showAdditional } onChange={ handleSwitch } /> }
                name='showAdditional'
                label='Additional'
                labelPlacement='end'
              />
            </FormControl>
          </FormGroup>
        </div>
      </Collapse>
    </form>
  );
};

export default InputForm;
