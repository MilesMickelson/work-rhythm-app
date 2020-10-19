import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
    '&:hover': {
      backgroundColor: '#66ccff',
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#66ccff',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath"
        + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.00 "
        + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
}));

// const useStyles = makeStyles((theme) => ({  Accordian dropdown w/ more
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
//   icon: {
//     verticalAlign: 'bottom',
//     height: 20,
//     width: 20,
//   },
//   details: {
//     alignItems: 'center',
//   },
//   column: {
//     flexBasis: '33.33%',
//   },
//   helper: {
//     borderLeft: `2px solid ${theme.palette.divider}`,
//     padding: theme.spacing(1, 2),
//   },
//   link: {
//     color: theme.palette.primary.main,
//     textDecoration: 'none',
//     '&:hover': {
//       textDecoration: 'underline',
//     },
//   },
// }));

// export default function DetailedAccordion() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Accordion defaultExpanded>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1c-content"
//           id="panel1c-header"
//         >
//           <div className={classes.column}>
//             <Typography className={classes.heading}>Location</Typography>
//           </div>
//           <div className={classes.column}>
//             <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
//           </div>
//         </AccordionSummary>
//         <AccordionDetails className={classes.details}>
//           <div className={classes.column} />
//           <div className={classes.column}>
//             <Chip label="Barbados" onDelete={() => {}} />
//           </div>
//           <div className={clsx(classes.column, classes.helper)}>
//             <Typography variant="caption">
//               Select your destination of choice
//               <br />
//               <a href="#secondary-heading-and-columns" className={classes.link}>
//                 Learn more
//               </a>
//             </Typography>
//           </div>
//         </AccordionDetails>
//         <Divider />
//         <AccordionActions>
//           <Button size="small">Cancel</Button>
//           <Button size="small" color="primary">
//             Save
//           </Button>
//         </AccordionActions>
//       </Accordion>
//     </div>
//   );
// }
// let urgent = [];
// let high = [];
// let medium = [];
// let low = [];
// let todoListGroups = [];
// let deletedGroup = [];

export default function TaskList() {
  const classes = useStyles();
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={ <ExpandMoreIcon /> }
          aria-label='Expand'
          aria-controls='additional-actions1-content'
          id='additional-actions1-header'
        >
          <FormControlLabel
            aria-label='Acknowledge'
            onClick={ (event) => event.stopPropagation() }
            onFocus={ (event) => event.stopPropagation() }
            control={ <Checkbox /> }
            label='I acknowledge that I should stop the click event propagation'
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color='textSecondary'>
            The click event of the nested action will propagate up and expand the accordion unless
            you explicitly stop it.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
