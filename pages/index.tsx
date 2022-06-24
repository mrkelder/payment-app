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
  useEffect,
  useState,
} from "react";

interface FormError {
  cardNumber: boolean;
  expirationDate: boolean;
  cvv: boolean;
  amount: boolean;
}

type InputHandler = ChangeEventHandler<HTMLInputElement>;

const defaultFormData: PaymentFromData = {
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
  const [formData, setFormData] = useState<PaymentFromData>(defaultFormData);
  const [formError, setFormError] = useState<FormError>(defaultFormError);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const { cardNumber, expirationDate, cvv, amount } = formData;

  const isCardNumberValid = /^\d{16}$/g.test(cardNumber);
  const isExpirationDateValid = /^\d{2}\/\d{4}$/g.test(expirationDate);
  const isCvvValid = /^\d{0,3}$/g.test(cvv);
  const isAmountValid = /^\d+$/g.test(amount);

  const coffeePalette = {
    100: "#ece0d1",
    500: "#634832",
  };

  const formIsValid =
    isCardNumberValid && isExpirationDateValid && isCvvValid && isAmountValid;

  const customTheme = createTheme({
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

  function changeInputValue(name: keyof PaymentFromData) {
    return (({ target: { value } }) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }) as InputHandler;
  }

  function changeFormError(name: keyof FormError, value: boolean): void {
    setFormError((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    setIsSubmitDisabled(!formIsValid);
  }, [formIsValid]);

  const formChangeHandler = () => {
    const isFormErrorDefault =
      JSON.stringify(defaultFormError) === JSON.stringify(formData);

    if (!isFormErrorDefault) setFormError(defaultFormError);
  };

  const submitHandler: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!isCardNumberValid) changeFormError("cardNumber", true);
    if (!isExpirationDateValid) changeFormError("expirationDate", true);
    if (!isCvvValid) changeFormError("cvv", true);
    if (!isAmountValid) changeFormError("amount", true);

    if (formIsValid) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_HOST + "/api/sendPayment",
        { method: "POST", body: JSON.stringify(formData) }
      );

      console.log(response);
    }
  };

  return (
    <>
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
            <form onSubmit={submitHandler} onChange={formChangeHandler}>
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
                    startAdornment: <Typography mr={1}>☕</Typography>,
                  }}
                  onChange={changeInputValue("amount")}
                  value={formData.amount}
                  error={formError.amount}
                  fullWidth
                />

                <Button
                  variant="contained"
                  disabled={isSubmitDisabled}
                  fullWidth
                  size="large"
                  type="submit"
                >
                  Оплатить
                </Button>
              </Stack>
            </form>
          </Box>
        </main>
      </ThemeProvider>

      <style jsx>{`
        main {
          height: 100vh;
          background: linear-gradient(
            to top right,
            ${coffeePalette[100]},
            ${coffeePalette[500]}
          );
          background-repeat: no-repeat;
        }
      `}</style>
    </>
  );
};

export default Home;
