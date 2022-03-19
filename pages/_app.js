import '../styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './component/Navbar'
import Footer from './component/Footer'


function MyApp({ Component, pageProps }) {
  return (
  <> 
  <CssBaseline />
  <Navbar/>
    <Component {...pageProps} />
  <Footer/>
  </>
  )
}

export default MyApp
