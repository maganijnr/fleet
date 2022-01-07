import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import AppContainer from './pages/AppContainer'
import LoginPage from './pages/LoginPage'
import { useEffect } from 'react'

const App = () => {
  // useEffect(() => {
  //   const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  //   if (!User) Navigate('/login');
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/*" element={<AppContainer />} />
      </Routes>
    </Router>
  );
};

export default App;
