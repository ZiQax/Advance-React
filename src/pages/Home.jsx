import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import SeriesPopup from "../components/SeriesPopup";

const API_KEY = "d948159262c08cb1cb05b711fd2c238d";
const API_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async (category, setState) => {
      try {
        const response = await fetch(`${API_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`);
        if (!response.ok) throw new Error("Gagal mengambil data");
        const data = await response.json();
        setState(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies("popular", setPopularMovies);
    fetchMovies("top_rated", setTopRatedMovies);
    fetchMovies("now_playing", setTrendingMovies);
    fetchMovies("upcoming", setUpcomingMovies);
  }, []);

  const openPopup = (seriesId) => {
    setSelectedSeriesId(seriesId);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedSeriesId(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      {popularMovies.length > 0 && (
        <motion.div 
          className="relative w-full h-[500px] md:h-[600px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={`https://image.tmdb.org/t/p/original${popularMovies[0].backdrop_path}`}
            alt={popularMovies[0].title}
            className="w-full h-full object-cover brightness-50"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold drop-shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {popularMovies[0].title}
            </motion.h1>
            <motion.p
              className="mt-4 text-base md:text-lg text-gray-300 max-w-xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {popularMovies[0].overview.slice(0, 150)}...
            </motion.p>
            <motion.button 
              className="mt-6 bg-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Tonton Sekarang
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Movie Categories Section */}
      <div className="p-6 max-w-screen-xl mx-auto">
        {[
          { title: "Top Rating Film", movies: topRatedMovies }, 
          { title: "Trending Now", movies: trendingMovies }, 
          { title: "Upcoming Movies", movies: upcomingMovies }
        ].map((category, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 border-l-4 border-blue-500 pl-4">
              {category.title}
            </h2>
            <Swiper
              className="w-full"
              slidesPerView={1}
              spaceBetween={15}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 25 },
              }}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
            >
              {category.movies.map((movie) => (
                <SwiperSlide key={movie.id} className="flex justify-center">
                  <motion.div 
                    className="relative w-full max-w-xs group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openPopup(movie.id)}
                  >
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                      alt={movie.title} 
                      className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition">
                      Lihat Detail
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />

      {/* Series Popup */}
      {isPopupOpen && selectedSeriesId && (
        <SeriesPopup seriesId={selectedSeriesId} onClose={closePopup} />
      )}
    </div>
  );
};

export default Home;