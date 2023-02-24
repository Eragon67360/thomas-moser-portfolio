import Head from 'next/head'
import Link from 'next/link'
import React, { useState  } from "react";
import { motion } from "framer-motion";
import { IndexName } from "../components/layout/index_name";

export default function Home() {
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
    },
    "quote11" : {
      line1: "“If you have knowledge,",
      line2: "let others light their candles in it.”",
      line3: "Margareth Fuller", 
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
  var size = Object.keys(quotes).length;
  var min = Math.ceil(1);
  var max = Math.floor(size+1);
  var state = Math.floor(Math.random() * (max - min) + min);

  const [randomNumber, setRandomNumber] = useState(state);

  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Landing page - portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='py-6 h-screen flex flex-col'>
        <div className='my-auto'>
        <div className="flex flex-col">
            <IndexName/>
            <div className="d-flex justify-content-center align-items-center">
              <div className="text-white">

                <motion.div                  
                  id="port"
                  href=""
                  className=" unselectable text-center mb-1 md:mb-3 py-5 md:py-10 text-[12vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-primary animate-pulse transition-all duration-500">
                    Portfolio
                </motion.div>
                <div className="m-auto">
                  <motion.h3
                    className="text-[2vw] justify-center text-center px-6 pb-10 transition-all duration-500"
                    variants={sentence}
                    initial="hidden"
                    animate="visible">
                    {quotes[`quote${randomNumber}`].line1. split("") .map((char,index) => {
                    return (
                      <motion.span className="italic" key={char + "—" + index} variants={letter}>
                        {char}
                      </motion.span>
                    )
                    })}
                    <br/>

                    {quotes[`quote${randomNumber}`].line2. split("") .map((char,index) => {
                    return (
                      <motion.span className="italic" key={char + "—" + index} variants={letter}>
                        {char}
                      </motion.span>
                    )
                    })}
                    <br/>
                    {quotes[`quote${randomNumber}`].line3. split("") .map((char,index) => {
                    return (
                      <motion.span className="font-bold" key={char + "—" + index} variants={letter}>
                        {char}
                      </motion.span>
                    )
                    })}                

                  </motion.h3>

                </div>
              </div>
            </div>
          </div>

          <motion.div
                  initial={{ opacity: 0}}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1,
                                delay: 3 }}
                  className="flex py-5">
                  
                  <Link
                    
                    type="button"
                    href="/home"
                    passHref
                    className=" group scale-100 relative m-auto flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg bg-gradient-to-br from-purple-800 to-primary transition-scale ease-in-out duration-300 bganimation hover:scale-125 hover:text-white text-white hover:shadow-lg hover:shadow-primary active:brightness-50">
                    <span className="transition-all duration-500 md:text-md lg:text-xl uppercase relative px-5 py-2.5 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Get started
                    </span>
                  </Link>
                  

          </motion.div>

        </div>
          
        

      </main>
      
    </>
  )
}
