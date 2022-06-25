import { FC } from "react";

import { Button, Box, TextField, Grid, Typography, Stack } from "@mui/material";

import type { InputHandler, FormError } from "./Form";

interface Props {
  submitHandler: InputHandler;
  formChangeHandler: () => void;
  changeInputValue: (name: keyof PaymentFromData) => InputHandler;
  isSubmitDisabled: boolean;
  formData: PaymentFromData;
  formError: FormError;
}

const View: FC<Props> = ({
  submitHandler,
  formChangeHandler,
  changeInputValue,
  formData,
  formError,
  isSubmitDisabled,
}) => {
  return (
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
            Заказ
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
  );
};

export default View;
