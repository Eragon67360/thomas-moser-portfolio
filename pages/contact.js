import React from "react";
import { BiPhoneCall } from "react-icons/bi";
import { BsEnvelopeFill } from "react-icons/bs";
import {maps} from "../public/maps.jpg"
import Image from "next/image";
import Head from 'next/head';

function Contact() {
    return(
        <>
            <Head>
                <title>Contact</title>
                <meta name="description" content="Contact - portfolio" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="font-montserrat flex flex-col px-20 pt-32 text-slate-200">
                <div className="py-12 text-7xl  font-bold">{"Let's talk"}</div>
                <div className="py-12 text-2xl ">Feel free to contact me and I will get back to you as soon as I can.</div>
                <div className="py-12 flex justify-between">
                    <div className="flex flex-col my-auto">

                        <span className="py-6 text-3xl font-bold">Email</span>

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

                    <div className="my-auto flex flex-col space-y-4">
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
            </div>
        </>
    )
};

export default Contact;