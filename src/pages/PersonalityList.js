// src/pages/PersonalityList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';

function PersonalityList() {
    const [personalities, setPersonalities] = useState([]);
    const navigate = useNavigate();

    const fetchPersonalities = async () => {
        try {
            const response = await fetch('http://localhost:8080/personalities', {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            });
            const result = await response.json();
            setPersonalities(result);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchPersonalities();
    }, []);

    const handlePersonalityClick = (id) => {
        navigate(`/personalities/${id}`);
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
            <h1>Famous Personalities</h1>
            <ul>
                {personalities.map((personality) => (
                    <li key={personality._id} onClick={() => handlePersonalityClick(personality._id)} style={{ cursor: 'pointer', marginBottom: '20px' }}>
                        {personality.image && <img src={personality.image} alt={personality.name} style={{ width: '200px', height: '150px', objectFit: 'cover' }} />}
                        <h3>{personality.name}</h3>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => navigate('/add-personality')}>Add Personality</button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default PersonalityList;
