import { useState } from 'react';

export default (initialValue) => {
  const [itemList, setItemList] = useState(initialValue);

  return {
    itemList,
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
      setItemList([
        ...itemList,
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
