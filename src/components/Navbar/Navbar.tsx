import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { IoLanguage } from "react-icons/io5";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuAnimation = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.2, ease: "easeInOut" }
  };

  return (
    <nav className="flex flex-col sm:flex-row items-stretch border-b border-[#1E2D3D] text-[#607B96] w-full">
      {/* Left Side - Name */}
      <div className="flex items-center justify-between sm:justify-start border-b sm:border-b-0 sm:border-r border-[#1E2D3D]">
        <div className="px-6 py-4 text-white w-full text-center sm:text-left sm:w-[250px] whitespace-nowrap">
          batuhan-kucuk
        </div>
        {/* Mobile Menu Button */}
        <div className="flex items-center sm:hidden pr-4">
          <div className="relative group px-4 border-l border-r border-[#1E2D3D] w-[130px]">
            <motion.div 
              className="flex items-center cursor-pointer py-4 px-2"
              whileHover={{ scale: 1.05 }}
            >
              <IoLanguage className="mr-2" size={20} />
              <span className="uppercase">{i18n.language}</span>
            </motion.div>
            <div className="absolute hidden group-hover:block right-0 top-full bg-[#011221] border border-[#1E2D3D] rounded-b-lg overflow-hidden w-[130px] z-50">
              <motion.button
                className="w-full px-4 py-2 text-left hover:bg-[#1E2D3D] transition-colors"
                onClick={() => changeLanguage('en')}
                whileHover={{ x: 5 }}
              >
                English
              </motion.button>
              <motion.button
                className="w-full px-4 py-2 text-left hover:bg-[#1E2D3D] transition-colors"
                onClick={() => changeLanguage('tr')}
                whileHover={{ x: 5 }}
              >
                Türkçe
              </motion.button>
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-[#607B96] hover:text-white"
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation Links - Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="sm:hidden border-b border-[#1E2D3D] overflow-hidden"
            {...menuAnimation}
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                to="/"
                className={`block px-4 py-3 border-b border-[#1E2D3D] hover:text-white hover:bg-[#1E2D3D] transition-colors ${
                  currentPath === "/" ? "text-white bg-[#1E2D3D]" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.hello')}
              </Link>
              <Link
                to="/about"
                className={`block px-4 py-3 border-b border-[#1E2D3D] hover:text-white hover:bg-[#1E2D3D] transition-colors ${
                  currentPath === "/about" ? "text-white bg-[#1E2D3D]" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link
                to="/projects"
                className={`block px-4 py-3 border-b border-[#1E2D3D] hover:text-white hover:bg-[#1E2D3D] transition-colors ${
                  currentPath === "/projects" ? "text-white bg-[#1E2D3D]" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.projects')}
              </Link>
              <Link
                to="/hire"
                className={`block px-4 py-3 border-b border-[#1E2D3D] hover:text-white hover:bg-[#1E2D3D] transition-colors ${
                  currentPath === "/hire" ? "text-white bg-[#1E2D3D]" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.hire')}
              </Link>
              <Link
                to="/contact"
                className={`block px-4 py-3 hover:text-white hover:bg-[#1E2D3D] transition-colors ${
                  currentPath === "/contact" ? "text-white bg-[#1E2D3D]" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex flex-row flex-wrap sm:flex-nowrap w-full justify-center sm:justify-start">
        <div className="flex flex-row flex-wrap sm:flex-nowrap justify-center sm:justify-start">
          <Link
            to="/"
            className={`flex-shrink-0 text-center px-4 sm:px-8 py-4 border-l border-r border-[#1E2D3D] hover:text-white hover:bg-[#1E2D3D] transition-colors ${
              currentPath === "/" ? "text-white border-b-2 border-b-[#FEA55F]" : ""
            }`}
          >
            {t('nav.hello')}
          </Link>
          <Link
            to="/about"
            className={`flex-shrink-0 text-center px-4 sm:px-8 py-4 border-r border-[#1E2D3D] hover:text-white hover:bg-[#1E2D3D] transition-colors ${
              currentPath === "/about" ? "text-white border-b-2 border-b-[#FEA55F]" : ""
            }`}
          >
            {t('nav.about')}
          </Link>
          <Link
            to="/projects"
            className={`flex-shrink-0 text-center px-4 sm:px-8 py-4 border-r border-[#1E2D3D] hover:text-white hover:bg-[#1E2D3D] transition-colors ${
              currentPath === "/projects" ? "text-white border-b-2 border-b-[#FEA55F]" : ""
            }`}
          >
            {t('nav.projects')}
          </Link>
          <Link
            to="/hire"
            className={`flex-shrink-0 text-center px-4 sm:px-8 py-4 border-r border-[#1E2D3D] hover:text-white hover:bg-[#1E2D3D] transition-colors ${
              currentPath === "/hire" ? "text-white border-b-2 border-b-[#FEA55F]" : ""
            }`}
          >
            {t('nav.hire')}
          </Link>
        </div>
        <div className="flex items-center ml-auto">
          <Link
            to="/contact"
            className={`flex-shrink-0 text-center px-4 sm:px-8 py-4 border-r border-[#1E2D3D] hover:text-white hover:bg-[#1E2D3D] transition-colors ${
              currentPath === "/contact" ? "text-white border-b-2 border-b-[#FEA55F]" : ""
            }`}
          >
            {t('nav.contact')}
          </Link>
          <div className="relative group px-4 border-l border-r border-[#1E2D3D] w-[130px]">
            <motion.div 
              className="flex items-center cursor-pointer py-4 px-2"
              whileHover={{ scale: 1.05 }}
            >
              <IoLanguage className="mr-2" size={20} />
              <span className="uppercase">{i18n.language}</span>
            </motion.div>
            <div className="absolute hidden group-hover:block right-0 top-full bg-[#011221] border border-2 border-[#1E2D3D] rounded-b-lg overflow-hidden w-[130px] z-50 text-center">
              <motion.button
                className="w-full py-2 text-left hover:bg-[#1E2D3D] transition-colors text-center"
                onClick={() => changeLanguage('en')}
                whileHover={{ x: 5 }}
              >
                English
              </motion.button>
              <motion.button
                className="w-full py-2 text-left hover:bg-[#1E2D3D] transition-colors text-center"
                onClick={() => changeLanguage('tr')}
                whileHover={{ x: 5 }}
              >
                Türkçe
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
