import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5c6bc0',
      light: '#8e99f3',
      dark: '#26418f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4527a0',
      light: '#7953d2',
      dark: '#000070',
      contrastText: '#ffffff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
