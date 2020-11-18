import { useState } from 'react';

export default (initialValue) => {
  const [todoItems, setTodoItems] = useState(initialValue);

  return {
    todoItems,
    addTodoItem: (
      title,
      priority,
      recur,
      due,
      notes,
      actions,
      invites,
      reminders,
      added,
    ) => {
      setTodoItems([
        ...todoItems,
        title,
        priority,
        recur,
        due,
        notes,
        actions,
        invites,
        reminders,
        added,
      ]);
    },
  };
};
