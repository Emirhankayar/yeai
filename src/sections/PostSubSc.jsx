import React from 'react';
const PostSubCp = React.lazy(() => import('../components/PostSubCp'));

export default function PostChatSc() {

  return (
    <>
    <section className='container'>
      <PostSubCp/>
    </section>
    </>
  )
}


