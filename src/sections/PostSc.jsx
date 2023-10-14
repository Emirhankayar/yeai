import React from 'react';
const PostCp = React.lazy(() => import('../components/PostCp'));

function PostSec() {

    return (
        <>
        <section className="container">
            <PostCp/>
        </section>
    
      </>
      );
    }
    
    export default PostSec;