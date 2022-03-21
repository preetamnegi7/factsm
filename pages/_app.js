import "../styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-B8L3L9LGLY`}
      />

      <Script strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-B8L3L9LGLY', {
    page_path: window.location.pathname,
  });
      `}
      </Script>
      <CssBaseline />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
