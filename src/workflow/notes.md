# Workflow Notes and Temp Saving

actionChips: []
actions: "gmail"
added: ""
checked: []
dueDate: "12/17/2020"
dueTime: "6:59:48 PM"
highPriority: false
id: 0
isRepeating: false
key: ""
notes: "sdvsdv"
priority: "High"
reminders: "30 minutes before"
repeat: "Weekdays"
stopwatchActive: ""
title: "sdvsdvsdv"

last todo item return result


// Code from old todo app project to use for logic and method reference

// addItem(key) {
//   let itemPriority = document.getElementById('itemPriority' + key).value;
//     if(itemPriority === '0'){
//     return;
//   }

//   let itemDescription = document.getElementById('itemDescription' + key).value;
//   let toDoItems = this.state.toDoItems.map( ToDoItem => {
//     if(ToDoItem.key === key){
//       ToDoItem.itemPriority = itemPriority;
//       ToDoItem.itemDescription = itemDescription;
//       ToDoItem.isEditing = false;
//     }
//     return ToDoItem;
//   });

//   let currentKey = this.state.currentKey;
//   if(key === currentKey){
//     currentKey++;
//     toDoItems.push({
//       itemPriority: '0',
//       itemDescription: '',
//       key: currentKey,
//       isComplete: false,
//       isEditing: false
//     })
//   document.getElementById('itemDescription' + key).value = '';
//   document.getElementById('itemPriority' + key).value = '0';
//   }

//   this.setState ({
//     toDoItems: toDoItems,
//     currentKey: currentKey,
//   });
// }

// handleEdit(key) {
//   let toDoItems = this.state.toDoItems.map( ToDoListItem => {
//     if (ToDoListItem.key === key){
//       ToDoListItem.isEditing = true;
//     }
//     return ToDoListItem;
//   })
//   this.setState ({
//     toDoItems: toDoItems
//   });
// }

// handleDelete(key) {
//   let toDoItems = this.state.toDoItems.filter( ToDoListItem => {
//     return ToDoListItem.key !== key;
//   })
//   this.setState ({
//     toDoItems: toDoItems
//   });
// }

//   render () {
//     return (
//           <div className='col-sm-4'>
//             <InputField toDoItems={this.state.toDoItems[this.state.toDoItems.length-1]}
//             onClick={ () => this.addItem(this.state.currentKey)} />
//           </div>

// // ! Input field
//   render() {
//     return (
//       <div className='card'>
//         <div className='card-header'>Add New To-Do</div>
// 				<div className={`${ 'card-body' } ${ 'inputCard' }`}>
// 					<div className='form-group'>
// 						<label className='toDoLabel' htmlFor='itemDescription'>I want to..</label>
// 						<textarea className={`${ 'form-control' } ${ 'create-todo-text' }`} id={'itemDescription' + this.props.toDoItems.key}>
// 						</textarea>
// 					</div>
// 					<div className='form-group'>
// 						<label className='priorityLabel' htmlFor='itemPriority'>How much of a priority is this?</label>
// 						<select className={`${ 'create-todo-priority' } ${ 'form-control' }`} id={'itemPriority' + this.props.toDoItems.key}>
// 							<option value='0'>Select a Priority</option>
// 							<option value='low'>Low Priority</option>
// 							<option value='med'>Medium Priority</option>
// 							<option value='high'>High Priority</option>
// 						</select>
// 					</div>
// 				</div>
//         <div className='card-footer'>
//           <button className='create-todo' onClick={this.props.onClick}>Add</button>
//         </div>
//       </div>
//     );
//   }
// }

// // ! Items List
//   render() {
//     if (this.props.toDoItems.length === 0){
//       return (
//         <div className="card text-left">
//           <div className={`${ "card-body" } ${ "welcomeCard" }`}>
//             <div className="welcomeCardHeader">Welcome to Very Simple ToDo App!</div>
//             <div>Get started now by adding a todo on the left.</div>
//           </div>
//         </div>
//       )
//     } else {
//       return (
//         <div>
//         {
//           this.props.toDoItems.map( ToDoItem => {
//           return <ToDoListItem key={ToDoItem.key} data={ToDoItem}
//           addItem={ () => this.props.addItem(ToDoItem.key)}
//           handleEdit={ () => this.props.handleEdit(ToDoItem.key)}
//           handleDelete={ () => this.props.handleDelete(ToDoItem.key)}/>
//           })
//         }
//         </div>
//       );
//     }
//   }
// }

// // ! Todo list / Editing in progress
//   render() {
//     if (this.props.data.isEditing){
//       return (
//         <div className='card text-left'>
//         <div className={`${'card-body'} ${this.props.data.itemPriority}`}>
//           <div className='form-group'>
//             <label className='toDoLabel' htmlFor='update-todo-text'>I want to..</label>
//             <textarea id={'itemDescription' + this.props.data.key}
//             className={`${ 'form-control' } ${ 'update-todo-text' }`}
//             defaultValue={this.props.data.itemDescription}>
//             </textarea>
//           </div>
//           <div className='form-group'>
//             <label className='priorityLabel' htmlFor='update-todo-priority'>Priority</label>
//             <select id={'itemPriority' + this.props.data.key} className={`${ 'form-control' } ${ 'update-todo-priority' }`}
//               defaultValue={this.props.data.itemPriority}>
//               <option>Select a Priority</option>
//               <option value='low'>Low Priority</option>
//               <option value='med'>Medium Priority</option>
//               <option value='high'>High Priority</option>
//             </select>
//           </div>
//           <button className={`${ 'update-todo' } ${ 'saveEditButton' }`}
//           onClick={this.props.addItem}>Save</button>
//         </div>
//       </div>
//       )
//     } else {
// 			return (
// 				<div className={`${ 'card text-left' } ${ 'toDoItemCard' }`}>
// 					<div className={`${'card-body'} ${this.props.data.itemPriority}`}>
// 						<div className={`${ 'row' } ${ 'itemObjectRow' }`}>
// 							<input type='checkbox' className='completeCheckBox'
// 							defaultChecked={this.props.isComplete}/>
// 							<div className='itemDescription'>{this.props.data.itemDescription}</div>
// 							<a type='button' className={`${ 'edit-todo' } ${ 'far fa-edit' }`}
// 							onClick={this.props.handleEdit}/>
// 							<a type='button' className={`${ 'delete-todo' } ${ 'far fa-trash-alt' }`}
// 							onClick={this.props.handleDelete}/>
// 						</div>
// 					</div>
// 				</div>
// 			);
//     }
//   }
// }
