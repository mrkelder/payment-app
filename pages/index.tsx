import { useState, useEffect } from "react";

import type { NextPage } from "next";
import Head from "next/head";

import { coffeePalette } from "../src/theme";
import Form from "../src/components/Form";
import ResponseDialog from "../src/components/ResponseDialog";

const defaultResponseState: ResponseState = {
  shouldShowDialog: false,
  requestId: "",
  amount: 0,
};

const Home: NextPage = () => {
  const [response, setResponse] = useState<ResponseState>(defaultResponseState);

  useEffect(() => {
    const successfulResponseHandler = ((event: CustomEvent<ResponseState>) => {
      setResponse(event.detail);
    }) as EventListener;

    const closeDialogHandler = () => {
      setResponse((prev) => ({ ...prev, shouldShowDialog: false }));
    };

    addEventListener("successful_response", successfulResponseHandler);
    addEventListener("close_dialog", closeDialogHandler);

    return () => {
      removeEventListener("successful_response", successfulResponseHandler);
      removeEventListener("close_dialog", closeDialogHandler);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Заказ кофе</title>
      </Head>

      <main>
        <Form />
      </main>

      <ResponseDialog response={response} />

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
