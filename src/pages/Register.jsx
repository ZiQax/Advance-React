import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../contexts/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      setError("Kata sandi tidak cocok!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect ke dashboard setelah registrasi berhasil
    } catch (err) {
      console.error(err.code, err.message);
      setError("Gagal mendaftar. Coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard"); // Redirect ke dashboard setelah login Google berhasil
    } catch (err) {
      setError("Gagal mendaftar dengan Google. Coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-black p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">🎬 CHILL</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-800"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-800 pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Konfirmasi Kata Sandi"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-800 pr-10"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              "Daftar"
            )}
          </button>
        </form>

        {/* Tombol Daftar dengan Google */}
        <div className="mt-4">
          <button
            onClick={handleGoogleRegister}
            className="w-full bg-white hover:bg-gray-200 text-black py-2 rounded flex justify-center items-center gap-2"
            disabled={loading}
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google Logo" className="w-5 h-5" />
            {loading ? "Menghubungkan..." : "Daftar dengan Google"}
          </button>
        </div>

        {/* Tombol Login */}
        <p className="text-center text-gray-400 mt-4">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-600">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;