import '../styles/globals.css'
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react'
import {motion, AnimatePresence} from "framer-motion"
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const handleStart = (url) => (url !== router.asPath) && setLoading(true);
      const handleComplete = () => setLoading(false);

      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeEnd',  handleComplete)

      return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleComplete)
          router.events.off('routeChangeEnd', handleComplete)
      }
  })
  
  return loading && (<div className='spinner-wrapper'>
    <div className="spinner"></div></div>)
}
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  return (
  <>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet"/>

    <div
      key={router.route}      
      
      className='base-page-size'>
        <Loading/>
      <Component {...pageProps} />
      </div>
    
  </>)
}

export default MyApp
