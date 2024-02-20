import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const AddPost = () => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://u-pick-up-y7qnw.ondigitalocean.app/api/posts');
      const postsWithLikes = response.data.map(post => ({
        ...post,
        likes: post.likes ||
      }));
      setPosts(postsWithLikes);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePostSubmit = async () => {
    if (inputValue.trim() !== '') {
      try {
        const response = await axios.post('https://u-pick-up-y7qnw.ondigitalocean.app/api/posts', { content: inputValue });
        setPosts([...posts, response.data]);
        setInputValue('');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const handleEdit = async (postId, newContent) => {
    try {
      await axios.put(`https://u-pick-up-y7qnw.ondigitalocean.app/api/posts/${postId}`, { content: newContent });
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, content: newContent } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://u-pick-up-y7qnw.ondigitalocean.app/api/posts/${postId}`);
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const postIndex = posts.findIndex(post => post.id === postId);
      if (postIndex !== -1 && !posts[postIndex].likedByUser) {
        await axios.post(`https://u-pick-up-y7qnw.ondigitalocean.app/api/posts/${postId}/like`);
        
        // Update the likes count and set likedByUser to true
        const updatedPosts = [...posts];
        updatedPosts[postIndex].likes++;
        updatedPosts[postIndex].likedByUser = true;
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  }; 

  return (
    <div className='add-post'>
      <div className="add-post-container">
        <div className="addP-header">
          <textarea
            className='post-form'
            placeholder='Write something..'
            value={inputValue}
            onChange={handleInputChange}
            required
          ></textarea>
          <button className="add-button" onClick={handlePostSubmit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <div className="post-wrapper">
          {posts.map(post => (
            <div key={post.id} className="posts"> 
              <div className="post-content">
                <p className='mins'>
                  <img src="adminprofile.png" alt="" className="admin-profile" />
                  {new Date(post.createdAt).toLocaleString()}
                </p>
                <p>{post.content}</p>
                <div className="reactions">
                  <button className="edit-button" onClick={() => handleEdit(post.id, prompt("Enter new content:"))}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(post.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button className="heart-button" onClick={() => handleLike(post.id)}>
                    <FontAwesomeIcon icon={faHeart} /> {post.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
