import useSWR from 'swr'
import React from 'react';
import {BiError} from 'react-icons/bi'
import Image from 'next/image';
import PlayerSkeleton from './DeezerUserSkeleton'

const DeezerUser = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/deezeruser', fetcher);

  return (
    <div>
      {data ? (
        <section className="mb-16">
        <div className="rounded-lg">
          <div className="flex py-6 rounded-md">
            <div className="flex m-auto">
              <div className="w-20 h-20 flex items-center justify-center rounded-lg">
                {data?.deezer.getAvatar ? (
                  <a href={data?.deezer.getprofileUrl} target="_blank" rel='noreferrer noopener'>
                  <Image
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

      ):(
        <PlayerSkeleton/>
      )}
    
    </div>
  );
};

export default DeezerUser;

