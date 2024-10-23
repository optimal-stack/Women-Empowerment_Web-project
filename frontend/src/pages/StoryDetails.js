import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
    return <p>Loading...</p>; // Consider using a spinner or loading animation here
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>; // More user-friendly error message
  }

  return (
    <div className="story-details">
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
      {story && (
        <div className="container-fluid mt-4">
          <h1>{story.title}</h1>
          <p><strong>Author:</strong> {story.author}</p>
          {story.images && story.images.length > 0 && (
            <div className="image-gallery">
              {story.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${story.title} - Image ${index + 1}`}
                  className="img-thumbnail"
                  style={{ width: '300px', height: '200px', objectFit: 'cover', margin: '10px' }}
                />
              ))}
            </div>
          )}
          <p>{story.content}</p>
          <Link to="/stories" className="btn btn-secondary mt-3">Back to Stories</Link> {/* Back button */}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default StoryDetails;
