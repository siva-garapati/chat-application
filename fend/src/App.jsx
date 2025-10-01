import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import './App.css';

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
    <>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to='/auth'/>}/>
        {/* <Route path='/profile' element={authUser ? <div>Profile Page</div> : <Navigate to='/auth'/>}/>
        <Route path='/new-message' element={authUser ? <div>New Message Page</div> : <Navigate to='/auth'/>}/>
        <Route path='/random-chat' element={authUser ? <div>Random Chat Page</div> : <Navigate to='/auth'/>}/> */}

        <Route path='/auth' element={!authUser ? <AuthPage/> : <Navigate to='/'/>}>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='login' element={<Login/>}/>
        </Route>
        <Route path='/logout' element={<div>logout</div>}/>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

      <Toaster/>
    </>
  )
}

export default App