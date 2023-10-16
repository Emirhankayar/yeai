import React from "react";

export function SkeletonPost() {
    return (
        <div className="container mx-auto space-y-10 mx-auto animate-pulse z-0">


            <div className="space-y-10">
                <div className="bg-gray-300 rounded-full h-4 w-1/5"></div>
                <div className="space-y-5">
                    <div className="bg-gray-300 rounded-full h-4 w-full"></div>
                    <div className="bg-gray-300 rounded-full h-4 w-4/5"></div>
                    <div className="bg-gray-300 rounded-full h-4 w-2/5"></div>
                </div>
                <div className="bg-gray-300 rounded-full h-4 w-1/6"></div>
                <div className="space-y-5">

                    <div className="bg-gray-300 rounded-full h-4 w-full"></div>
                    <div className="bg-gray-300 rounded-full h-4 w-4/5"></div>
                    <div className="bg-gray-300 rounded-full h-4 w-2/5"></div>
                </div>
                <div className="bg-gray-300 rounded-full h-4 w-1/6"></div>
                <div className="space-y-5">
                    <div className="bg-gray-300 rounded-full h-4 w-3/5"></div>
                    <div className="bg-gray-300 rounded-full h-4 w-2/5"></div>
                    <div className="bg-gray-300 rounded-full h-4 w-1/5"></div>

                </div>
                <div className="bg-gray-300 rounded-full h-4 w-1/6"></div>
                <ul className="space-y-5">
                    <div className="bg-gray-300 rounded-full h-4 w-2/5"></div>
                    <div className="bg-gray-300 rounded-full h-4 w-1/5"></div>

                </ul>
            </div>
        </div>
    );
}

export default { SkeletonPost }