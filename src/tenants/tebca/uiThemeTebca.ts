import type { Theme } from '@mui/material';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    auth: true;
  }
}

const white = '#fff';

// Primary color - Tenant
const primary = '#004C97';

// Primary color mode dark
const primaryDark = '#272F40';

//Secondary color - Tenant
const secondary = '#d9e7f1';

// Text color variables
const textColor = '#333333';

//Gradient color
const blueGradient = 'linear-gradient(25deg, #8d4bf8 0%, #004C97 80%, #01afac 100%);';

//Color alert
const info = '#CEE9FF';
const success = '#62ba46';
const successLight = '#d9e7f1';
const warning = '#ECE500';
const error = '#F34770';

// Grayscale variables
const grey100 = '#F6F9FC';
const grey200 = '#F3F5F9';
const grey300 = '#E3E9EF';
const grey400 = '#DAE1E7';
const grey500 = '#AEB4BE';
const grey600 = '#7D879C';
const grey700 = '#333333';
const grey800 = '#272F40';
const grey900 = '#1B2435';

// Border variables
const borderRadius = 20;

// Font size variables
const h1 = 2.5; //40px
const h2 = 2; //32px
const h3 = 1.75; //28px
const h4 = 1.5; //24px
const h5 = 1.25; //20px
const h6 = 1; //16px
const text = 1; //16px
const text2 = 0.875; //14px
const small = 0.75; //12px

export const tebcaTheme = materialMode;

function materialMode(mode: string) {
  const ptTheme = {
    palette: getPalette(),
    typography: getTypography(mode),
    shape: getshape(),
    components: getComponents(mode),
  };

  return ptTheme;
}

function getPalette() {
  return {
    primary: {
      main: primary,
      light: successLight,
    },
    secondary: {
      main: secondary,
    },
    info: {
      main: info,
    },
    success: {
      main: success,
    },
    warning: {
      main: warning,
    },
    error: {
      main: error,
    },
    grey: {
      100: grey100,
      200: grey200,
      300: grey300,
      400: grey400,
      500: grey500,
      600: grey600,
      700: grey700,
      800: grey800,
      900: grey900,
    },
    text: {
      primary: textColor,
    },
  };
}

function getTypography(mode: string) {
  return {
    fontFamily: 'Sans-Serif',
    allVariants: {
      color: mode === 'light' ? textColor : white,
      fontSize: `${text}rem`,
    },
    h1: {
      fontSize: `${text * h1}rem`,
      fontWeight: 600,
    },
    h2: {
      fontSize: `${text * h2}rem`,
      fontWeight: 600,
    },
    h3: {
      fontSize: `${text * h3}rem`,
      fontWeight: 600,
    },
    h4: {
      fontSize: `${text * h4}rem`,
      fontWeight: 600,
    },
    h5: {
      fontSize: `${text * h5}rem`,
    },
    h6: {
      fontSize: `${text * h6}rem`,
    },
    body1: {
      fontSize: `${text * text}rem`,
    },
    body2: {
      fontSize: `${text * text2}rem`,
    },
    caption: {
      fontSize: `${text * small}rem`,
    },
  };
}

function getshape() {
  return {
    borderRadius: borderRadius,
  };
}

function getComponents(mode: string) {
  return {
    MuiCssBaseline: getMuiCssBaseline(),
    MuiTypography: getMuiTypography(),
    MuiContainer: getMuiContainer(mode),
    MuiAppBar: getMuiAppBar(mode),
    MuiButton: getMuiButton(),
    MuiToggleButton: getMuiToggleButton(),
    MuiInputBase: getMuiInputBase(),
    MuiInputLabel: getMuiInputLabel(mode),
    MuiFormHelperText: getMuiFormHelperText(),
    MuiOutlinedInput: getMuiOutlinedInput(mode),
    MuiCheckbox: getMuiCheckbox(mode),
    MuiCard: getMuiCard(),
    MuiAlert: getMuiAlert(),
    MuiIconButton: getMuiIconButton(),
    MuiListItemButton: getMuiListItemButton(),
    MuiListItemSecondaryAction: getMuiListItemSecondaryAction(),
    MuiListItemText: getMuiListItemText(),
    MuiDivider: getMuiDivider(),
    MuiDialog: getMuiDialog(),
    MuiDrawer: getMuiDrawer(),
    MuiTooltip: getMuiTooltip(),
    MuiCardContent: getMuiCardContent(),
    MuiMenuItem: getMuiMenuItem(),
    MuiChip: getMuiChip(),
  };
}

