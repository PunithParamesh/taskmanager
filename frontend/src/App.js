import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskPage from './pages/taskPage.js';
import { useAuth } from './context/AuthContext.js';
import Login from './pages/Login';
import Register from './pages/Register.js';

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));
  //   setUser(storedUser);
  // }, []);
  // console.log(user);

  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <TaskPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
