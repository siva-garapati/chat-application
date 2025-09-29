import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';

const App = () => {
  const { authUser, checkAuth, status } = useAuth();

  useEffect(()=>{
    checkAuth();
    console.log('Auth User:', authUser);
  },[]);

  if (status.isCheckingAuth && !authUser){
    return <div>Loading...</div>
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to='/auth'/>}/>
        <Route path='/auth' element={!authUser ? <AuthPage/> : <Navigate to='/'/>}>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='login' element={<Login/>}/>
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App