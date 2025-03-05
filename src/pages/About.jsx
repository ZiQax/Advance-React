import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import avatar from "../components/img.jpg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSeriesDropdownOpen, setIsSeriesDropdownOpen] = useState(false);
  const [isFilmDropdownOpen, setIsFilmDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();  

  useEffect(() => {
    if (user && location.pathname === "/login") {
      navigate("/dashboard");
    } 
  }, [user, navigate, location]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50">
      <div className="text-2xl font-bold flex items-center">
        <span className="mr-2"><a href="/" className="hover:text-gray-400">🎬</a></span> CHILL
      </div>

      <div className="hidden md:flex space-x-6">
        {!user ? (
          <>
            <a href="/" className="hover:text-gray-400">Home</a>
            <a href="/about" className="hover:text-gray-400">Tentang</a>
            <a href="#" className="hover:text-gray-400">Kontak</a>
          </>
        ) : (
          <>
            <div className="relative">
              <button className="hover:text-gray-400 cursor-pointer flex items-center space-x-1" onClick={() => setIsSeriesDropdownOpen(!isSeriesDropdownOpen)}>
                Series <ChevronDown size={16} />
              </button>
              {isSeriesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-gray-900 text-white rounded-lg shadow-lg py-2">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">Action</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">Drama</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">Comedy</a>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button className="hover:text-gray-400 cursor-pointer flex items-center space-x-1" onClick={() => setIsFilmDropdownOpen(!isFilmDropdownOpen)}>
                Film <ChevronDown size={16} />
              </button>
              {isFilmDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-gray-900 text-white rounded-lg shadow-lg py-2">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">Horror</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">Sci-Fi</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">Adventure</a>
                </div>
              )}
            </div>
            
            <a href="#" className="hover:text-gray-400">Daftar Saya</a>
          </>
        )}
      </div>

      {user ? (
        <div className="hidden md:flex relative items-center space-x-4">
          <div className="relative">
            <button className="flex items-center space-x-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <img src={avatar} className="w-8 h-8 rounded-full border-2 border-white" alt="User Avatar" />
              <ChevronDown size={20} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900 text-white rounded-lg shadow-lg py-3 border border-gray-700">
                <div className="px-4 py-3 flex flex-col items-center border-b border-gray-600">
                  <img src={avatar} className="w-12 h-12 rounded-full mb-2 border-2 border-white" alt="User Avatar" />
                  <p className="text-sm font-semibold">{user.email}</p>
                </div>
                <div className="px-4 py-2 flex flex-col space-y-2">
                  <a href="#" className="block text-sm hover:bg-gray-700 p-2 rounded">Customize Profile</a>
                  <a href="#" className="block text-sm hover:bg-gray-700 p-2 rounded">Account Settings</a>
                </div>
                <div className="px-4 py-3 border-t border-gray-600">
                  <button
                    className="w-full text-sm text-red-500 hover:text-red-700 font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          className="hidden md:block ml-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
