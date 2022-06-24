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
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";

interface CustomFromData {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  amount: string;
}

interface FormError {
  cardNumber: boolean;
  expirationDate: boolean;
  cvv: boolean;
  amount: boolean;
}

type InputHandler = ChangeEventHandler<HTMLInputElement>;

const defaultFormData: CustomFromData = {
  cardNumber: "",
  expirationDate: "",
  cvv: "",
  amount: "",
};

const defaultFormError: FormError = {
  cardNumber: false,
  expirationDate: false,
  cvv: false,
  amount: false,
};

const Home: NextPage = () => {
  const [formData, setFormData] = useState<CustomFromData>(defaultFormData);
  const [formError, setFormError] = useState<FormError>(defaultFormError);

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

  function changeInputValue(name: keyof CustomFromData): InputHandler {
    return (({ target: { value } }) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }) as InputHandler;
  }

  function changeFormError(name: keyof FormError, value: boolean): void {
    setFormError((prev) => ({ ...prev, [name]: value }));
  }

  function resetFormError(): void {
    setFormError(defaultFormError);
  }

  const submitHandler: FormEventHandler = (event): void => {
    event.preventDefault();

    const { cardNumber, expirationDate, cvv, amount } = formData;

    const isCardNumberValid = /^\d{16}$/g.test(cardNumber);
    const isExpirationDateValid = /^\d{2}\/\d{4}$/g.test(expirationDate);
    const isCvvValid = /^\d{0,3}$/g.test(cvv);
    const isAmountValid = /^\d+$/g.test(amount);

    console.log(isCardNumberValid);

    if (!isCardNumberValid) changeFormError("cardNumber", true);
    if (!isExpirationDateValid) changeFormError("expirationDate", true);
    if (!isCvvValid) changeFormError("cvv", true);
    if (!isAmountValid) changeFormError("amount", true);

    if (
      isCardNumberValid &&
      isExpirationDateValid &&
      isCvvValid &&
      isAmountValid
    ) {
      // fetch
    }
  };

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
          <form onSubmit={submitHandler} onChange={resetFormError}>
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
                    onChange={changeInputValue("cardNumber")}
                    value={formData.cardNumber}
                    error={formError.cardNumber}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={7}>
                  <TextField
                    size="small"
                    inputProps={{ maxLength: 7 }}
                    placeholder="MM/YYYY"
                    onChange={changeInputValue("expirationDate")}
                    value={formData.expirationDate}
                    error={formError.expirationDate}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    size="small"
                    inputProps={{ maxLength: 3 }}
                    placeholder="CVV"
                    onChange={changeInputValue("cvv")}
                    value={formData.cvv}
                    error={formError.cvv}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <TextField
                size="small"
                type="number"
                placeholder="Amount"
                InputProps={{
                  startAdornment: <Typography mr={1}>$</Typography>,
                }}
                onChange={changeInputValue("amount")}
                value={formData.amount}
                error={formError.amount}
                fullWidth
              />

              <Button variant="contained" fullWidth size="large" type="submit">
                Оплатить
              </Button>
            </Stack>
          </form>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default Home;
