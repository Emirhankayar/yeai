import React from "react";
const NewsCp = React.lazy(() => import("../components/NewsCp"));

export default function CategorySc() {
  return (
    <>
      <section className="container">
        <NewsCp />
      </section>
    </>
  );
}
