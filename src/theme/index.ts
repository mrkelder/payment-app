import { createTheme } from "@mui/material";

export const coffeePalette = {
  100: "#ece0d1",
  500: "#634832",
};

export const customTheme = createTheme({
  palette: {
    primary: {
      light: coffeePalette[100],
      main: coffeePalette[500],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: "#fff",
          textTransform: "none",
          backgroundRepeat: "no-repeat",
          background: `linear-gradient(to right, ${theme.palette.primary.main} 60%, ${theme.palette.primary.light})`,
          backgroundPositionX: "0%",
          backgroundSize: "300%",
          transition: "background 1.5s",
          ":hover": {
            backgroundPositionX: "99%",
            backgroundSize: "1500%",
            transition: "background .7s",
          },
          ":disabled": {
            background: theme.palette.grey[300],
          },
        }),
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          boxShadow: "0px 3px 3px -1px #00000054",
          backgroundColor: "transparent",
        },
      },
    },
  },
});
