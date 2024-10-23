import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';

function PersonalityList() {
  const [personalities, setPersonalities] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const fetchPersonalities = async () => {
    try {
      const response = await fetch('http://localhost:8080/personalities', {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      if (Array.isArray(result)) {
        setPersonalities(result);
      } else {
        throw new Error('Invalid data format'); // Handle unexpected API response
      }
    } catch (err) {
      handleError(err);
      setError('Failed to load personalities. Please try again later.');
    } finally {
      setLoading(false); // Stop loading once request is done
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
      {/* Navbar */}
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
      {/* Main content */}
      <div className="container-fluid">
        <h1 className="my-4">Famous Personalities</h1>
        {/* Loading state */}
        {loading && <p>Loading personalities...</p>}
        {/* Error state */}
        {error && <p className="text-danger">{error}</p>}
        {/* Personalities List */}
        {!loading && !error && (
          <>
            {personalities.length === 0 ? (
              <p>No personalities found. Be the first to add one!</p>
            ) : (
              <ul className="list-unstyled row">
                {personalities.map((personality) => (
                  <li
                    key={personality._id}
                    className="col-md-4 mb-4"
                    onClick={() => handlePersonalityClick(personality._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card h-100">
                      {personality.image && (
                        <img
                          src={personality.image}
                          alt={personality.name}
                          className="card-img-top"
                          style={{ objectFit: 'cover', height: '200px' }}
                        />
                      )}
                      <div className="card-body">
                        <h5 className="card-title">{personality.name}</h5>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        {/* Add Personality Button */}
        <div className="mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/add-personality')}
          >
            Add Personality
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PersonalityList;
