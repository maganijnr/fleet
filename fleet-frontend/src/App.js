import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import AppContainer from './pages/AppContainer'
import LoginPage from './pages/LoginPage'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { redirect, user } = userLogin


  return (
    <Router>
      <Routes>
        <Route path='login' element={<LoginPage/>}/>
        <Route path="/*" element={<AppContainer/>}/>
      </Routes>
    </Router>
    
  )
}

export default App
