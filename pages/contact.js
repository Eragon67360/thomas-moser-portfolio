import React from "react";
import { BiPhoneCall } from "react-icons/bi";
import { BsEnvelopeFill } from "react-icons/bs";
import {maps} from "../public/maps.jpg"
import Image from "next/image";
import Head from 'next/head';
import { motion } from "framer-motion";
import Link from "next/link";

function Contact() {
    return(
        <>
            <Head>
                <title>Contact</title>
                <meta name="description" content="Contact - portfolio" />
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
                className="overflow-auto backdrop-blur-3xl font-montserrat flex flex-col pb-12 px-4 sm:px-8 md:px-16 lg:px-20 pt-8 sm:pt-16 md:pt-24 lg:pt-32 text-slate-200">
                
                <div className="py-4 sm:py-8 md:py-12 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center sm:text-start font-bold">{"Let's talk"}</div>
                <div className="py-4 sm:py-8 md:py-12 text-lg sm:text-2xl lg:text-4xl text-center sm:text-start font-bold text-slate-300">Feel free to contact me and I will get back to you as soon as I can.</div>
                <div className="mx-auto p-6 xs:block sm:hidden">
                    Access my resume below.
                </div>
                
                <Link className="mx-auto" href={'/resume'}>
                    <div className="mx-auto px-5 py-3 hover:opacity-60 xs:block sm:hidden rounded-lg bg-primary text-white font-bold">
                        Resume
                    </div>
                </Link>

                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-between">
                    <div className="py-6 border rounded-xl flex flex-col my-auto px-6">

                        <span className="text-3xl font-bold">Email</span>

                        <div className="flex">
                            <div className="flex my-auto text-4xl text-yellow-400">
                                <BsEnvelopeFill/>
                            </div>
                            <div className="my-auto text-2xl p-2 text-slate-300 no-underline"><a className='no-underline' href="mailto: thomas-moser@orange.fr">thomas-moser@orange.fr</a></div>
                        </div>
                        
                        <span className="py-6 text-3xl  font-bold">Phone</span>

                        <div className="flex">
                            <div className="flex my-auto text-4xl text-green-600">
                                <BiPhoneCall/>
                            </div>
                            <div className="my-auto text-2xl p-2 text-slate-300 no-underline"><a className='no-underline' href="tel:0033647849308">+33 6 47 84 93 08</a></div>
                        </div>

                    </div>

                    <div className="py-6 border rounded-xl flex flex-col space-y-4 px-6">
                        <div className="text-2xl font-bold">Head quarters xD</div>
                        <div className="text-lg space-y-4">
                            <div>{"2 rue de Munster,"}
                            </div>
                            <div>{"67100 Strasbourg,"}
                            </div>
                            <div>{"Alsace"}
                            </div>
                            <div>{"France"}
                            </div>
                        </div>
                        
                    </div>

                    <div className="my-auto">
                        <a href="http://maps.google.com/?q=2 rue de Munster, 67100 Strasbourg" target="_blank" rel="noopener noreferrer" title="Open map in a new tab">
                            <Image className="border" src={"/maps.jpg"} height={500} width={500} alt="Maps link"/>
                        </a>
                    </div>
                </div>
            </motion.main>
        </>
    )
};

export default Contact;