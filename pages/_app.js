import '../styles/globals.css'
import '../styles/nprogress.css';
import Layout from '../components/layout/layout'

import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import { motion } from 'framer-motion';


export default function App({ Component, pageProps }) {
  NProgress.configure({showSpinner:false})
  const router = useRouter()

  useEffect(() => {
      const handleRouteStart = () => NProgress.start();
      const handleRouteDone = () => NProgress.done();
  
      Router.events.on("routeChangeStart", handleRouteStart);
      Router.events.on("routeChangeComplete", handleRouteDone);
      Router.events.on("routeChangeError", handleRouteDone);
  
      return () => {
        // Make sure to remove the event handler on unmount!
        Router.events.off("routeChangeStart", handleRouteStart);
        Router.events.off("routeChangeComplete", handleRouteDone);
        Router.events.off("routeChangeError", handleRouteDone);
      };
    
  }, []);
  
  
  return(
    <>
    <motion.main
        initial='pageInitial'
        animate='pageAnimate'
        variants={{
          pageInitial: { opacity: 0 },
          pageAnimate: { opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
      <div className='bg-[#1a1b1d]'>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet"/>
        
        {router.pathname === "/"? <div></div> : <Layout/>}
        
          <Component {...pageProps}/>
        
        
      </div>
      </motion.main>
          
    </>
    
  )
}
