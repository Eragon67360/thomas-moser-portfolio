import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GamesSkeleton = ({ amount }) => {
    const loadGames = Array(amount).fill(1);
    return loadGames.map((_, i) => (
      <div className="" key={i}>
        <div>
          <Skeleton circle width={60} height={60} />
        </div>
        <div>
          <Skeleton count={5} />
        </div>
      </div>
    ));
  };
  export default GamesSkeleton;