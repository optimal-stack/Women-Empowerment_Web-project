import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
      {personality && (
        <div className="container mt-4" style={{ maxWidth: '100%', margin: '0 auto' }}>
          <h1>{personality.name}</h1>
          {personality.image && (
            <img
              src={personality.image}
              alt={personality.name}
              style={{ width: '300px', height: '200px', objectFit: 'cover', margin: '10px' }}
            />
          )}
          <p style={{ fontSize: '1.2em', lineHeight: '1.5' }}>{personality.description}</p>
          <Link to="/personalities" className="btn btn-secondary mt-3">Back to Stories</Link> {/* Back button */}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default PersonalityDetails;
