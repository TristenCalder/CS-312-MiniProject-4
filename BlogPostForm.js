import React, {useState} from 'react';
import axios from 'axios';
import './blogpostform.css';

// Form stuff
const BlogPostForm = ({onPostCreated}) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: ''
    });

    // Form logic
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Form submission logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/create-post', formData);
            onPostCreated(response.data);
            setFormData({title: '', content: '', category: ''});
        } catch (error) {
            alert('FAIL');
        }
    };

    // Form to intake data
    return (
        <div className="postForm-container">
            <div className="postForm">
                <h2>Create Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" name="title" onChange={handleChange}
                               value={formData.title} required/>
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <textarea name="content" onChange={handleChange}
                                  value={formData.content} required/>
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <select name="category" onChange={handleChange}
                                value={formData.category} required>
                            <option value="Web Programming">Web Programming
                            </option>
                            <option value="Other Programming">Other
                                Programming
                            </option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit">Create Post</button>
                </form>
            </div>
        </div>
    );
};

export default BlogPostForm;
