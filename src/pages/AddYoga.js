// src/pages/AddYoga.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

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
            <h1>Add Yoga Session</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Yoga Title"
                    value={yogaData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="video"
                    placeholder="Video URL"
                    value={yogaData.video}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={yogaData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={yogaData.image}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Yoga</button>
            </form>
        </div>
    );
}

export default AddYoga;
