// src/pages/PersonalityDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { handleError } from '../utils';
import 'react-toastify/dist/ReactToastify.css';

function PersonalityDetails() {
    const { id } = useParams();
    const [personality, setPersonality] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPersonalityDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/personalities/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch personality details');
            }

            const result = await response.json();
            setPersonality(result);
        } catch (err) {
            setError(err.message);
            handleError(err);
            toast.error("Error fetching personality details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPersonalityDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

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

            {personality && (
                <div className="container mt-4">
                    <h1>{personality.name}</h1>
                    {personality.image && (
                        <img
                            src={personality.image}
                            alt={personality.name}
                            style={{ width: '300px', height: '200px', objectFit: 'cover' }}
                        />
                    )}
                    <p>{personality.description}</p>
                </div>
            )}
            
            <ToastContainer />
        </div>
    );
}

export default PersonalityDetails;
