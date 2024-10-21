import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { handleError } from '../utils';
import 'react-toastify/dist/ReactToastify.css';

function StoryDetails() {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStoryDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/stories/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch story details');
            }

            const result = await response.json();
            setStory(result);
        } catch (err) {
            setError(err.message);
            handleError(err);
            toast.error("Error fetching story details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStoryDetails();
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

            {story && (
                <div className="container mt-4">
                    <h1>{story.title}</h1>
                    {story.images && story.images.length > 0 && (
                        <div className="image-gallery">
                            {story.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${story.title} - Image ${index + 1}`}
                                    style={{ width: '300px', height: '200px', objectFit: 'cover', margin: '10px' }}
                                />
                            ))}
                        </div>
                    )}
                    <p>{story.content}</p>
                </div>
            )}
            
            <ToastContainer />
        </div>
    );
}

export default StoryDetails;
