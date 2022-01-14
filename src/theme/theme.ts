import { createTheme } from '@material-ui/core/styles'
import { Shadows } from '@material-ui/core/styles/shadows'
import { typography } from './typography'
import { palette } from './palette'

/**
 * We need to add all styles for Nova DLS Components. Will will also need to improve the color pallette by adding a darkest and lightest somewhere, and add grey colors.
 */
export const theme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
    MuiTextField: {
      variant: 'outlined',
    },
    MuiCheckbox: {
      disableRipple: true,
      disableFocusRipple: true,
    },
  },
  shadows: new Array(25).fill('none') as Shadows,
  palette,
  typography,
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(255,255,255,.2)',
      }
    },
    MuiDialog: {
      root: {
        backgroundColor: 'rgba(255,255,255,.2)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }
    },
    MuiLink: {
      root: {
        color: '#3333FF',
      },
    },
    MuiTableCell: {
      root: {
        padding: '8px 12px',
        fontSize: '14px',
      },
      head: {
        color: '#858585',
        fontSize: '14px',
        fontWeight: 'bold',
      },
      stickyHeader: {
        backgroundColor: '#fff',
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: '#c9c9c9',
        borderWidth: '2px',
        borderRadius: '3px',
      },
      input: {
        height: '40px',
        padding: '0px 14px',
      },
      root: {
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: '#4EB299',
        },
        '&:focused:not($disabled):not($error) $notchedOutline': {
          borderColor: '#038767',
        },
      },
    },
    MuiInputLabel: {
      root: {
        fontWeight: 'bold',
        marginBottom: '5px',
      },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: '0px',
        color: '#858585',
        fontSize: '11px',
      },
    },
    MuiButton: {
      root: {
        fontWeight: 'bold',
        boxShadow: 'none',
        padding: '8px 24px',
      },
      containedSecondary: {
        '&:hover:not($disabled):not($focused)': {
          backgroundColor: '#f2f2f2',
        },
        '&:active:not($disabled)': {
          backgroundColor: '#07212C !important',
          border: '1px solid #07212C',
          color: '#fff',
        },
        backgroundColor: '#fff',
        border: '1px solid #bababa',
        color: '#365E70',
      },
      sizeSmall: {
        lineHeight: '16px',
        padding: '8px 16px',
      },
      sizeLarge: {
        padding: '12px 48px',
      },
    },
    MuiTabs: {
      indicator: {
        display: 'none',
      },
    },
    MuiTab: {
      root: {
        '&$selected': {
          backgroundColor: '#fff',
          borderTop: '2px solid #000',
          fontWeight: 'bold',
        },
        border: '1px solid #F2F2F2',
        backgroundColor: '#F9F9F9',
        borderRadius: '4px 4px 0px 0px',
        paddingTop: '7px',
        paddingBottom: '7px',
      },
    },
    MuiCheckbox: {
      root: {
        borderColor: palette.primary.main,
        color: palette.primary.main,
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&$checked': {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      colorPrimary: {
        color: palette.primary.main,
        '&$checked': {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
})
