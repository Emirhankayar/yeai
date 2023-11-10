import React from "react";
const PromoteSc = React.lazy(() => import("../sections/PromoteSc"));

export default function PromotePg() {
  return (
    <>
      <div className="flex flex-col items-center mt-40">
        <PromoteSc />
      </div>
    </>
  );
}
