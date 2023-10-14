import React from 'react';
const PostSc = React.lazy(() => import('../sections/PostSc'));

export default function MainPg() {

  return (
    <>
    <div>
      <PostSc/>

    </div>
    </>
  )
}


