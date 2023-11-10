import React from "react";
const HeroSc = React.lazy(() => import("../sections/HeroSc"));

export default function MainPg() {
  return (
    <>
      <div className="flex flex-col items-center space-y-20">
        <HeroSc />
      </div>
    </>
  );
}
