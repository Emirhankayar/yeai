import React from "react";

export function SkeletonPost() {
    return (
        <div className="container mx-auto animate-pulse bg-gray-900 p-10 rounded-lg">


            <div className="space-y-8">
                <div className="bg-gray-300 rounded-full h-2 w-28"></div>
                <div className="space-y-5">
                    <div className="bg-gray-300 rounded-full h-2 w-full"></div>
                    <div className="bg-gray-300 rounded-full h-2 w-4/5"></div>
                    <div className="bg-gray-300 rounded-full h-2 w-2/5"></div>
                </div>
                <div className="flex flex-row items-start gap-4">
                <div className="bg-gray-300 rounded-md h-7 w-28"></div>
                <div className="bg-gray-300 rounded-md h-7 w-28"></div>

                </div>
            </div>
        </div>
    );
}
export function SkeletonCategory() {
    return (
        <div className="container mx-auto mx-auto animate-pulse bg-gray-900 p-8 rounded-lg">


            <div className="space-y-10 flex flex-col items-center">
                <div className="bg-gray-300 rounded-full h-4 w-20"></div>

                    <div className="bg-gray-300 rounded-md  h-8 w-28"></div>

            </div>
        </div>
    );
}

export default { SkeletonPost }