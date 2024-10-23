// src/pages/Home.js
import './css folder/stylehome.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]); // Initialize as an array
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            };
            const response = await fetch(url, headers);
            const result = await response.json();

            console.log("Fetched products:", result); // Log to check the format of the response

            if (Array.isArray(result)) {
                setProducts(result); // Make sure result is an array
            } else {
                console.error('Fetched data is not an array:', result);
                setProducts([]); // Set empty array if data is not as expected
            }
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Welcome, {loggedInUser}</h1>
            <button onClick={handleLogout} style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '20px' }}>
                Logout
            </button>
            <div>
                {
                    Array.isArray(products) && products.length > 0 ? (
                        products.map((item, index) => (
                            <ul key={index} style={{ listStyleType: 'none', padding: '5px 0' }}>
                                <li style={{ fontSize: '18px' }}>{item.name} : <strong>{item.price}</strong></li>
                            </ul>
                        ))
                    ) : (
                        <p>No products available</p>
                    )
                }
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
