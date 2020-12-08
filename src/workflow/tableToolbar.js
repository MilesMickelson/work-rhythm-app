import React, {
  useState,
  useEffect,
  useRef,
  useReducer
} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

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
  showCloseIcon: {
    color: theme.palette.primary.light,
  },
  showAddIcon: {
    color: theme.palette.primary.dark,
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
  const { numSelected, handleShowInput, state } = props;
  const classes = useStyles();

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
          <IconButton
            aria-label='show input'
            aria-expanded={ state.showInput }
            onClick={ handleShowInput }
          >
            { state.showInput ? <Tooltip title='Cancel Item Input'><RemoveCircleIcon className={ classes.showCloseIcon } fontSize='large' /></Tooltip> : <Tooltip title='Add Todo Item'><AddCircleIcon className={ classes.showAddIcon } fontSize='large' /></Tooltip>}
          </IconButton>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
