import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, User, Settings, LogOut, Film, Tv, List } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import avatar from "../components/img.jpg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Fungsi untuk menutup dropdown saat klik di luar
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsProfileDropdownOpen(false);
      setActiveDropdown(null);
    }
  };

  // Tambahkan event listener saat dropdown terbuka
  useEffect(() => {
    if (isProfileDropdownOpen || activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen, activeDropdown]);

  useEffect(() => {
    if (user && location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [user, navigate, location]);

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Arahkan ke login setelah logout
    setIsMenuOpen(false); // Tutup menu mobile setelah logout
  };

  // Fungsi untuk toggle dropdown Series, Film, atau Daftar Saya
  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  // Fungsi untuk menutup menu mobile saat navigasi
  const handleMobileLinkClick = () => {
    console.log("Mobile link clicked"); // Debugging
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50">
      {/* Logo */}
      <div className="text-2xl font-bold flex items-center">
        <span className="mr-2">🎬</span> CHILL
      </div>

      {/* Menu untuk desktop */}
      {user ? (
        <div className="hidden md:flex space-x-6">
          {/* Dropdown Series */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 hover:text-gray-400"
              onClick={() => toggleDropdown("series")}
            >
              <span>Series</span>
              <ChevronDown size={16} />
            </button>
            {activeDropdown === "series" && (
              <div
                ref={dropdownRef}
                className="absolute top-8 left-0 bg-gray-800 p-4 rounded-lg shadow-lg w-48 space-y-2"
              >
                <Link to="#" className="block hover:text-gray-400">Action</Link>
                <Link to="#" className="block hover:text-gray-400">Drama</Link>
                <Link to="#" className="block hover:text-gray-400">Comedy</Link>
              </div>
            )}
          </div>

          {/* Dropdown Film */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 hover:text-gray-400"
              onClick={() => toggleDropdown("film")}
            >
              <span>Film</span>
              <ChevronDown size={16} />
            </button>
            {activeDropdown === "film" && (
              <div
                ref={dropdownRef}
                className="absolute top-8 left-0 bg-gray-800 p-4 rounded-lg shadow-lg w-48 space-y-2"
              >
                <Link to="#" className="block hover:text-gray-400">Horror</Link>
                <Link to="#" className="block hover:text-gray-400">Sci-Fi</Link>
                <Link to="#" className="block hover:text-gray-400">Adventure</Link>
              </div>
            )}
          </div>

          {/* Dropdown Daftar Saya */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 hover:text-gray-400"
              onClick={() => toggleDropdown("daftar")}
            >
              <span>Daftar Saya</span>
              <ChevronDown size={16} />
            </button>
            {activeDropdown === "daftar" && (
              <div
                ref={dropdownRef}
                className="absolute top-8 left-0 bg-gray-800 p-4 rounded-lg shadow-lg w-48 space-y-2"
              >
                <Link to="#" className="block hover:text-gray-400">Favorit</Link>
                <Link to="#" className="block hover:text-gray-400">Tonton Nanti</Link>
                <Link to="#" className="block hover:text-gray-400">Riwayat</Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Tampilkan link "Home", "Tentang", dan "Kontak" hanya jika tidak di halaman login
        location.pathname !== "/login" && (
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="#" className="hover:text-gray-400">Tentang</Link>
            <Link to="#" className="hover:text-gray-400">Kontak</Link>
          </div>
        )
      )}

      {/* Profile & Logout Button Setelah Login (Desktop) */}
      {user ? (
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 hover:text-gray-400"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <img src={avatar} className="w-8 h-8 rounded-full" alt="User Avatar" />
            <ChevronDown size={16} />
          </button>
          {isProfileDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-10 right-0 bg-gray-800 p-4 rounded-lg shadow-lg w-56 z-50"
            >
              <div className="flex items-center space-x-3 mb-4">
                <img src={avatar} className="w-10 h-10 rounded-full" alt="User Avatar" />
                <p className="text-sm break-words max-w-[120px]">{user.email}</p>
              </div>
              <div className="border-b border-gray-700 mb-2"></div>
              <Link to="/profile" className="flex items-center space-x-2 py-2 hover:text-gray-400">
                <User size={16} />
                <span>Customize Profile</span>
              </Link>
              <Link to="/profile/settings" className="flex items-center space-x-2 py-2 hover:text-gray-400">
                <Settings size={16} />
                <span>Profile Settings</span>
              </Link>
              <button
                className="flex items-center space-x-2 w-full text-left py-2 text-red-500 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        // Tampilkan tombol "Login" hanya jika tidak di halaman login
        location.pathname !== "/login" && (
          <button
            className="hidden md:block ml-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )
      )}

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black flex flex-col p-4 space-y-4 border-t border-gray-700 z-50">
          {/* Link Navbar untuk Mobile */}
          {user ? (
            <>
              {/* Dropdown Series untuk Mobile */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:text-gray-400"
                  onClick={() => toggleDropdown("series-mobile")}
                >
                  <span>Series</span>
                  <ChevronDown size={16} />
                </button>
                {activeDropdown === "series-mobile" && (
                  <div className="pl-6 space-y-2 bg-gray-800 p-2 rounded-md mt-2">
                    <Link to="#" className="block py-1 hover:text-gray-400">Action</Link>
                    <Link to="#" className="block py-1 hover:text-gray-400">Drama</Link>
                    <Link to="#" className="block py-1 hover:text-gray-400">Comedy</Link>
                  </div>
                )}
              </div>

              {/* Dropdown Film untuk Mobile */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:text-gray-400"
                  onClick={() => toggleDropdown("film-mobile")}
                >
                  <span>Film</span>
                  <ChevronDown size={16} />
                </button>
                {activeDropdown === "film-mobile" && (
                  <div className="pl-6 space-y-2 bg-gray-800 p-2 rounded-md mt-2">
                    <Link to="#" className="block py-1 hover:text-gray-400">Horror</Link>
                    <Link to="#" className="block py-1 hover:text-gray-400">Sci-Fi</Link>
                    <Link to="#" className="block py-1 hover:text-gray-400">Adventure</Link>
                  </div>
                )}
              </div>

              {/* Dropdown Daftar Saya untuk Mobile */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:text-gray-400"
                  onClick={() => toggleDropdown("daftar-mobile")}
                >
                  <span>Daftar Saya</span>
                  <ChevronDown size={16} />
                </button>
                {activeDropdown === "daftar-mobile" && (
                  <div className="pl-6 space-y-2 bg-gray-800 p-2 rounded-md mt-2">
                    <Link to="#" className="block py-1 hover:text-gray-400">Favorit</Link>
                    <Link to="#" className="block py-1 hover:text-gray-400">Tonton Nanti</Link>
                    <Link to="#" className="block py-1 hover:text-gray-400">Riwayat</Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Tampilkan link "Home", "Tentang", dan "Kontak" hanya jika tidak di halaman login
            location.pathname !== "/login" && (
              <>
                <Link to="/" className="hover:text-gray-400 px-4 py-2" onClick={handleMobileLinkClick}>Home</Link>
                <Link to="#" className="hover:text-gray-400 px-4 py-2" onClick={handleMobileLinkClick}>Tentang</Link>
                <Link to="#" className="hover:text-gray-400 px-4 py-2" onClick={handleMobileLinkClick}>Kontak</Link>
              </>
            )
          )}

          {/* Avatar dan Dropdown Profile untuk Mobile */}
          {user && (
            <div className="relative">
              <button
                className="flex items-center space-x-3 w-full text-left px-4 py-2 hover:text-gray-400"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <img src={avatar} className="w-12 h-12 rounded-full border-2 border-white" alt="User Avatar" />
                <ChevronDown size={16} />
              </button>
              {isProfileDropdownOpen && (
                <div className="pl-6 space-y-2 bg-gray-800 p-2 rounded-md mt-2">
                  <p className="text-gray-300 px-2 py-1">{user.email}</p>
                  <Link to="/profile" className="block py-1 hover:text-gray-400" onClick={handleMobileLinkClick}>Customize Profile</Link>
                  <Link to="/profile/settings" className="block py-1 hover:text-gray-400" onClick={handleMobileLinkClick}>Profile Settings</Link>
                  <button
                    className="block text-left text-red-500 hover:text-red-700 py-1 w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;