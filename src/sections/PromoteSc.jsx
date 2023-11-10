import React from "react";
const PromoteCp = React.lazy(() => import("../components/PromoteCp"));

function PromoteSc() {
  return (
    <>
      <div className="container">
        <PromoteCp />
      </div>
    </>
  );
}

export default PromoteSc;
