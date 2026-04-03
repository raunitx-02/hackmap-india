import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { MapPin, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#0A0E27] border-b border-[#1E293B] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <MapPin className="w-8 h-8 text-[#3B82F6]" />
            <span className="text-xl font-bold text-white">HackMap India</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            <Link to="/explore" className="text-gray-300 hover:text-white transition">
              Explore
            </Link>
            <Link to="/teams" className="text-gray-300 hover:text-white transition">
              Find Teams
            </Link>
            {user && (
              <Link to="/my-hackathons" className="text-gray-300 hover:text-white transition">
                My Hackathons
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                >
                  <User className="w-5 h-5" />
                  {user.displayName || 'Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1E293B]">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-gray-300 hover:text-white transition">
                Home
              </Link>
              <Link to="/explore" className="text-gray-300 hover:text-white transition">
                Explore
              </Link>
              <Link to="/teams" className="text-gray-300 hover:text-white transition">
                Find Teams
              </Link>
              {user && (
                <Link to="/my-hackathons" className="text-gray-300 hover:text-white transition">
                  My Hackathons
                </Link>
              )}
              {user ? (
                <>
                  <Link to="/profile" className="text-gray-300 hover:text-white transition">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-500 hover:text-red-400 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white transition">
                    Login
                  </Link>
                  <Link to="/signup" className="text-[#3B82F6] hover:text-[#2563EB] transition">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
