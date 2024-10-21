// src/pages/Stories.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="./home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">What we do</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Resources
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" href="./Stories">Inspirational Stories</a></li>
                                    <li><a className="dropdown-item" href="./personalities">Personality</a></li>
                                    <li><a className="dropdown-item" href="./yogas">Yoga</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h1>Inspirational Stories</h1>
            <ul>
                {stories.map((story) => (
                    <li key={story._id} onClick={() => handleStoryClick(story._id)} style={{ cursor: 'pointer', marginBottom: '20px' }}>
                        {story.image && <img src={story.image} alt={story.title} style={{ width: '200px', height: '150px', objectFit: 'cover' }} />}
                        <h3>{story.title}</h3>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => navigate('/add-story')}>Add story</button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Stories;

