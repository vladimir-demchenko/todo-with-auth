import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import LoginPage from './components/screens/LoginPage/LoginPage'
import RegisterPage from './components/screens/RegisterPage/RegisterPage'
import Layout from './components/layout/Layout'
import Home from './components/screens/Home/Home'

const App = () => {

    return (
        <Routes>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/register'} element={<RegisterPage/>}/>
            <Route path={'/'} element={<RequireAuth><Layout><Home/></Layout></RequireAuth>}/>
        </Routes>
    )
}

const RequireAuth = ({children}) => {
    const auth = localStorage.getItem('token') ? true : false;
    const location = useLocation();

    if (!auth) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }

    return children;
}

export default App;