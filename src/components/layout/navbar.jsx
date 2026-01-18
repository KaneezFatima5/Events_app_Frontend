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
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-primary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/unm-logo.png" alt="UNM" className="h-10 w-auto" />
            <div>
              <span className="text-xl font-bold text-primary-500">
                Campus Events
              </span>
              <p className="text-xs text-secondary-500">University of New Mexico</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-secondary-700 hover:text-primary-500 transition font-medium"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-secondary-700 hover:text-primary-500 transition font-medium"
            >
              All Events
            </Link>

            {isAuthenticated && (
              <Link
                to="/my-attending"
                className="text-secondary-700 hover:text-primary-500 transition flex items-center space-x-1 font-medium"
              >
                <FiCheckCircle size={18} />
                <span>My Attending</span>
              </Link>
            )}
            
            {isAuthenticated && isOrganizer() && (
              <>
                <Link
                  to="/my-events"
                  className="text-secondary-700 hover:text-primary-500 transition font-medium"
                >
                  My Events
                </Link>
                <Link
                  to="/create-event"
                  className="flex items-center space-x-1 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition shadow-md"
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
                <div className="flex items-center space-x-2 bg-secondary-100 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.fullName.charAt(0)}
                    </span>
                  </div>
                  <span className="text-secondary-700 font-medium">
                    {user?.fullName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-secondary-600 hover:text-primary-500 transition"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  className="text-secondary-700 hover:text-primary-500 transition font-medium"
                >
                  Login
                </button>
                <button
                  onClick={onOpenRegister}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition shadow-md"
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