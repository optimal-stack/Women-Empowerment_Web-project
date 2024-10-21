// src/pages/AddPersonality.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

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
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="./home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">what we do</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Resources
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="./Stories">Inspirational Stories</a></li>
            <li><a class="dropdown-item" href="./personalities">Personality</a></li>
            <li><a class="dropdown-item" href="./yogas">Yoga</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
            <h1>Add Inspiration Personality</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={personality.name}
                        onChange={handleChange}
                        placeholder='Enter personality name...'
                    />
                </div>
                <div>
                    <label htmlFor='image'>Image URL</label>
                    <input
                        type='text'
                        name='image'
                        value={personality.image}
                        onChange={handleChange}
                        placeholder='Enter image URL...'
                    />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        name='description'
                        value={personality.description}
                        onChange={handleChange}
                        placeholder='Enter personality description...'
                    />
                </div>
                <button type='submit'>Submit Personality</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddPersonality;
