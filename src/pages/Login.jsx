import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../contexts/firebaseConfig";
import { useNavigate, Link } from "react-router-dom"; // Import Link

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.code, err.message);
      setError("Email atau password salah!");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Masukkan email untuk reset password!");
      return;
    }
    
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess("Link reset password telah dikirim ke email!");
      setError("");
    } catch (err) {
      setError("Gagal mengirim reset password. Periksa email!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError("Gagal login dengan Google. Coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-black p-8 rounded-lg shadow-lg w-96 mt-10 ">
        <h2 className="text-2xl font-bold text-center mb-4">🎬 CHILL</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {resetSuccess && <p className="text-green-500 text-center">{resetSuccess}</p>}

        <form onSubmit={handleLogin}>
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
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        <button
          onClick={handleResetPassword}
          className="w-full mt-4 text-sm text-blue-400 hover:text-blue-600"
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Lupa kata sandi?"}
        </button>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-gray-200 text-black py-2 rounded flex justify-center items-center gap-2"
            disabled={loading}
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google Logo" className="w-5 h-5" />
            {loading ? "Menghubungkan..." : "Login dengan Google"}
          </button>
        </div>

        <p className="text-center text-gray-400 mt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-600">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
