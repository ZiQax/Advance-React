import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const SubscriptionPage = () => {
  const navigate = useNavigate();

  const packages = [
    {
      name: "Individu",
      price: "Rp49.990/bulan",
      priceValue: 49990,
      accounts: "1 Akun",
      quality: "720p",
      benefits: ["Tidak ada iklan", "Kualitas 720p", "Download konten pilihan"],
    },
    {
      name: "Berdua",
      price: "Rp79.990/bulan",
      priceValue: 79990,
      accounts: "2 Akun",
      quality: "1080p",
      benefits: ["Tidak ada iklan", "Kualitas 1080p", "Download konten pilihan"],
    },
    {
      name: "Keluarga",
      price: "Rp159.990/bulan",
      priceValue: 159990,
      accounts: "5-7 Akun",
      quality: "4K",
      benefits: ["Tidak ada iklan", "Kualitas 4K", "Download konten pilihan"],
    },
  ];

  const handleSubscription = (plan) => {
    navigate("/payment", { state: plan }); // Mengirim data paket ke PaymentPage
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="text-center py-16 px-4">
        <h2 className="text-3xl font-bold pt-10 mb-8">Temukan paket sesuai kebutuhanmu!</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {packages.map((plan, index) => (
            <div key={index} className="bg-gradient-to-b from-blue-600 to-blue-800 p-8 rounded-2xl w-80 text-center shadow-2xl relative transform transition-transform hover:scale-105">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md">
                {plan.name}
              </div>
              <h3 className="text-2xl font-bold mt-8">{plan.price}</h3>
              <p className="text-sm mt-2 text-gray-300">{plan.accounts}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 justify-center text-gray-200">
                    ✅ {benefit}
                  </li>
                ))}
              </ul>
              <button 
                className="mt-8 bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
                onClick={() => handleSubscription(plan)}
              >
                Langganan
              </button>
              <p className="text-xs mt-4 text-gray-400">Syarat dan Ketentuan Berlaku</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SubscriptionPage;