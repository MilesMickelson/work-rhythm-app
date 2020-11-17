import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [title, setTitle] = useInput('');
  return {
    value,
    onChange: (event) => {
      setValue(event.target.value);
    },
    title,
    handleTitle: (event) => {
      setTitle(event.target.value);
    },
    reset: () => ('setValue'),
  };
};

export default useInput;
