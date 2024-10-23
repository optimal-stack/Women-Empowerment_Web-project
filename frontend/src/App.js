import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddStory from './pages/AddStory'; // Ensure this exists
import Stories from './pages/Stories'; // Import the Stories component
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import PersonalityList from './pages/PersonalityList'; // Import PersonalityList
import AddPersonality from './pages/AddPersonality'; // Import AddPersonality
import YogaList from './pages/YogaList';
import YogaDetail from './pages/YogaDetail';
import AddYoga from './pages/AddYoga'; // If you have this
import PersonalityDetails from './pages/PersonalityDetails';
import StoryDetails from './pages/StoryDetails';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    return (
        <div className="App">
            <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/home' element={<PrivateRoute element={<Home />} />} />
                <Route path='/stories' element={<Stories />} /> {/* Route for viewing stories */}
                <Route path='/add-story' element={<AddStory />} /> {/* Route for adding stories */}
                <Route path='/personalities' element={<PersonalityList />} /> {/* Route for viewing personalities */}
                <Route path='/add-personality' element={<AddPersonality />} /> {/* Route for adding personalities */}
                <Route path='/yogas' element={<YogaList />} />
                <Route path='/yoga/:id' element={<YogaDetail />} />
                <Route path='/add-yoga' element={<AddYoga />} />
                <Route path="/personalities/:id" element={<PersonalityDetails />} />
                <Route path="/stories/:id" element={<StoryDetails />} />
            </Routes>
        </div>
    );
}

export default App;
