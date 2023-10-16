import React from 'react';
const PostChatSc = React.lazy(() => import('../sections/PostChatSc'));

export default function PostChatPg() {

  return (
    <>
    <div className='flex flex-col items-center space-y-20 mt-96'>
      <PostChatSc/>
    </div>
    </>
  )
}


