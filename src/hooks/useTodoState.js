import { useState } from 'react';

export default (initialValue) => {
  const [todoItems, setTodoItems] = useState(initialValue);

  return {
    todoItems,
    addTodoItem: (
      id,
      title,
      priority,
      recur,
      due,
      notes,
      actions,
      invites,
      reminders,
    ) => {
      setTodoItems([
        ...todoItems,
        id,
        title,
        priority,
        recur,
        due,
        notes,
        actions,
        invites,
        reminders,
      ]);
    },
  };
};
