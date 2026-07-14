import Skeleton from "./Skeleton.jsx";

const MovieCardSkeleton = () => {
  return (
    <div className="movie-card">
      <Skeleton className="w-full aspect-[2/3] rounded-lg" />

      <div className="mt-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <div className="content flex items-center gap-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;