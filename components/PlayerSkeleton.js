import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from 'react-loading-skeleton';

const PlayerSkeleton = () => {
    return (
    <section className="mb-16 container m-auto">
        <SkeletonTheme baseColor="#484262">
            <div className="rounded-lg">
            <div className="flex py-6 rounded-md">
                <div className="flex m-auto">
                <div className="w-20 h-20 flex items-center justify-center rounded-lg">
                    <Skeleton
                        className="rounded-lg"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="my-auto ml-10 flex flex-col space-y-2">
                    <Skeleton width={150} height={24}/>                    
                    <Skeleton width={100} height={24}/>                   
                </div>
                </div>
            </div>
            </div>
        </SkeletonTheme>
    </section>
    )
        
    
  };
  export default PlayerSkeleton;