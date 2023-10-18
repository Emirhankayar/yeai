import React from 'react';
const CategorySc = React.lazy(() => import('../sections/CategorySc'));

export default function CategoryPg() {

  return (
    <>
    <div className='flex flex-col items-center mt-40'>
      <CategorySc/>
    </div>
    </>
  )
}


