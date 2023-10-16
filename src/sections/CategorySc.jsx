import React from 'react';
const CategoryCp = React.lazy(() => import('../components/CategoryCp'));

export default function CategorySc() {

  return (
    <>
    <section className='container'>
      <CategoryCp/>
    </section>
    </>
  )
}


