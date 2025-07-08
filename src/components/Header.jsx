import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='container' style={{ marginTop: 0, marginBottom: 0 }}>
        <div className='logo'>
          <Link to='/'>AI Study Buddy</Link> {/* <-- NAME FIXED */}
        </div>
        <nav className='nav'>
          <ul>
            {user ? (
              // If user is logged in, show Chat link and Logout button
              <>
                <li>
                  <Link to='/interview'>Chat</Link> {/* <-- NEW CHAT LINK */}
                </li>
                <li>
                  <button className='btn' onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // If user is logged out, show Login and Register links
              <>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
