// src/pages/Stories.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';

function Stories() {
    const [stories, setStories] = useState([]);
    const navigate = useNavigate();

    const fetchStories = async () => {
        try {
            const response = await fetch('http://localhost:8080/stories', {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch stories');
            }

            const result = await response.json();
            setStories(result);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    const handleStoryClick = (id) => {
        navigate(`/stories/${id}`);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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

            <h1 className="my-4">Inspirational Stories</h1>
            <ul className="list-unstyled">
                {stories.length === 0 ? (
                    <p>No stories available. Be the first to add one!</p>
                ) : (
                    stories.map((story) => (
                        <li key={story._id} onClick={() => handleStoryClick(story._id)} style={{ cursor: 'pointer', marginBottom: '20px' }}>
                            {story.image && <img src={story.image} alt={story.title} style={{ width: '200px', height: '150px', objectFit: 'cover' }} />}
                            <h3>{story.title}</h3>
                        </li>
                    ))
                )}
            </ul>

            <div className="mt-4">
                <button className="btn btn-primary" onClick={() => navigate('/add-story')}>
                    Add Story
                </button>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Stories;
