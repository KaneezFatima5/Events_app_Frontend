import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiCalendar, FiUser, FiLogOut, FiPlus, FiCheckCircle } from 'react-icons/fi';

const Navbar = ({ onOpenLogin, onOpenRegister }) => {
  const { user, logout, isAuthenticated, isOrganizer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FiCalendar className="text-primary-600 text-2xl" />
            <span className="text-xl font-bold text-gray-900">
              Campus Events
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              All Events
            </Link>

            {/* NEW: My Attending Events - Show for all authenticated users */}
            {isAuthenticated && (
              <Link
                to="/my-attending"
                className="text-gray-700 hover:text-primary-600 transition flex items-center space-x-1"
              >
                <FiCheckCircle size={18} />
                <span>My Attending</span>
              </Link>
            )}
            
            {isAuthenticated && isOrganizer() && (
              <>
                <Link
                  to="/my-events"
                  className="text-gray-700 hover:text-primary-600 transition"
                >
                  My Events
                </Link>
                <Link
                  to="/create-event"
                  className="flex items-center space-x-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  <FiPlus />
                  <span>Create Event</span>
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FiUser className="text-gray-600" />
                  <span className="text-gray-700 font-medium">
                    {user?.fullName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  className="text-gray-700 hover:text-primary-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={onOpenRegister}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;