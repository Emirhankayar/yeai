import React from 'react';
const PostChatCp = React.lazy(() => import('../components/PostChat'));

export default function PostChatSc() {

  return (
    <>
    <section className='container'>
      <PostChatCp/>
    </section>
    </>
  )
}


