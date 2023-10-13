import React from 'react';

const PostItem = ({ post }) => {
    return (
        <div className="post-item">
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <p>{post.description}</p>
        </div>
    );
};

export default PostItem;
