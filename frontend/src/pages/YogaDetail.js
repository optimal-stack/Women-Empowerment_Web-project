// src/pages/YogaDetail.js
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { handleError } from '../utils';

function YogaDetail() {
    const { id } = useParams();
    const [yoga, setYoga] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const fetchYogaDetails = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8080/yogas/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch yoga details');
            }
            const result = await response.json();
            setYoga(result);
        } catch (err) {
            handleError(err.message || 'An error occurred while fetching yoga details');
        } finally {
            setLoading(false); // Stop loading after fetching
        }
    }, [id]);

    useEffect(() => {
        fetchYogaDetails();
    }, [fetchYogaDetails]);

    if (loading) return <p>Loading...</p>; // Use a spinner or loading animation if possible

    if (!yoga) return <p>No yoga details found.</p>; // Handle case where yoga is not found

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

            <div className="container mt-4">
                <h1>{yoga.title}</h1>
                {yoga.video && (
                    <div className="video-container mb-4">
                        <video width="100%" controls>
                            <source src={yoga.video} type="video/mp4" />
                            Your browser does not support HTML video.
                        </video>
                    </div>
                )}
                <p>{yoga.description}</p>
                <Link to="/yogas" className="btn btn-secondary mt-3">Back to Yoga List</Link> {/* Back button */}
            </div>
        </div>
    );
}

export default YogaDetail;
