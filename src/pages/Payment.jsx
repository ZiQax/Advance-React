import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCreditCard, FaWallet, FaCheckCircle } from "react-icons/fa";


const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data paket dari state, kalau tidak ada, default ke "Individu"
  const selectedPackage = location.state || { name: "Individu", price: "Rp50.000/bulan", priceValue: 50000 };

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [voucher, setVoucher] = useState("");
  const [isVoucherValid, setIsVoucherValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const adminFee = 3000;
  const totalPayment = selectedPackage.priceValue + adminFee;

  const handleVoucher = () => {
    // Simulasi validasi voucher
    setIsLoading(true);
    setTimeout(() => {
      setIsVoucherValid(true);
      setIsLoading(false);
    }, 1000);
  };

  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/payment-success");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen pt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 pt-10 text-center">Ringkasan Pembayaran</h2>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        
        {/* Paket yang dipilih dan Gambar Ilustrasi */}
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow-lg w-full md:w-1/3 text-center">
          <h3 className="text-xl font-semibold">{selectedPackage.name}</h3>
          <p className="text-lg">{selectedPackage.price}</p>
          
        </div>

        {/* Detail Pembayaran */}
        <div className="flex flex-col flex-1 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Metode Pembayaran</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                paymentMethod === "credit-card" ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setPaymentMethod("credit-card")}
            >
              <FaCreditCard />
              Kartu Debit/Kredit
            </button>
            <button
              className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                paymentMethod === "bca-va" ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setPaymentMethod("bca-va")}
            >
              <FaWallet />
              BCA Virtual Account
            </button>
          </div>

          {/* Kode Voucher */}
          <h3 className="text-lg font-semibold mt-6">Kode Voucher (Jika ada)</h3>
          <div className="flex flex-col sm:flex-row mt-2">
            <input
              type="text"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              className="flex-1 p-2 text-black rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
              placeholder="Masukkan kode voucher"
            />
            <button
              className={`bg-gray-700 px-4 py-2 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none transition-all duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
              }`}
              onClick={handleVoucher}
              disabled={isLoading}
            >
              {isLoading ? "Memeriksa..." : "Gunakan"}
            </button>
          </div>
          {isVoucherValid && (
            <div className="flex items-center gap-2 mt-2 text-green-500">
              <FaCheckCircle />
              <p>Voucher berhasil digunakan!</p>
            </div>
          )}

          {/* Ringkasan Transaksi */}
          <h3 className="text-lg font-semibold mt-6">Ringkasan Transaksi</h3>
          <div className="mt-2">
            <p>Paket: <span className="font-bold">{selectedPackage.name}</span></p>
            <p>Harga: <span className="font-bold">{selectedPackage.price}</span></p>
            <p>Biaya Admin: <span className="font-bold">Rp{adminFee.toLocaleString()}</span></p>
            <hr className="my-2 border-gray-600" />
            <p className="text-xl font-bold">Total: Rp{totalPayment.toLocaleString()}</p>
          </div>
          
          <button
            className={`bg-blue-500 text-white px-6 py-3 rounded-lg mt-6 transition-all duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? "Memproses Pembayaran..." : "Bayar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;