import React from 'react';
const HeadCp = React.lazy(() => import('../components/HeadCp'));

function PostSec() {

    return (
        <>
        <section className="container">
            <HeadCp/>
        </section>
    
      </>
      );
    }
    
    export default PostSec;