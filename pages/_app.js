import '../styles/globals.css'
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react'
import {motion, AnimatePresence} from "framer-motion"

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
  <AnimatePresence mode='wait'>
    <motion.div 
      key={router.roteu}
      initial="initialState"
      animate="animateState"
      exit="exitState"
      transition={{
        duration: 0.75,
      }}
      variants={{
        initialState:{
          opacity: 0,
        },
        animateState: {
          opacity: 1,
        },
        exitState: {

        },
      }}
      className='base-page-size'>
      <Loading/>
      <Component {...pageProps} />
    </motion.div>

    

  </AnimatePresence>

    
  </>)
}

export default MyApp
