export function SkeletonPost() {
  return (
    <div className="lg:flex-row  flex-col lg:items-between gap-10 flex place-self-center w-full animate-pulse mt-0 bg-gray-900 p-10 rounded-lg max-w-[900px]">
      <div className="flex-grow space-y-6 w-full">
        <div className="flex items-center max-w-3xl justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gray-300 rounded-full h-3 w-3"></div>
            <div className="bg-gray-300 rounded-full h-2 w-28"></div>
          </div>
          <div className="flex items-center gap-4 justify-end">
            <div className="bg-gray-300 rounded-md h-8 w-8 lg:hidden block"></div>
            <div className="bg-gray-300 rounded-md h-8 w-8 lg:hidden block"></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-300 rounded-full h-2 w-full"></div>
          <div className="bg-gray-300 rounded-full h-2 w-4/5"></div>
          <div className="bg-gray-300 rounded-full h-2 w-2/5"></div>
        </div>
      </div>
      <div className="flex-grow space-y-5">
        <div className="flex gap-2 items-center">
          <div className="bg-gray-300 rounded-full h-3 w-3"></div>
          <div className="bg-gray-300 rounded-full h-1 w-28"></div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-gray-300 rounded-full h-3 w-3"></div>
          <div className="bg-gray-300 rounded-full h-1 w-28"></div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-gray-300 rounded-full h-3 w-3"></div>
          <div className="bg-gray-300 rounded-full h-1 w-28"></div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-gray-300 rounded-full h-3 w-3"></div>
          <div className="bg-gray-300 rounded-full h-1 w-28"></div>
        </div>
      </div>
      <div className="flex-grow space-y-4 hidden lg:block">
        <div className="flex gap-2 items-center">
          <div className="bg-gray-300 rounded-md h-8 w-8"></div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-gray-300 rounded-md h-8 w-8"></div>
        </div>
      </div>
    </div>
  );
}

export default { SkeletonPost };
