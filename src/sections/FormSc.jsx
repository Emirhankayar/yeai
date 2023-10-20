import React from 'react';
const SignUpForm = React.lazy(() => import('../components/FormCp'));

export default function FormSc() {

    return (
        <>
        <div className="">
            <SignUpForm/>
        </div>
    
      </>
      );
    }
    