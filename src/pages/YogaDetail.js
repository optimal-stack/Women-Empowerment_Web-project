import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { handleError } from '../utils';

function YogaDetail() {
    const { id } = useParams();
    const [yoga, setYoga] = useState(null);

    const fetchYogaDetails = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8080/yogas/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            });
            const result = await response.json();
            setYoga(result);
        } catch (err) {
            handleError(err.message || 'An error occurred while fetching yoga details');
        }
    }, [id]); // Add 'id' as a dependency

    useEffect(() => {
        fetchYogaDetails();
    }, [fetchYogaDetails]); // Add fetchYogaDetails as a dependency

    if (!yoga) return <div>Loading...</div>;

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
            <h1>{yoga.title}</h1>
            <video width="400" controls>
                <source src={yoga.video} type="video/mp4" />
                Your browser does not support HTML video.
            </video>
            <p>{yoga.description}</p>
        </div>
    );
}

export default YogaDetail;
