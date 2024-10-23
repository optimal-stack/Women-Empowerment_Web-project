// src/pages/AddStory.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { Link } from 'react-router-dom';

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
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ marginBottom: '20px' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/what-we-do">What We Do</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Resources
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><Link className="dropdown-item" to="/stories">Inspirational Stories</Link></li>
                                    <li><Link className="dropdown-item" to="/personalities">Personality</Link></li>
                                    <li><Link className="dropdown-item" to="/yogas">Yoga</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Add Your Inspiration Story</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        name='title'
                        value={story.title}
                        onChange={handleChange}
                        placeholder='Enter story title...'
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor='author'>Author</label>
                    <input
                        type='text'
                        name='author'
                        value={story.author}
                        onChange={handleChange}
                        placeholder='Enter story author...'
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                {/* Loop through images */}
                {story.images.map((image, index) => (
                    <div key={index} style={{ marginBottom: '15px' }}>
                        <label htmlFor={`image-${index}`}>Image {index + 1}</label>
                        <input
                            type="text"
                            name={`image-${index}`}
                            value={image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder="Image URL"
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>
                ))}

                {/* Button to add more image inputs */}
                <button type="button" onClick={handleAddImage} style={{ marginBottom: '15px', padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Add Another Image
                </button>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor='content'>Content</label>
                    <textarea
                        name='content'
                        value={story.content}
                        onChange={handleChange}
                        placeholder='Enter your story...'
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button type='submit' style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Submit Story
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddStory;
