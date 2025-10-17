import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Navigate, Route, Router, Routes, useLocation } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import './App.css';
import Profile from './pages/Profile';
import ComingSoon from './pages/ComingSoon';
import Layout from './components/Layout';
import NewMessage from './components/NewMessage';

const App = () => {
  const { authUser, checkAuth, status } = useAuth();
  const location = useLocation();
  const state = location.state || {};

  useEffect(() => {
    checkAuth();
    console.log('Auth User:', authUser);
  }, []);

  if (status.isCheckingAuth && !authUser) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Routes location={state.backgroundLocation || location}>
        <Route element={<Layout />}>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
          <Route path='/profile' element={authUser ? <Profile /> : <Navigate to='/auth' />} />
          <Route path='/random-chat' element={authUser ? <ComingSoon /> : <Navigate to='/auth' />} />
        </Route>

        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />}>
          <Route path='' element={<Navigate to='login' />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='login' element={<Login />} />
        </Route>

        <Route path='*' element={<Navigate to='/' />} />

      </Routes>

      {state.backgroundLocation && (
        <Routes>
          <Route path='/new-message' element={authUser ? <NewMessage /> : <Navigate to='/auth' />} />
        </Routes>
      )}

      <Toaster />
    </>
  )
}

export default App