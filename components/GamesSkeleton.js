import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from 'react-loading-skeleton';

const GamesSkeleton = () => {
    const loadGames = Array(2).fill(1);
    return (
    <div className='py-10 m-auto '>
        <div className='mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28'>
        {loadGames.map((_, i) => (
            <SkeletonTheme
                baseColor='#484262'
            >
                <div
                    className='group rounded-md bg-opacity-75 duration-150 ease-in-out '
                >
                <div className='border border-white border-opacity-20 rounded-md opacity-80 duration-150 ease-in-out group-hover:opacity-100'>
                    <div className='relative flex h-full items-end rounded-md p-4'>
                        <div className=' rounded-mdl flex flex-col space-y-5'>
                            <Skeleton className='bg-black bg-opacity-80 p-1 text-gray-300' width={300}/>
                            <Skeleton className=' bg-black bg-opacity-80 p-1 text-gray-300' width={250}/>
                        </div>
                    </div>
                </div>
                </div>
            </SkeletonTheme>
            ))
        }
        </div>
    </div>
    )
        
    
  };
  export default GamesSkeleton;