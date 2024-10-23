// src/pages/AddYoga.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { Link } from 'react-router-dom';

function AddYoga() {
    const [yogaData, setYogaData] = useState({
        title: '',
        video: '',
        description: '',
        image: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setYogaData({ ...yogaData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/yogas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify(yogaData),
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess('Yoga session added successfully!');
                navigate('/yogas'); // Navigate to Yoga List
            } else {
                handleError(result.message || 'Failed to add yoga session');
            }
        } catch (error) {
            handleError(error.message || 'An error occurred');
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
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Add Yoga Session</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Yoga Title"
                        value={yogaData.title}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="video"
                        placeholder="Video URL"
                        value={yogaData.video}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={yogaData.description}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={yogaData.image}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Add Yoga
                </button>
            </form>
        </div>
    );
}

export default AddYoga;
