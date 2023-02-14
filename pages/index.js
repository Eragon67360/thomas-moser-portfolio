import React, { useState, useEffect, useMemo  } from "react";
import Link from "next/link";
import Head from 'next/head';
import { motion } from "framer-motion";
import NoSsr from "../components/NoSsr";
import Script from 'next/script'



export default function Home(){

  const quotes = {
    "quote1" : {
      line1: "“One of the best programming skills you can have",
      line2: "is knowing when to walk away for a while.”",
      line3: "Oscar Godson",
    },
    "quote2" : {
      line1: "“We build our computer (systems) the way we build our cities:",
      line2: "over time, without a plan, on top of ruins.”",
      line3: "Ellen Ullman",
    },
    "quote3" : {
      line1: "“Every great developer you know got there by solving problems ",
      line2: "they were unqualified to solve until they actually did it.”",
      line3: "Patrick McKenzie",
    },
    "quote4" : {
      line1: "“Rules of Optimization: Rule 1: Don’t do it. ",
      line2: "Rule 2 (for experts only): Don’t do it yet.”",
      line3: "Michael A. Jackson",
    },
    "quote5" : {
      line1: "“No one in the brief history of computing has ever written a piece of perfect software.",
      line2: "It’s unlikely that you’ll be the first.”",
      line3: "Andy Hunt",
    },
    "quote6" : {
      line1: "“It’s hard enough to find an error in your code when you’re looking for it;",
      line2: "it’s even harder when you’ve assumed your code is error-free.”",
      line3: "Steve McConnell",
    },
    "quote7" : {
      line1: "“The first 90% of the code accounts for the first 90% of the development time. ",
      line2: "The remaining 10% of the code accounts for the other 90% of the development time.”",
      line3: "Tom Cargill",
    },
    "quote8": {
      line1: "“Good code is its own best documentation. As you’re about to add a comment, ask yourself, “How can I improve the code so that this comment isn’t needed?”",
      line2: "Improve the code and then document it to make it even clearer.”",
      line3: "Steve McConnell",
    },
    "quote9" : {
      line1: "“One of my most productive days",
      line2: "was throwing away 1000 lines of code.”",
      line3: "Ken Thompson",
    },
    "quote10" : {
      line1: "“The computer was born to solve problems that did not exist before.”",
      line2: "Bill Gates ",
      line3: "", 
    }
  }

  //variants
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  }
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  var min = Math.ceil(1);
  var max = Math.floor(11);
  var state = Math.floor(Math.random() * (max - min) + min);
  console.log(state);

  const [randomNumber, setRandomNumber] = useState(state);
  console.log(randomNumber);
  // // Get random number
  // useEffect(() => {
  //   const fetchData = async () => {
      
  //   };
  //   fetchData();
    
  // }, []);
  

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Thomas Moser Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div
        data-mdb-ripple="true"
        className=" p-5 text-center flex flex-col h-screen bg-black bg-no-repeat bg-cover bg-center bg-fixed backdrop-filter brightness-100"        
      >
        <div className="m-auto">
          <div className=" d-flex justify-content-center  align-items-center h-100 ">
            <div className=" text-white brightness-100">

              <motion.div 
              initial={{WebkitTextStroke: "0px white"}}
              animate={{WebkitTextStroke: "1px white"}}
              transition={{duration: 2, delay: 0.6}}
              id="port" href="" className="unselectable mb-1 md:mb-3 py-5 md:py-10 font-extrabold text">Portfolio</motion.div>
              <div className="m-auto">
                <motion.h3
                  className="text-2xl justify-start text-start px-6 pb-10"
                  variants={sentence}
                  initial="hidden"
                  animate="visible">
                  {quotes[`quote${randomNumber}`].line1. split("") .map((char,index) => {
                  return (
                    <motion.span className="font-montserrat italic" key={char + "—" + index} variants={letter}>
                      {char}
                    </motion.span>
                  )
                  })}
                  <br/>

                  {quotes[`quote${randomNumber}`].line2. split("") .map((char,index) => {
                  return (
                    <motion.span className="font-montserrat italic" key={char + "—" + index} variants={letter}>
                      {char}
                    </motion.span>
                  )
                  })}
                  <br/>
                  {quotes[`quote${randomNumber}`].line3. split("") .map((char,index) => {
                  return (
                    <motion.span className="font-montserrat font-bold" key={char + "—" + index} variants={letter}>
                      {char}
                    </motion.span>
                  )
                  })}                

                </motion.h3>

              </div>

              
              <motion.div
                initial={{display: "hidden"}}
                animate={{}}
                transition={{duration: 2, delay: 1}}

                className="flex py-5 justify-center items-center">
                <Link type="button"
                  href="/home"
                  passHref
                  className="px-6 md:text-md lg:text-xl py-2 border-2 mx-2 bg-white border-white text-black font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:text-white hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light">
                  Get started
                </Link>
                

              </motion.div>
              

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
