// import { useState } from 'react';

// export default () => {
//   const [value, setValue] = useState('');

//   return {
//     value,
//     onChange: (event) => {
//       setValue(event.target.value);
//     },
//     reset: () => setValue('')
//   };
// };
import { useState } from 'react';

const useInput = (
  title,
  priority,
  recur,
  due,
  notes,
  actions,
  invites,
  reminders
  ) => {
  const [title, setTitle] = useState('');

  function handleTitle(event) {
    setTitle(event.target.value);
    reset: () => setTitle('')
  }

  return
    title,
    priority,
    recur,
    due,
    notes,
    actions,
    invites,
    reminders;
};
