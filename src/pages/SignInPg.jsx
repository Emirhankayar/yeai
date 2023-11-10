import React from "react";
const SignInSc = React.lazy(() => import("../sections/SignInSc"));

export default function FormPg() {
  return (
    <>
      <div className="flex flex-col items-center mt-40">
        <SignInSc />
      </div>
    </>
  );
}
