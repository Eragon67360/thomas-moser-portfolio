import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from 'react-loading-skeleton';

const DeezerHistorySkeleton = () => {
    const loadGames = Array(12).fill(1);
    return (
    <section className="mb-16 m-0 md:m-auto container border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SkeletonTheme baseColor="#50545b">
            {loadGames.map((_, index) => (
            <div key={index} className="rounded-lg items-center border border-white border-opacity-10">
            <div className="flex py-6 my-auto rounded-md">
            
                <div className="flex my-auto ml-8 mr-4">
                <div className="w-20 h-20 flex items-center justify-center rounded-lg">
                    <div className="mx-5">
                    <Skeleton
                        className="rounded-lg"
                        width={100}
                        height={100}
                    />
                    </div>
                    
                </div>
                <div className="my-auto ml-10">
                    <p className="text-md sm:text-xl text-white space-y-4 flex flex-col">
                        <Skeleton width={200} height={24}/>
                        <Skeleton width={150} height={24}/>
                        
                    </p>
                </div>
                </div>
            
            </div>
            </div>
            ))}
        </SkeletonTheme>
    </section>
    )        
    
  };
  export default DeezerHistorySkeleton;