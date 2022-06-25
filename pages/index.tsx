import type { NextPage } from "next";
import Head from "next/head";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { useState, useCallback, useEffect } from "react";

import { coffeePalette } from "../src/theme";
import Form from "../src/components/Form";

interface ResponseState extends ResponseData {
  shouldShowDialog: boolean;
}

const defaultResponseState: ResponseState = {
  shouldShowDialog: false,
  requestId: "",
  amount: 0,
};

const Home: NextPage = () => {
  const [response, setResponse] = useState<ResponseState>(defaultResponseState);

  useEffect(() => {
    const successfulResponseHandler = (event: CustomEvent<ResponseState>) => {
      setResponse(event.detail);
    };

    addEventListener("successful_response", successfulResponseHandler);

    return () => {
      removeEventListener("successful_response", successfulResponseHandler);
    };
  }, []);

  const closeDialog = useCallback(() => {
    setResponse((prev) => ({ ...prev, shouldShowDialog: false }));
  }, []);

  return (
    <>
      <Head>
        <title>Заказ кофе</title>
      </Head>

      <main>
        <Form />
      </main>

      <Dialog open={response.shouldShowDialog} onClose={closeDialog}>
        <DialogTitle id="alert-dialog-title">Информация о заказе</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Id Вашего заказа: {response.requestId}
          </DialogContentText>
          <DialogContentText>
            Количество заказанных чашек кофе: {response.amount} ☕
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Ок</Button>
        </DialogActions>
      </Dialog>

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
