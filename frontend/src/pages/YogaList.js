// src/pages/YogaList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';
import { Link } from 'react-router-dom';

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