function getMuiCssBaseline() {
  return {
    styleOverrides: `
    input::-ms-reveal,
    input::-ms-clear {
      display: none;
    }

    input:focus-visible {
      outline: none;
    }

    /* Chrome, Safari, Edge */
    input:-webkit-autofill,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
      box-shadow: 0 0 0 1000px #fff inset !important;
      -webkit-text-fill-color: #333333 !important;
      caret-color: #333333 !important;
      background-color: #fff !important;
      transition: background-color 5000s ease-in-out 0s !important;
    }

    /* Firefox */
    input:-moz-autofill {
      box-shadow: 0 0 0 1000px #fff inset !important;
      -moz-text-fill-color: #333333 !important;
      caret-color: #333333 !important;
      background-color: #fff !important;
      transition: background-color 5000s ease-in-out 0s !important;
    }

    /* Remove autofill background for internal (Chromium) */
    input:-internal-autofill-selected {
      background-color: #fff !important;
      -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
      box-shadow: 0 0 0 1000px #fff inset !important;
      -webkit-text-fill-color: #333333 !important;
      caret-color: #333333 !important;
      transition: background-color 5000s ease-in-out 0s !important;
    }

    /* Hide arrows from input[type=number] in all browsers */
    /* Chrome, Safari, Edge, Opera */
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }

    /* IE 10+ */
    input[type=number]::-ms-clear,
    input[type=number]::-ms-reveal {
      display: none;
      width: 0;
      height: 0;
    }

    .banner-color {
      background: linear-gradient(135deg, rgb(0, 76, 151), rgb(0, 119, 182)) !important;
    }

    .gradient-brand {
      background: ${blueGradient} !important;
    }
    `,
  };
}

function getMuiTypography() {
  return {
    styleOverrides: {
      root: {
        color: textColor,
      },
    },
  };
}

function getMuiContainer(mode: string) {
  return {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? grey200 : primaryDark,
        maxWidth: 'initial !important',
        flex: 'auto',
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        minHeight: '100vh',
      },
    },
  };
}

function getMuiAppBar(mode: string) {
  return {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        backgroundColor: mode === 'light' ? grey200 : primaryDark,
        boxShadow: 'none',
        minHeight: '64px',
        height: '64px',
        width: '100%',
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      }),
    },
  };
}

function getMuiButton() {
  return {
    styleOverrides: {
      root: {
        fontSize: `${text}rem`,
        height: '44px',
        letterSpacing: 'normal',
        minWidth: 80,
        textTransform: 'none',
        borderRadius: borderRadius,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      textPrimary: {
        ':hover': {
          background: 'transparent',
        },
      },
      outlinedPrimary: {
        backgroundColor: white,
        ':hover': {
          backgroundColor: primary,
          color: white,
        },
      },
    },
  };
}

function getMuiToggleButton() {
  return {
    styleOverrides: {
      root: {
        fontSize: `${text}rem`,
        height: '44px',
        letterSpacing: 'normal',
        minWidth: 80,
        textTransform: 'none',
        borderRadius: borderRadius,
        boxShadow: 'none',
        color: text,
        '&.Mui-selected': {
          backgroundColor: '#DAE5EC',
          '&:hover': {
            backgroundColor: primary,
            color: white,
          },
        },
        '&:hover': {
          backgroundColor: primary,
          color: white,
        },
      },
    },
  };
}

function getMuiInputBase() {
  return {
    styleOverrides: {
      root: {
        color: textColor,
        '&.MuiAutocomplete-inputRoot': {
          padding: 0,
          paddingBottom: 1,
        },
      },
      input: {
        borderRadius: borderRadius,
        padding: '14.23px 14px !important',
      },
    },
  };
}

function getMuiInputLabel(mode: string) {
  return {
    styleOverrides: {
      root: {
        color: grey500,
        backgroundColor: mode === 'light' ? '' : white,
        borderRadius: mode === 'light' ? '' : borderRadius,
        paddingLeft: mode === 'light' ? '' : 8,
        paddingRight: mode === 'light' ? '' : 8,
        '&.Mui-disabled': {
          backgroundColor: mode === 'light' ? '' : grey400,
          color: mode === 'light' ? '' : grey600,
        },
        '&.Mui-focused': {
          color: primary,
          backgroundColor: mode === 'light' ? '' : white,
          borderRadius: mode === 'light' ? '' : borderRadius,
          paddingLeft: mode === 'light' ? '' : 8,
          paddingRight: mode === 'light' ? '' : 8,
        },
      },
    },
  };
}

function getMuiFormHelperText() {
  return {
    styleOverrides: {
      root: {
        marginTop: 0,
        marginBottom: '8px',
      },
    },
  };
}

function getMuiOutlinedInput(mode: string) {
  return {
    styleOverrides: {
      input: {
        color: textColor,
        '&:-webkit-autofill': {
          WebkitTextFillColor: mode === 'light' ? textColor : '',
          WebkitBoxShadow: mode === 'light' ? '' : `0 0 0 100px ${white} inset`,
        },
        '&.Mui-disabled': {
          WebkitTextFillColor: mode === 'light' ? textColor : grey700,
          opacity: 0.5,
        },
      },
      root: {
        backgroundColor: white,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: grey500,
        },
        '& .MuiFormLabel-root': {
          backgroundColor: secondary,
        },
        '& .MuiInputAdornment-outlined': {
          color: primary,
          '& .MuiButtonBase-root': {
            color: primary,
          },
        },
        ':hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: primary,
          },
        },
        '&.Mui-error': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: error,
          },
        },
        fieldset: {
          borderWidth: '.5px',
        },
        '&.Mui-disabled': {
          backgroundColor: mode === 'light' ? '' : grey400,
          borderColor: grey500,
          color: textColor,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: grey500,
          },
        },
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: grey500,
          },
        },
      },
    },
  };
}

