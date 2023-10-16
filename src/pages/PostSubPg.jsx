import React from 'react';
const PostSubSc = React.lazy(() => import('../sections/PostSubSc'));

export default function PostChatPg() {

  return (
    <>
    <div className='flex flex-col items-center space-y-20 mt-96'>
      <PostSubSc/>
    </div>
    </>
  )
}


