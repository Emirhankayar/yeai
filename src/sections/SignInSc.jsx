import React from "react";
const SignInFormPage = React.lazy(() => import("../components/SignInCp"));

export default function AccountSc() {
  return (
    <>
      <section className="container">
        <SignInFormPage />
      </section>
    </>
  );
}
