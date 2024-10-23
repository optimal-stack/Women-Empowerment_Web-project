// src/pages/AddPersonality.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { Link } from 'react-router-dom';

function AddPersonality() {
    const [personality, setPersonality] = useState({
        name: '',
        image: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonality({ ...personality, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, image, description } = personality;

        if (!name || !image || !description) {
            return handleError('All fields are required');
        }

        try {
            const response = await fetch('http://localhost:8080/personalities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(personality)
            });
            const result = await response.json();

            if (result.success) {
                handleSuccess(result.message);
                navigate('/personalities'); // Redirect to personalities page
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err);
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
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Add Inspiration Personality</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={personality.name}
                        onChange={handleChange}
                        placeholder='Enter personality name...'
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor='image'>Image URL</label>
                    <input
                        type='text'
                        name='image'
                        value={personality.image}
                        onChange={handleChange}
                        placeholder='Enter image URL...'
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        name='description'
                        value={personality.description}
                        onChange={handleChange}
                        placeholder='Enter personality description...'
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button type='submit' style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Submit Personality
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddPersonality;
