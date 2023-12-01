export function SkeletonPost() {
  return (
    <div className="container mx-auto w-full">
      <div className="animate-pulse">

      <div className="w-full h-80 lg:!max-h-[13rem] md:max-h-[20rem] bg-gradient-to-tr from-gray-600 border border-gray-600 to-gray-900 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
}

export default { SkeletonPost };
