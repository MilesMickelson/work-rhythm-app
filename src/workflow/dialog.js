import React from 'react';

import Calendar from 'react-calendar';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import useOpenDialog from '../hooks/useOpenDialog';

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
  const {
    children, classes, onClose,
  } = props;
  // const [value, setValue] = useInput('');
  return (
    <MuiDialogTitle disableTypography className={ classes.root }>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='close' className={ classes.closeButton } onClick={ onClose }>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const CalDialog = (props) => {
  const { open, handleOpenDialog } = props;
  return (
    <Dialog
      onClose={ handleOpenDialog }
      aria-labelledby='dueDate-dialog-title'
      open={ open }
    >
      <DialogTitle id='dueDate-dialog-title' onClose={ handleOpenDialog }>
        Due Date
      </DialogTitle>
      <DialogContent dividers>
        <Calendar
          id='dueDate-dialog'
          // onChange={ handleDate }
          // value={ date }
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={ handleOpenDialog }>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalDialog;
