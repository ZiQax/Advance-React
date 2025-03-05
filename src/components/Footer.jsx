const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-10 mt-16 border-t border-gray-700">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold text-blue-400">CHILL</h2>
            <p className="text-sm mt-2 text-gray-400">
              &copy; {new Date().getFullYear()} CHILL. All Rights Reserved.
            </p>
          </div>
  
          {/* Genre Film */}
          <div>
            <h3 className="font-semibold mb-3 text-lg text-blue-400">Genre</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:text-blue-400 cursor-pointer">Action</li>
              <li className="hover:text-blue-400 cursor-pointer">Drama</li>
              <li className="hover:text-blue-400 cursor-pointer">Komedi</li>
              <li className="hover:text-blue-400 cursor-pointer">Horor</li>
              <li className="hover:text-blue-400 cursor-pointer">Fantasi</li>
              <li className="hover:text-blue-400 cursor-pointer">Petualangan</li>
            </ul>
          </div>
  
          {/* Bantuan & Informasi */}
          <div>
            <h3 className="font-semibold mb-3 text-lg text-blue-400">Bantuan</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:text-blue-400 cursor-pointer">Pusat Bantuan</li>
              <li className="hover:text-blue-400 cursor-pointer">Ketentuan Layanan</li>
              <li className="hover:text-blue-400 cursor-pointer">Kebijakan Privasi</li>
              <li className="hover:text-blue-400 cursor-pointer">Hubungi Kami</li>
            </ul>
          </div>
  
        </div>
  
        {/* Garis pemisah & Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          Dibuat dengan ❤️ oleh CHILL Team
        </div>
      </footer>
    );
  };
  
  export default Footer;
  