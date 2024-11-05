import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BlogPostForm from './BlogPostForm';
import './postlist.css';

// Post list stuff
const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // Get all posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsResponse = await axios.get('/api/posts');
                setPosts(postsResponse.data);
            } catch {
                alert('FAIL');
            }
        };

        // Get the user data
        const fetchUser = async () => {
            try {
                const userResponse = await axios.get('/api/current-user');
                setCurrentUser(userResponse.data);
            } catch {
                alert('FAIL');
            }
        };

        fetchPosts();
        fetchUser();
    }, []);

    // Delete post
    const handleDelete = async (id) => {
        try {
            await axios.post(`/api/delete-post/${id}`);
            setPosts(posts.filter(post => post.blog_id !== id));
        } catch {
            alert('FAIL');
        }
    };

    // Edit post
    const handleEdit = (id) => {
        window.location.href = `/edit/${id}`;
    };

    // ADd new post
    const addNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    // Display the posts
    return (
        <div className="post-list-container">
            <h2>All Posts</h2>
            <div className="postForm-wrapper">
                <BlogPostForm onPostCreated={addNewPost}/>
            </div>
            <div className="posts">
                {posts.map(post => (
                    <div key={post.blog_id} className="post">
                        <h3>{post.title}</h3>
                        <p>by {post.creator_name} on {new Date(post.date_created).toLocaleDateString()}</p>
                        <p>{post.body}</p>
                        <p>Category: {post.category}</p>

                        {currentUser && currentUser.user_id === post.creator_user_id && (
                            <div className="post-action-buttons">
                                <button onClick={() => handleEdit(post.blog_id)}
                                        className="edit-button">Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(post.blog_id)}
                                    className="delete-button">Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
