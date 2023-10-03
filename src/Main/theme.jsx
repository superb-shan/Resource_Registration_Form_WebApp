// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Customize your theme here
  palette: {
    primary: {
      main: '#1976D2',
      //! wont be applied for the overall bg, because it needs to have opacity reduced, which is done with rgba
    },
    secondary: {
      main: '#ffe600',
    },
    text: {
      main: '#374151',
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
