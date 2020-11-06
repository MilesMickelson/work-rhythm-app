import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// ! Later implementation for unique id's-use nano id repo instead
// const shortid = require('shortid');
// function createNewTodo(text) {
//   return {
//     completed: false,
//     id: shortid.generate(),
//     text
//   };
// }

// ! Data creation and simulation //
function createData(title, id, priority, recurring, time, due) {
  return {
    title,
    id,
    priority,
    recurring,
    time,
    due,
    details: [
      { notes: '', added: '' },
    ],
  };
}

const rows = [
  createData('Write more code!', 1, 'Very High', 'Everyday', 14.3, '11-1-2021', 'these are my notes', '11-6-20'),
  createData('Eat healthy', 'High', 2, 'Weekly', 14.3, '11-2-2021', 'these are my notes', '11-6-20'),
  createData('Cook dinner', 'Medium', 3, 'Business Days', 14.3, '11-3-2023', 'these are my notes', '11-6-20'),
  createData('Exercise', 'Medium', 4, 'Bi-Weekly', 14.3, '12-4-2021', 'these are my notes', '11-6-20'),
  createData('Call mom', 5, 'Low', 'Monthly', 14.3, '11-7-2029', 'these are my notes', '11-6-20'),
];

// ! Sorting Logic //
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return - 1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => - descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ! Table Header Labels
const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'priority',
    numeric: true,
    disablePadding: false,
    label: 'Priority'
  },
  {
    id: 'recurring',
    numeric: true,
    disablePadding: false,
    label: 'Recurring'
  },
  {
    id: 'due',
    numeric: true,
    disablePadding: false,
    label: 'Due'
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: 'Time Remaining'
  },
  {
    id: 'expand',
    numeric: false,
    disablePadding: false,
    label: 'Expand'
  },
];

// ! Enhanced Table Header Component
function EnhancedTableHead(props) {
  // eslint-disable-next-line object-curly-newline
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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
}

EnhancedTableHead.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// ! Enhanced Table Toolbar Component //
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.dark,
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.dark,
      },
  toolheader: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={ clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      }) }
    >
      {numSelected > 0 ? (
        <Typography className={ classes.toolheader } color='primary' variant='subtitle1' component='div'>
          {numSelected}
          selected
        </Typography>
      ) : (
        <Typography className={ classes.toolheader } variant='h6' id='tableTitle' component='div'>
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
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// ! Expanded Table Row Component //
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function ExpandRow(props) {
  const [open] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={ classes.root }>
        <TableCell style={ { paddingBottom: 0, paddingTop: 0 } } colSpan={ 6 }>
          <Collapse in={ open } timeout='auto' unmountOnExit>
            <Box margin={ 1 }>
              <Typography variant='h6' gutterBottom component='div'>
                Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell align='right'>Notes</TableCell>
                    <TableCell align='right'>Date Added</TableCell>
                    {/* <TableCell align='right'>Total Time</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (
                    <TableRow key={ detailsRow.id }>
                      <TableCell>{detailsRow.notes}</TableCell>
                      <TableCell align='right'>{detailsRow.added}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

ExpandRow.propTypes = {
  row: PropTypes.shape({
    details: PropTypes.arrayOf(
      PropTypes.shape({
        notes: PropTypes.string.isRequired,
        added: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const useStyles = makeStyles((theme) => ({
  fragmentContainer: {
    height: '100%',
    width: '100%',
    maxWidth: 960,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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
}));

// ! WorkFlow Component Through End //
const WorkFlow = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('priority');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === - 1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, - 1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
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

  const isSelected = (id) => selected.indexOf(id) !== - 1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={ classes.fragmentContainer }>
      <Paper className={ classes.paper }>
        <EnhancedTableToolbar numSelected={ selected.length } />
        <TableContainer>
          <Table
            className={ classes.table }
            aria-labelledby='tableTitle'
            size={ dense ? 'small' : 'medium' }
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={ classes }
              numSelected={ selected.length }
              order={ order }
              orderBy={ orderBy }
              onSelectAllClick={ handleSelectAllClick }
              onRequestSort={ handleRequestSort }
              rowCount={ rows.length }
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, id) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${id}`;
                  return (
                    <TableRow
                      hover
                      onClick={ (event) => handleClick(event, row.id) }
                      role='checkbox'
                      aria-checked={ isItemSelected }
                      tabIndex={ - 1 }
                      key={ row.id }
                      selected={ isItemSelected }
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={ isItemSelected }
                          inputProps={ { 'aria-labelledby': labelId } }
                        />
                      </TableCell>
                      <TableCell align='left' component='th' id={ labelId } scope='row' padding='none'>
                        {row.title}
                      </TableCell>
                      <TableCell align='right'>{row.priority}</TableCell>
                      <TableCell align='right'>{row.recurring}</TableCell>
                      <TableCell align='right'>{row.time}</TableCell>
                      <TableCell align='right'>{row.due}</TableCell>
                      <TableCell>
                        <IconButton aria-label='expand row' size='small' onClick={ () => setOpen(! open) }>
                          { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableBody>
              {rows.map((row) => (
                <ExpandRow key={ row.id } row={ row } />
              ))}
            </TableBody>
            {emptyRows > 0 && (
              <TableRow style={ { height: (dense ? 33 : 53) * emptyRows } }>
                <TableCell colSpan={ 6 } />
              </TableRow>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ [10, 20, 50] }
          component='div'
          count={ rows.length }
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
    </div>
  );
};

export default WorkFlow;
