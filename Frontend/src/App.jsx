import { useEffect, useState } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Logout from './pages/Logout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  // const [testMsg, setTestMsg] = useState('');

  // useEffect(() => {
  //   axios.get('http://localhost:5000/test')
  //     .then(res => setTestMsg(res.data.message))
  //     .catch(err => console.error(err));
  // }, []);

  return (
    <Router>
      
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* Protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
     
    </Router>
  );
}

export default App;