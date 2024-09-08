import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/userprofile' element={<UserProfile />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;