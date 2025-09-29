import { Link, Outlet } from 'react-router-dom'
import SignUp from '../components/SignUp'

const AuthPage = () => {
  return (
    <div>
      <h1>Welcome to ChatApp</h1>

      <div>
        <Link to="login">Login</Link>
        <Link to="signup">Sign Up</Link>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthPage