import useSWR from 'swr'
import React from 'react';
import {BiError} from 'react-icons/bi'
import Image from 'next/image';

const DeezerUser = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/deezeruser', fetcher);

  if(data){
    return (
      <>
      <section className="mb-16 container">
        <div className="rounded-lg items-center border border-white border-opacity-10">
          <div className="flex py-6 my-auto rounded-md">
            <div className="flex my-auto ml-5 mr-4">
              <div className="w-20 h-20 flex items-center justify-center rounded-lg">
                {data?.deezer.getAvatar ? (
                  <a href={data?.deezer.getprofileUrl} target="_blank" rel='noreferrer noopener'>
                  <img
                    className="rounded-lg"
                    src={data?.deezer.getAvatar}
                    width={100}
                    height={100}
                    alt="deezer profil picture"/>
                  
                  </a>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="my-auto ml-3">
                <p className="text-md sm:text-xl text-white">
                  {data?.deezer.getPersonName ? data?.deezer.getPersonName : "~"}
                  <div className="text-md sm:text-lg text-white font-semibold">
                      <p>{data?.deezer.getStatus ? data?.deezer.getStatus : "-"}</p>                    
                  </div>
                </p>
              </div>
              
              
            </div>
          </div>
        </div>
      </section>
      </>
    );

  } else {
    return (
      <section>
        <div className='text-2xl flex flex-wrap gap-12 py-10'>
          <div className=''><BiError/></div>
          <h1 className=''>{"Sorry, an error occured. We couldn't fetch the Deezer user informations!"}</h1>
        </div>
        
      </section>
    );
  }
};

export default DeezerUser;

