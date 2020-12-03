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
import Grow from '@material-ui/core/Grow';
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
    flexDirection: 'row',
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
  timeAndDate: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: - theme.spacing(1),
    width: 212,
    minWidth: 120,
    maxWidth: 300,
  },
  switchGroup: {
    display: 'inline-flex',
  },
  buttonGroup: {
    display: 'inline-flex',
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
    reminders,
    handleReminders,
    handleSubmit,
    addTodoItem,
    handleCancelInput,
    showNotes,
    state,
    handleChange,
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
              // required={ true }
              value={ title || '' }
              onChange={ handleTitle }
            />
          </FormControl>
          <FormControl variant='filled' size='small' className={ classes.selectGroupB }>
            <InputLabel htmlFor='priority'>Priority</InputLabel>
            <Select
              native
              id='priority'
              value={ priority || '' }
              onChange={ handlePriority }
            >
              <option aria-label='none' value='' />
              <option value='High'>High</option>
              <option value='Medium'>Medium</option>
              <option value='Low'>Low</option>
            </Select>
          </FormControl>
          <FormControl variant='filled' size='small' className={ classes.selectGroupB }>
            <InputLabel htmlFor='repeat'>Repeat</InputLabel>
            <Select
              native
              value={ repeat || '' }
              onChange={ handleRepeat }
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
          <FormControl className={ classes.timeAndDate }>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
              <DatePicker
                label='Date Due'
                variant='dialog'
                inputVariant='filled'
                margin='normal'
                disablePast='true'
                value={ dueDate || '' }
                onChange={ handleDueDate }
                placeholder={ todaysDate }
                InputLabelProps={ { shrink: true } }
                native
                autoOk
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl className={ classes.timeAndDate }>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
              <TimePicker
                label='Time Due'
                variant='dialog'
                inputVariant='filled'
                margin='normal'
                views={ ['hours', 'minutes'] }
                format='HH:mm'
                placeholder='––:––'
                minutesStep={ 5 }
                native
                autoOk
                value={ dueTime || '' }
                onChange={ handleDueTime }
                InputLabelProps={ { shrink: true } }
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <Collapse in={ state.showActions } timeout='auto' collapsedHeight='0' unmountOnExit>
            <FormControl variant='filled' size='small' className={ classes.selectGroupB }>
              <InputLabel htmlFor='actions'>Actions</InputLabel>
              <Select
                native
                value={ actions || '' }
                onChange={ handleActions }
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
          </Collapse>
          <Collapse in={ state.showReminders } timeout='auto' collapsedHeight='0' unmountOnExit>
            <FormControl variant='filled' size='small' className={ classes.selectGroupB }>
              <InputLabel htmlFor='reminders'>Reminders</InputLabel>
              <Select
                native
                value={ reminders || '' }
                onChange={ handleReminders }
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
          </Collapse>
          <Collapse in={ state.showNotes } timeout='auto' collapsedHeight='0' unmountOnExit>
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
          </Collapse>
          <br />
          <FormGroup className={ classes.switchGroup }>
            <FormControlLabel
              control={ <Switch checked={ state.showNotes } onChange={ handleChange } /> }
              name='showNotes'
              label='Notes'
              labelPlacement='top'
            />
            <FormControlLabel
              control={ <Switch checked={ state.showActions } onChange={ handleChange } /> }
              name='showActions'
              label='Actions'
              labelPlacement='top'
            />
            <FormControlLabel
              control={ <Switch checked={ state.showReminders } onChange={ handleChange } /> }
              name='showReminders'
              label='Reminders'
              labelPlacement='top'
            />
          </FormGroup>
          <FormGroup className={ classes.buttonGroup }>
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
          </FormGroup>
        </div>
      </Collapse>
    </form>
  );
};

export default InputForm;
