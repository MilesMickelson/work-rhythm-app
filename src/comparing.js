// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//   },
// });
// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       { date: '2020-01-05', customerId: '11091700', amount: 3 },
//       { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
//     ],
//   };
// }
// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);
//   const classes = useRowStyles();
//   return (
//     <React.Fragment>
//       <TableRow className={classes.root}>
//         <TableCell>
//           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {row.name}
//         </TableCell>
//         <TableCell align="right">{row.calories}</TableCell>
//         <TableCell align="right">{row.fat}</TableCell>
//         <TableCell align="right">{row.carbs}</TableCell>
//         <TableCell align="right">{row.protein}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography variant="h6" gutterBottom component="div">
//                 History
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell align="right">Amount</TableCell>
//                     <TableCell align="right">Total price ($)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.date}>
//                       <TableCell component="th" scope="row">
//                         {historyRow.date}
//                       </TableCell>
//                       <TableCell>{historyRow.customerId}</TableCell>
//                       <TableCell align="right">{historyRow.amount}</TableCell>
//                       <TableCell align="right">
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }
// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };
// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];
// export default function CollapsibleTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <Row key={row.name} row={row} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// onClick={ () => setExpanded(! open) }
// { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
// const handleChange = (event, newValue) => {
//   setValue(newValue);
// };
// const handleName = (event, newName) => {
//   setName(newName);
// };

