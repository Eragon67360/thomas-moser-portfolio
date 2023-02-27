import useSWR from 'swr'
import React from 'react';
import {BiError} from 'react-icons/bi'
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Player = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/playersummaries', fetcher);
  
  // if (data){
    return (
      <section className="mb-16 container">
        <div className="rounded-lg">
          <div className="flex py-6 rounded-md">
            <div className="flex m-auto">
              <div className="w-20 h-20 flex items-center justify-center rounded-lg">
                {data?.steam.getAvatar ? (
                  <img
                    className="rounded-lg"
                    src={data?.steam.getAvatar}
                    width={100}
                    height={100}
                    alt="steam profil picture"
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <div className="my-auto ml-3">
                <p className="text-md sm:text-xl text-white">
                  {data?.steam.getPersonName ? data?.steam.getPersonName : "~"}
                  <div className="text-md sm:text-lg text-white font-semibold">
                    {data?.steam.getGames === false ? (
                      <p>{data?.steam.getStatus ? data?.steam.getStatus : "-"}</p>
                    ) : (
                      <p className="text-white font-normal">{data?.steam.getGames}</p>
                    )}
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  // }
  // else{
  //   return (
  //     <section className="mb-16 container">
  //       <div className="rounded-lg">
  //         <div className="flex py-6 rounded-md">
  //           <div className="flex m-auto">
  //             <div className="w-20 h-20 flex items-center justify-center rounded-lg">                
  //                 <Skeleton
  //                   className="rounded-lg"
  //                   width={100}
  //                   height={100}
  //                 />
  //               </div>
  //             <div className="my-auto ml-3">
  //               <p className="text-md sm:text-xl text-white">
  //                 {data?.steam.getPersonName ? data?.steam.getPersonName : "~"}
  //                 <div className="text-md sm:text-lg text-white font-semibold">
                    
  //                     <Skeleton/>
  //                 </div>
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
    // );

  // }
  
};

export default Player;

