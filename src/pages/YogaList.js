// src/pages/YogaList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';

function YogaList() {
    const [yogas, setYogas] = useState([]);
    const navigate = useNavigate();

    const fetchYogas = async () => {
        try {
            const response = await fetch('http://localhost:8080/yogas', {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            });
            const result = await response.json();
            setYogas(result);
        } catch (err) {
            handleError(err.message || 'An error occurred while fetching yogas');
        }
    };

    useEffect(() => {
        fetchYogas();
    }, []);

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
            
            <h1>Yoga Sessions</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {yogas.map((yoga, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <img src={yoga.image} alt={yoga.title} style={{ width: '150px', height: '150px' }} />
                        <h3>{yoga.title}</h3>
                        <button onClick={() => navigate(`/yoga/${yoga._id}`)}>View Details</button>
                        </div>
                ))}
            </div>
            <div>
                <button onClick={() => navigate('/add-yoga')}>Add Yoga</button>
            </div>
        </div>
    );
}

export default YogaList;