function getMuiCheckbox(mode: string) {
  return {
    styleOverrides: {
      root: {
        color: mode === 'light' ? '' : white,
        '&.Mui-checked': {
          color: mode === 'light' ? '' : white,
        },
        '&.Mui-disabled': {
          color: grey500,
        },
      },
    },
  };
}

function getMuiCard() {
  return {
    styleOverrides: {
      root: () => ({
        maxWidth: '28rem',
        height: '100%',
        width: '100%',
        border: `1px solid ${grey300}`,
        borderRadius: borderRadius,
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0),0px 0px 10px 2px rgba(0,0,0,0.1)',
      }),
    },
    variants: [
      {
        props: { variant: 'auth' },
        style: ({ theme }: { theme: Theme }) => ({
          [theme.breakpoints.down('md')]: {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          },
        }),
      },
    ],
  };
}

function getMuiCardContent() {
  return {
    styleOverrides: {
      root: () => ({
        padding: '24px',
      }),
    },
  };
}

function getMuiAlert() {
  return {
    styleOverrides: {
      root: {
        '&.MuiAlert-colorSuccess': {
          borderColor: success,
          backgroundColor: successLight,
        },
        '&.MuiAlert-colorError': {
          backgroundColor: '#FBE5E5',
        },
      },
    },
  };
}

function getMuiIconButton() {
  return {
    styleOverrides: {
      root: {
        color: 'inherit',
      },
    },
  };
}

function getMuiListItemButton() {
  return {
    styleOverrides: {
      root: {
        borderRadius: borderRadius,
      },
    },
  };
}

function getMuiListItemSecondaryAction() {
  return {
    styleOverrides: {
      root: {
        right: 0,
      },
    },
  };
}

function getMuiListItemText() {
  return {
    styleOverrides: {
      root: {
        '& .MuiListItemText-secondary': {
          color: grey600,
          fontSize: 12,
        },
      },
    },
  };
}

function getMuiDivider() {
  return {
    styleOverrides: {
      root: {
        borderColor: grey300,
      },
    },
  };
}

function getMuiDialog() {
  return {
    styleOverrides: {
      root: {
        borderRadius: borderRadius,
        '& .MuiDialog-paper': {
          minWidth: '360px',
        },
        '& .MuiDialogTitle-root': {
          fontSize: `${text * h5}rem`,
          fontWeight: 400,
          padding: '24px 24px 16px',
        },
        '& .MuiDialogActions-root': {
          fontSize: `${text * h5}rem`,
          padding: '0px 24px 12px',
        },
      },
    },
  };
}

function getMuiDrawer() {
  return {
    styleOverrides: {
      paper: {
        boxSizing: 'border-box',
        borderRight: 'none',
        background: 'linear-gradient(25deg, rgb(141, 75, 248) 70%, rgb(0, 76, 151) 90%, rgb(1, 175, 172) 100%)',
        boxShadow: '4px 0px 4px rgba(0, 0, 0, 0.05) !important',
        paddingTop: 16,
      },
      paperAnchorRight: {
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
      },
    },
  };
}

function getMuiTooltip() {
  return {
    styleOverrides: {
      tooltip: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.light,
      }),
    },
  };
}

function getMuiMenuItem() {
  return {
    styleOverrides: {
      root: {
        margin: '4px 8px',
        borderRadius: borderRadius,
        '&:hover': {
          backgroundColor: successLight,
        },
      },
    },
  };
}

function getMuiChip() {
  return {
    styleOverrides: {
      colorSuccess: {
        backgroundColor: `color-mix(in oklab,${success} 10%,transparent)`,
        border: `2px solid ${success}`,
        color: success,
        fontWeight: 600,
      },
      colorDefault: {
        backgroundColor: `color-mix(in oklab,${grey300} 10%,transparent)`,
        border: `2px solid ${grey500}`,
        color: grey600,
        fontWeight: 600,
      },
      colorError: {
        backgroundColor: `color-mix(in oklab,${error} 10%,transparent)`,
        border: `2px solid ${error}`,
        color: error,
        fontWeight: 600,
      },
      colorInfo: {
        backgroundColor: `color-mix(in oklab,${primary} 10%,transparent)`,
        border: `2px solid ${primary}`,
        color: primary,
        fontWeight: 600,
      },
    },
  };
}
