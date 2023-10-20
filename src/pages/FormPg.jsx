import React from 'react';
const FormSc = React.lazy(() => import('../sections/FormSc'));

export default function FormPg() {

  return (
    <>
    <div className='flex flex-col items-center mt-40'>
      <FormSc/>
    </div>
    </>
  )
}


