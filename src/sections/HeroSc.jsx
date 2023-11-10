import React from "react";
const HeroCp = React.lazy(() => import("../components/HeroCp"));

function HeroSc() {
  return (
    <>
      <div className="">
        <HeroCp />
      </div>
    </>
  );
}

export default HeroSc;
