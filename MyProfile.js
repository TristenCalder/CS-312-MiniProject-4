import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './myprofile.css';

// Profile data
const MyProfile = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);

    // Get the user data
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('/api/profile');
                setUser(response.data);
            } catch (error) {
                setError(true);
            }
        };
        fetchProfileData();
    }, []);

    // Debugging (DELETE BEFORE SUBMITTING)
    if (error) {
        return <div>Failed to load profile data.</div>;
    }

    // Display the info
    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            <div className="profile-info">
                <p><strong>Username:</strong> {user.name || 'N/A'}</p>
                <p><strong>Age:</strong> {user.age || 'N/A'}</p>
                <p><strong>Occupation:</strong> {user.occupation || 'N/A'}</p>
                <p><strong>City:</strong> {user.city || 'N/A'}</p>
            </div>

            <h3>My Posts</h3>
            <div className="profile-posts">
                {user.posts && user.posts.length > 0 ? (
                    user.posts.map(post => (
                        <div key={post.blog_id} className="profile-post">
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts to show.</p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
