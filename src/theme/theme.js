// src/theme/theme.js
import { purple, green, grey, blue, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: purple[500],
//     },
//     secondary: {
//       main: green[500],
//     },
//     common : {
//       black : '#000',
//       white : '#fff'
//     }
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: '8px',
//           // color: mode === 'light' ? grey[200] : blue[700],
//           // backgroundColor: mode === 'light' ? (value) => value.palette.primary.main : grey["100"],
//           fontSize: 16,
//         },
//       },
//     },
//     MuiDataGrid: {
//       styleOverrides: {
//         root: {
//           backgroundColor: grey[100],
//           color: '#000',
//         },
//       },
//     },
//   }
// });

// export default theme;

const changeMode = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Palette for light mode
          primary: {
            main: blue[500],
          },
          secondary: {
            main: '#dc004e',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: '#000000',
            secondary: grey[700],
          },
        }
      : {
          // Palette for dark mode
          primary: {
            main: red[300],
          },
          secondary: {
            main: '#ff4081',
          },
          background: {
            default: '#121212',
            paper: '#1d1d1d',
          },
          text: {
            primary: '#ffffff',
            secondary: grey[500],
          },
        }),
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 18,
    caption: {
      color: mode === 'light' ? blue[700] : red[100],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          color: mode === 'light' ? grey[200] : blue[700],
          backgroundColor: mode === 'light' ? (value) => value.palette.primary.main : grey["100"],
          fontSize: 16,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? grey[100] : grey[900],
          color: mode === 'light' ? '#000000' : '#ffffff',
        },
      },
    },
  },
});

export const getTheme = (mode) => createTheme(changeMode(mode));
