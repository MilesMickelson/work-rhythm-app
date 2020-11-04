import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3D7E97',
      light: '#6fadc8',
      dark: '#005269',
      contrastText: '#f2f2f2',
    },
    secondary: {
      main: '#76ff03',
      light: '#91ff35',
      dark: '#52b202',
      contrastText: '#f2f2f2',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      paper: 'E1E2E1',
    }
  },
});

export default theme;
