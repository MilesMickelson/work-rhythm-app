import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

const headCells = [
  {
    id: 'title',
    numeric: false,
    isAnIcon: false,
    disablePadding: true,
    label: 'Title'
  },
  {
    id: 'due',
    numeric: true,
    isAnIcon: false,
    disablePadding: true,
    label: 'Due'
  },
  {
    id: 'priority',
    numeric: true,
    isAnIcon: false,
    disablePadding: true,
    label: 'Priority'
  },
  {
    id: 'repeat',
    numeric: true,
    isAnIcon: true,
    disablePadding: true,
    label: 'Repeat'
  },
  {
    id: 'timer',
    numeric: true,
    isAnIcon: true,
    disablePadding: true,
    label: 'Timer'
  },
  {
    id: 'expand',
    numeric: true,
    isAnIcon: true,
    disablePadding: false,
    label: 'Expand'
  },
];

const useStyles = makeStyles(() => ({
  fragContainer: {
    height: '100%',
    width: '100%',
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
  tableHeaderRow: {
    borderBottom: '2px solid #005269',
  },
}));

const EnhancedTableHead = (props) => {
  const classes = useStyles();
  const {
    onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={ classes.tableHeaderRow }>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={ numSelected > 0 && numSelected < rowCount }
            checked={ rowCount > 0 && numSelected === rowCount }
            onChange={ onSelectAllClick }
            inputProps={ { 'aria-label': 'select all desserts' } }
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={ headCell.id }
            align={ headCell.numeric ? 'right' : 'left' }
            padding={ headCell.disablePadding ? 'none' : 'default' }
            width={ headCell.isAnIcon ? 70 : 'default' }
            sortDirection={ orderBy === headCell.id ? order : false }
          >
            <TableSortLabel
              active={ orderBy === headCell.id }
              direction={ orderBy === headCell.id ? order : 'asc' }
              onClick={ createSortHandler(headCell.id) }
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={ classes.visuallyHidden }>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
