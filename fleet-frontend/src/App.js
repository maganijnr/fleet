import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import AppContainer from './pages/AppContainer'
import LoginPage from './pages/LoginPage'
import { useEffect } from 'react'

const App = () => {
  const navigate = useNavigate()

  const redirect = () => {
    const userInfo = localStorage.getItem('user') !== 'undefined' 
      ? JSON.parse(localStorage.getItem('user') ) 
      : localStorage.clear()

    if(!userInfo){
      navigate('/login')
    }
  }

  useEffect(() => {
    redirect()
  },[])
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="/*" element={<AppContainer />} />
    </Routes>
  );
};

export default App;
