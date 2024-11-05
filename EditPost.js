import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import './editpost.css';

// Form stuff
const EditPost = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: ''
    });

    // Get the post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
                setFormData({
                    title: response.data.title,
                    content: response.data.body,
                    category: response.data.category,
                });
            } catch (error) {
                alert('FAIL');
            }
        };

        fetchPost();
    }, [id]);

    // Form logic
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/posts/${id}`, {
                title: formData.title,
                content: formData.content,
                category: formData.category,
            });
            navigate('/posts');
        } catch (error) {
            console.error('Error updating post:', error.response || error.message);
            alert('FAIL');
        }
    };


    // Form to intake data
    return (
        <div className="edit-form-container">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" onChange={handleChange}
                       value={formData.title} required/>

                <label>Content:</label>
                <textarea name="content" onChange={handleChange}
                          value={formData.content} required/>

                <label>Category:</label>
                <select name="category" onChange={handleChange}
                        value={formData.category} required>
                    <option value="Web Programming">Web Programming</option>
                    <option value="Other Programming">Other Programming</option>
                    <option value="Other">Other</option>
                </select>

                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
