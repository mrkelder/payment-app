import type { NextPage } from "next";
import Head from "next/head";

import {
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  Stack,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const Home: NextPage = () => {
  const customTheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            backgroundRepeat: "no-repeat",
            background:
              "linear-gradient(to right, var(--cyan) 60%, var(--blue))",
            backgroundPositionX: "0%",
            backgroundSize: "300%",
            transition: "1s",
            ":hover": {
              backgroundPositionX: "100%",
              backgroundSize: "1500%",
              transition: "1s",
            },
          },
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

  return (
    <ThemeProvider theme={customTheme}>
      <Head>
        <title>Confirm your payment</title>
      </Head>

      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Stack bgcolor="white" spacing={2} p={2.5} mx={2} maxWidth={350}>
            <Typography
              variant="h1"
              fontSize={24}
              fontWeight="bold"
              fontStyle="italic"
              textAlign="center"
            >
              Payment
            </Typography>

            <Grid
              container
              rowSpacing={1.5}
              justifyContent="space-between"
              my={2}
            >
              <Grid item xs={12}>
                <TextField
                  size="small"
                  inputProps={{ maxLength: 16 }}
                  placeholder="Card Number"
                  fullWidth
                />
              </Grid>

              <Grid item xs={7}>
                <TextField
                  size="small"
                  inputProps={{ maxLength: 7 }}
                  placeholder="MM/YYYY"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  size="small"
                  inputProps={{ maxLength: 3 }}
                  placeholder="CVV"
                  fullWidth
                />
              </Grid>
            </Grid>

            <TextField
              size="small"
              type="number"
              placeholder="Amount"
              InputProps={{ startAdornment: <Typography mr={1}>$</Typography> }}
              fullWidth
            />

            <Button variant="contained" fullWidth size="large">
              Оплатить
            </Button>
          </Stack>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default Home;
