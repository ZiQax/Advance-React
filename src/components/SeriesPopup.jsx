import React from "react";

const VideoPopup = ({ videoId, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-2xl">
        <button className="absolute -top-4 -right-4 bg-red-600 text-white p-2 rounded-full" onClick={onClose}>✖</button>
        <iframe
          className="w-full h-[400px] md:h-[500px] rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Movie Trailer"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPopup;
