import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "William",
    email: "william1998@gmail.com",
    password: "********",
  });
  const [editField, setEditField] = useState(null);
  const [profileImage, setProfileImage] = useState("/avatar.png");
  const [showPopup, setShowPopup] = useState(false);

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleChange = (e) => {
    setUser({ ...user, [editField]: e.target.value });
  };

  const handleSave = () => {
    setEditField(null);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-4 md:p-8 relative">
      {/* Navbar */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Profil Saya
        </h1>
        <nav>
          <ul className="flex gap-4 md:gap-6 text-gray-400">
            <li className="hover:text-white cursor-pointer">Series</li>
            <li className="hover:text-white cursor-pointer">Film</li>
            <li className="hover:text-white cursor-pointer">Daftar Saya</li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Profil Section */}
        <div className="bg-[#131D35]/70 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg flex-1 border border-[#2D3748]">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="relative">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-blue-500/50 hover:border-blue-500 transition-all duration-300" 
              />
              <label className="absolute bottom-0 right-0 bg-blue-500/80 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition">
                <span className="text-white">📷</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange} 
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Form Fields */}
          {Object.keys(user).map((key) => (
            <div key={key} className="mb-4">
              <label className="block mb-1 capitalize text-gray-400">{key}</label>
              <div className="flex items-center bg-[#1E293B]/50 backdrop-blur-md rounded-lg p-2 border border-[#2D3748]">
                {editField === key ? (
                  <input
                    type={key === "password" ? "password" : "text"}
                    value={user[key]}
                    onChange={handleChange}
                    className="bg-transparent border-none outline-none flex-grow text-white"
                  />
                ) : (
                  <span className="flex-grow text-white">{user[key]}</span>
                )}
                <button
                  onClick={() => (editField === key ? handleSave() : handleEdit(key))}
                  className="ml-2 text-yellow-400 hover:text-yellow-500 transition"
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <button 
            onClick={handleSave} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg w-full mt-4 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Simpan
          </button>
          <button 
            onClick={() => navigate("/")} 
            className="bg-gray-500/50 backdrop-blur-md text-white px-4 py-2 rounded-lg w-full mt-2 hover:bg-gray-600/70 transition"
          >
            Kembali ke Beranda
          </button>
        </div>

        {/* Subscription Section */}
        <div className="bg-[#131D35]/70 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full md:w-1/3 border border-[#2D3748] flex flex-col h-50">
          <h2 className="text-lg font-bold mb-2">Saat ini anda belum berlangganan</h2>
          <p className="text-gray-400 text-sm mb-4">
            Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 w-full">
            <a href="/subscription">Mulai Berlangganan</a>
          </button>
        </div>
      </div>

      {/* Popup Box */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 animate-popup">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-green-500">✔️</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800">Berhasil Disimpan!</h2>
            <p className="text-gray-600 text-sm mb-4">Perubahan telah berhasil disimpan.</p>
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition" 
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}