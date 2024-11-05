import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
import Header from './Header';
import Signin from './Signin';
import Signup from './Signup';
import BlogPostForm from './BlogPostForm';
import PostList from './PostList';
import EditPost from './EditPost';
import MyProfile from './MyProfile';
import AccountSettings from './AccountSettings';
import './App.css';


function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/signin"/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/create" element={<BlogPostForm/>}/>
                <Route path="/posts" element={<PostList/>}/>
                <Route path="/edit/:id" element={<EditPost/>}/>
                <Route path="/profile" element={<MyProfile/>}/>
                <Route path="/account" element={<AccountSettings/>}/>
            </Routes>
        </Router>
    );
}

export default App;
