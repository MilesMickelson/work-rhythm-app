import { useState } from 'react';

export default (initialValue) => {
  const [open, setCalendarOpen] = useState(initialValue);
  return {
    useHandleCalendarClick: () => {
      setCalendarOpen(! open);
    },
  };
};
