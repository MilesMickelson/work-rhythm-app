import React from 'react';
// import Draggable from 'react-draggable';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  fragmentContainer: {
    height: '100%',
    width: '100%',
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

// function PaperComponent(props) {
//   return (
//     <Draggable handle='#draggable-dialog-title' cancel={ '[class*="MuiDialogContent-root"]' }>
//       <Paper { ...props } />
//     </Draggable>
//   );
// }

const Custom = () => {
  const classes = useStyles();
  return (
    <div className={ classes.fragmentContainer }>
      <div>Hello, custom timer</div>
    </div>
  );
};

export default Custom;
