import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-56px)] absolute w-screen">
      <div className="w-9/12 max-w-4xl relative top-5">
        <Skeleton height={58} className="mb-2" />
        <Skeleton height={78} className="mb-2" />
        <Skeleton height={58} className="mb-1" />
        <Skeleton height={36} />
      </div>
    </div>
  );
}
