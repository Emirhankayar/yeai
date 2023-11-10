import React from "react";
const AccountCp = React.lazy(() => import("../components/AccountCp"));

export default function AccountSc() {
  return (
    <>
      <section className="container">
        <AccountCp />
      </section>
    </>
  );
}