import React, { Component } from 'react';
import InputField from './InputField.jsx';
import ItemsList from './ItemsList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: 0,
      toDoItems: [{
      key: 0,
      itemPriority: '0',
      itemDescription: '',
      isComplete: false,
      isEditing: false
      }]
    };
    this.addItem = this.addItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  addItem(key) {
    let itemPriority = document.getElementById('itemPriority' + key).value;
      if(itemPriority === '0'){
      return;
    }

    let itemDescription = document.getElementById('itemDescription' + key).value;
    let toDoItems = this.state.toDoItems.map( ToDoItem => {
      if(ToDoItem.key === key){
        ToDoItem.itemPriority = itemPriority;
        ToDoItem.itemDescription = itemDescription;
        ToDoItem.isEditing = false;
      }
      return ToDoItem;
    });

    let currentKey = this.state.currentKey;
    if(key === currentKey){
      currentKey++;
      toDoItems.push({
        itemPriority: '0',
        itemDescription: '',
        key: currentKey,
        isComplete: false,
        isEditing: false
      })
    document.getElementById('itemDescription' + key).value = '';
    document.getElementById('itemPriority' + key).value = '0';
    }

    this.setState ({
      toDoItems: toDoItems,
      currentKey: currentKey,
    });
  }

  handleEdit(key) {
    let toDoItems = this.state.toDoItems.map( ToDoListItem => {
      if (ToDoListItem.key === key){
        ToDoListItem.isEditing = true;
      }
      return ToDoListItem;
    })
    this.setState ({
      toDoItems: toDoItems
    });
  }

  handleDelete(key) {
    let toDoItems = this.state.toDoItems.filter( ToDoListItem => {
      return ToDoListItem.key !== key;
    })
    this.setState ({
      toDoItems: toDoItems
    });
  }

  render () {
    return (
      <div className='container-fluid'>
        <h1 className='mainHeader'>Very Simple To Do App</h1>
        <h5 className='mainSubHeader'>Track all of the things</h5>
        <hr className='lineBreak'></hr>
        <div className='row'>
          <div className='col-sm-4'>
            <InputField toDoItems={this.state.toDoItems[this.state.toDoItems.length-1]}
            onClick={ () => this.addItem(this.state.currentKey)} />
          </div>
          <div className='col-sm-8'>
            <div className='card'>
              <div className='card-header'>View To-Do's</div>
                <div className={`${ 'card-body' } ${ 'itemsCard' }`}>
									<ItemsList toDoItems={this.state.toDoItems.slice(0, this.state.toDoItems.length-1)}
									addItem={this.addItem} handleEdit={this.handleEdit}
									handleDelete={this.handleDelete}/>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
import React, { Component } from "react";

class InputField extends Component {
  constructor (props){
    super (props);
  }

  render() {
    return (
      <div className='card'>
        <div className='card-header'>Add New To-Do</div>
				<div className={`${ 'card-body' } ${ 'inputCard' }`}>
					<div className='form-group'>
						<label className='toDoLabel' htmlFor='itemDescription'>I want to..</label>
						<textarea className={`${ 'form-control' } ${ 'create-todo-text' }`} id={'itemDescription' + this.props.toDoItems.key}>
						</textarea>
					</div>
					<div className='form-group'>
						<label className='priorityLabel' htmlFor='itemPriority'>How much of a priority is this?</label>
						<select className={`${ 'create-todo-priority' } ${ 'form-control' }`} id={'itemPriority' + this.props.toDoItems.key}>
							<option value='0'>Select a Priority</option>
							<option value='low'>Low Priority</option>
							<option value='med'>Medium Priority</option>
							<option value='high'>High Priority</option>
						</select>
					</div>
				</div>
        <div className='card-footer'>
          <button className='create-todo' onClick={this.props.onClick}>Add</button>
        </div>
      </div>
    );
  }
}

export default InputField;
import React, { Component } from "react";
import ToDoListItem from './ToDoItem.jsx';

class ItemsList extends Component {
  constructor (props){
    super (props);
  }

  render() {
    if (this.props.toDoItems.length === 0){
      return (
        <div className="card text-left">
          <div className={`${ "card-body" } ${ "welcomeCard" }`}>
            <div className="welcomeCardHeader">Welcome to Very Simple ToDo App!</div>
            <div>Get started now by adding a todo on the left.</div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
        {
          this.props.toDoItems.map( ToDoItem => {
          return <ToDoListItem key={ToDoItem.key} data={ToDoItem}
          addItem={ () => this.props.addItem(ToDoItem.key)}
          handleEdit={ () => this.props.handleEdit(ToDoItem.key)}
          handleDelete={ () => this.props.handleDelete(ToDoItem.key)}/>
          })
        }
        </div>
      );
    }
  }
}

export default ItemsList;
import React, { Component } from "react";

class ToDoListItem extends Component {
  constructor (props){
    super (props);
  }

  render() {
    if (this.props.data.isEditing){
      return (
        <div className='card text-left'>
        <div className={`${'card-body'} ${this.props.data.itemPriority}`}>
          <div className='form-group'>
            <label className='toDoLabel' htmlFor='update-todo-text'>I want to..</label>
            <textarea id={'itemDescription' + this.props.data.key}
            className={`${ 'form-control' } ${ 'update-todo-text' }`}
            defaultValue={this.props.data.itemDescription}>
            </textarea>
          </div>
          <div className='form-group'>
            <label className='priorityLabel' htmlFor='update-todo-priority'>Priority</label>
            <select id={'itemPriority' + this.props.data.key} className={`${ 'form-control' } ${ 'update-todo-priority' }`}
              defaultValue={this.props.data.itemPriority}>
              <option>Select a Priority</option>
              <option value='low'>Low Priority</option>
              <option value='med'>Medium Priority</option>
              <option value='high'>High Priority</option>
            </select>
          </div>
          <button className={`${ 'update-todo' } ${ 'saveEditButton' }`}
          onClick={this.props.addItem}>Save</button>
        </div>
      </div>
      )
    } else {
			return (
				<div className={`${ 'card text-left' } ${ 'toDoItemCard' }`}>
					<div className={`${'card-body'} ${this.props.data.itemPriority}`}>
						<div className={`${ 'row' } ${ 'itemObjectRow' }`}>
							<input type='checkbox' className='completeCheckBox'
							defaultChecked={this.props.isComplete}/>
							<div className='itemDescription'>{this.props.data.itemDescription}</div>
							<a type='button' className={`${ 'edit-todo' } ${ 'far fa-edit' }`}
							onClick={this.props.handleEdit}/>
							<a type='button' className={`${ 'delete-todo' } ${ 'far fa-trash-alt' }`}
							onClick={this.props.handleDelete}/>
						</div>
					</div>
				</div>
			);
    }
  }
}

export default ToDoListItem;
import React, { Component } from "react";

class Welcome extends Component {
  constructor (props){
    super (props);
  }

  render() {
    return (
      <div className='card text-left'>
        <div className={`${ 'card-body' } ${ 'welcomeCard' }`}>
          <div className='welcomeCardHeader'>Welcome to Very Simple ToDo App!</div>
          <div>Get started now by adding a todo on the left.</div>
        </div>
      </div>
    );
  }
}

export default Welcome;