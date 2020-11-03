import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b2d1dd',
      light: '#e4ffff',
      dark: '#82a0ab',
      contrastText: '#141025',
    },
    secondary: {
      main: '#BE2165',
      // light: '#826cc9',
      // dark: '#1e1969',
      contrastText: '#f2f2f2',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      paper: '#e6e6e6',
    }
  },
});

export default theme;
