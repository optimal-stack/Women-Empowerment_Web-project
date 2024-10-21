// src/pages/AddStory.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function AddStory() {
    const [story, setStory] = useState({
        title: '',
        author: '',
        images: [''],  // Initialize with one empty image field
        content: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStory({ ...story, [name]: value });
    };

    const handleImageChange = (index, value) => {
        const updatedImages = story.images.map((img, i) => (i === index ? value : img));
        setStory({ ...story, images: updatedImages });
    };

    const handleAddImage = () => {
        setStory({ ...story, images: [...story.images, ''] });  // Add new empty image input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, author, images, content } = story;

        if (!title || !author || !images.length || !content) {
            return handleError('All fields are required, including at least one image.');
        }

        try {
            const response = await fetch('http://localhost:8080/stories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(story)
            });

            const result = await response.json();

            if (result.success) {
                handleSuccess(result.message);
                navigate('/stories');  // Redirect to the stories page
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div>
            <h1>Add Your Inspiration Story</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        name='title'
                        value={story.title}
                        onChange={handleChange}
                        placeholder='Enter story title...'
                    />
                </div>
                <div>
                    <label htmlFor='author'>Author</label>
                    <input
                        type='text'
                        name='author'
                        value={story.author}
                        onChange={handleChange}
                        placeholder='Enter story author...'
                    />
                </div>

                {/* Loop through images */}
                {story.images.map((image, index) => (
                    <div key={index}>
                        <label htmlFor={`image-${index}`}>Image {index + 1}</label>
                        <input
                            type="text"
                            name={`image-${index}`}
                            value={image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder="Image URL"
                        />
                    </div>
                ))}

                {/* Button to add more image inputs */}
                <button type="button" onClick={handleAddImage}>Add Another Image</button>

                <div>
                    <label htmlFor='content'>Content</label>
                    <textarea
                        name='content'
                        value={story.content}
                        onChange={handleChange}
                        placeholder='Enter your story...'
                    />
                </div>
                <button type='submit'>Submit Story</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddStory;
