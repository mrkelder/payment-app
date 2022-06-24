import "../styles/globals.css";
import type { AppProps } from "next/app";
import { customTheme } from "../src/theme";
import { ThemeProvider } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
