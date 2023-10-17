import React from 'react';
const SubCategorySc = React.lazy(() => import('../sections/SubCategorySc'));

export default function PostChatPg() {

  return (
    <>
    <div className='flex flex-col items-center space-y-20 mt-96'>
      <SubCategorySc/>
    </div>
    </>
  )
}


