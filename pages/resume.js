import React from "react";
import { BsDownload } from "react-icons/bs";
import { motion } from "framer-motion";
import Head from 'next/head';

function Resume() {
    return(
        <>
            <Head>
                <title>Resume</title>
                <meta name="description" content="Resume - portfolio" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <motion.main
                initial='pageInitial'
                animate='pageAnimate'
                variants={{
                pageInitial: { opacity: 0 },
                pageAnimate: { opacity: 1 },
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="bg-no-repeat bg-cover bg-center bg-fixed ">
                <div className=" overflow-auto backdrop-blur-3xl font-montserrat flex flex-col pb-12 px-20 pt-32 text-slate-200">
                
                    <div className="unselectable py-12 text-7xl  font-bold">{"Resume"}</div>
                    <div className="py-12 text-2xl">Click one of the links below to get access to my full resume.</div>
                    <div className="pt-12 space-y-7 m-auto">
                        <motion.a
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10, duration: 0.2}}

                        className="unselectable flex space-x-4 text-2xl m-auto p-4 rounded-xl bg-primary hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/50"
                        href="CV_Thomas_MOSER.pdf"
                        alt="cv french"
                        target="_blank"
                        rel="noopener noreferrer">
                            <BsDownload className="m-auto"/>
                            <span>French version</span>
                        </motion.a>
                        <motion.a
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10, duration: 0.2}}
                        className="unselectable flex space-x-4 text-2xl m-auto p-4 rounded-xl bg-primary hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/50"
                        href="Lebenslauf_MOSER.pdf"
                        alt="cv german"
                        target="_blank"
                        rel="noopener noreferrer">
                            
                            <BsDownload className="m-auto"/>
                            <span>German version</span>
                        </motion.a>

                    </div>
                </div>
                
            </motion.main>
        </>
    )
};

export default Resume;