import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_KEY = "d948159262c08cb1cb05b711fd2c238d";
const API_URL = "https://api.themoviedb.org/3";

const SeriesPopup = ({ seriesId, onClose }) => {
  const [videoKey, setVideoKey] = useState(null);
  const [seriesData, setSeriesData] = useState(null);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        // Ambil detail film
        const response = await fetch(`${API_URL}/movie/${seriesId}?api_key=${API_KEY}&language=en-US`);
        if (!response.ok) throw new Error("Gagal mengambil data");
        const data = await response.json();
        setSeriesData(data);

        // Ambil video trailer
        const videoResponse = await fetch(`${API_URL}/movie/${seriesId}/videos?api_key=${API_KEY}&language=en-US`);
        if (!videoResponse.ok) throw new Error("Gagal mengambil video");
        const videoData = await videoResponse.json();
        const trailer = videoData.results.find((vid) => vid.type === "Trailer");
        setVideoKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error("Error fetching series details:", error);
      }
    };

    if (seriesId) {
      fetchSeriesDetails();
    }
  }, [seriesId]);

  if (!seriesData) return null; // Jika data belum ada, tidak tampilkan popup

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <motion.div
        className="bg-gray-900 p-6 rounded-lg max-w-3xl w-full text-white relative shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Tombol Close yang Lebih Menarik */}
        <button
          className="absolute top-3 right-3 text-2xl font-bold p-2 rounded-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-lg"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Judul */}
        <h2 className="text-2xl font-bold mb-4">{seriesData.title}</h2>

        {/* Video Trailer */}
        {videoKey ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-400">Trailer tidak tersedia.</p>
        )}

        {/* Deskripsi */}
        <p className="mt-4 text-gray-300">{seriesData.overview}</p>
      </motion.div>
    </div>
  );
};

export default SeriesPopup;
