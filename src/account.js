import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fragmentContainer: {
    height: '100%',
    width: '100%',
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Account = () => {
  const classes = useStyles();
  return (
    <div className={ classes.fragmentContainer }>
      <div>Hello, Account page!</div>
    </div>
  );
};

export default Account;
