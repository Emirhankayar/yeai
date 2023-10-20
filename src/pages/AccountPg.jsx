import React from 'react';
const AccountSc = React.lazy(() => import('../sections/AccountSc'));

export default function AccountPg() {

  return (
    <>
    <div className='flex flex-col items-center mt-40'>
      <AccountSc/>
    </div>
    </>
  )
}


