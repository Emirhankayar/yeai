import React from "react";
const NewsSc = React.lazy(() => import("../sections/NewsSc"));

export default function CategoryPg() {
  return (
    <>
      <div className="flex flex-col items-center mt-40">
        <NewsSc />
      </div>
    </>
  );
}
