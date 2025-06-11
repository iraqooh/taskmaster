import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <a href='/' className="text-xl font-bold space-x-2"> <img src="/favicon-32x32.png" alt="taskmaster-icon" className='inline' /> <span>Taskmaster</span></a>
      {user && (
        <div className="flex gap-4 items-center">
          <a href="/profile" className='hover:bg-white hover:text-blue-600 py-1 px-3 rounded'>{user.name}</a>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
