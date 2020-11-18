import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (event) => {
      setValue(event.target.value);
    },
    reset: () => ('setValue'),
  };
};

export default useInput;
