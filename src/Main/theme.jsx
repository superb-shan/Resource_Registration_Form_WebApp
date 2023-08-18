// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Customize your theme here
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#ffd966',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    allVariants: {
      color: '#374151',
    },
  },
});

export default theme;
