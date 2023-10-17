import React from 'react';
const SubCategoryCp = React.lazy(() => import('../components/SubCategoryCp'));

export default function SubCategorySc() {

  return (
    <>
    <section className='container'>
      <SubCategoryCp/>
    </section>
    </>
  )
}


