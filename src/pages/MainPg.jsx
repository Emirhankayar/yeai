import React from 'react';
const HeroSc = React.lazy(() => import('../sections/HeroSc'));
const HeadSc = React.lazy(() => import('../sections/HeadSc'));
const PostSc = React.lazy(() => import('../sections/PostSc'));

export default function MainPg() {

  return (
    <>
    <div className='flex flex-col items-center space-y-20'>
      <HeroSc/>
      <HeadSc/>
      <PostSc/>

    </div>
    </>
  )
}


