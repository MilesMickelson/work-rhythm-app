import { useState } from 'react';

const useShowInput = () => {
  const [showInput, setShowInput] = useState(false);
  return {
    useHandleShowInput: () => {
      setShowInput(! showInput);
    },
  };
};

export default useShowInput;
