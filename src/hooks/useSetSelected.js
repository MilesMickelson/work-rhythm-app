import { useState } from 'react';

export default () => {
  const [selected, setSelected] = useState([]);
  return {
    useHandleSelectAllClick: (event) => {
      if (event.target.checked) {
        const newSelecteds = itemList.map((n) => n.id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    },
    useHandleClick: (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
      if (selectedIndex === - 1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, - 1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    },
  };
};

//  useHandleSelectAllClick: = (event) => {
//   if (event.target.checked) {
//     const newSelecteds = todoItems.map((n) => n.id);
//     setSelected(newSelecteds);
//     return;
//   }
//   setSelected([]);
// };

// const handleClick = (event, id) => {
//   const selectedIndex = selected.indexOf(id);
//   let newSelected = [];
//   if (selectedIndex === - 1) {
//     newSelected = newSelected.concat(selected, id);
//   } else if (selectedIndex === 0) {
//     newSelected = newSelected.concat(selected.slice(1));
//   } else if (selectedIndex === selected.length - 1) {
//     newSelected = newSelected.concat(selected.slice(0, - 1));
//   } else if (selectedIndex > 0) {
//     newSelected = newSelected.concat(
//       selected.slice(0, selectedIndex),
//       selected.slice(selectedIndex + 1),
//     );
//   }
//   setSelected(newSelected);
// },