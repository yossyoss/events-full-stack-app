import { createTheme} from '@mui/material/styles';
const theme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#222B36',
          }
        }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: '#919EAB',
                },
                notchedOutline: {
                    borderColor: 'rgba(255, 255, 255, 0.23)'
                }
              }
        },
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: '#222B36',
            color: 'white',
            borderBottomColor: '#3D4752',
            fontWeight: 400,
            fontSize: '13px'
          }
        }
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            color: 'white'
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            color: '#919EAB !important'
          }
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            color: 'white'
          }
        },
      },
    },
});
  export default theme