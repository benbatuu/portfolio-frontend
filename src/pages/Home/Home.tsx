import { CodeBlocks } from "../../components/CodeBlocks/CodeBlocks";
import { Navbar } from "../../components/Navbar/Navbar";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#010C15] to-[#011221] text-[#607B96]">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-116px)] items-center flex-1 relative">
        {/* Left Content */}
        <div className="w-full lg:w-[45%] px-6 md:px-12 lg:px-24 text-center lg:text-left relative z-10 mb-12 lg:mb-0 mt-12 md:ml-40 lg:ml-40">
          <p className="text-xl md:text-2xl lg:text-4xl">{t('home.greeting')}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono text-white mt-2">Batuhan Küçük</h1>
          <div className="flex items-center mt-2 text-[#4D5BCE] justify-center lg:justify-start">
            <span className="mr-2">&gt;</span>
            <p className="text-xl md:text-2xl lg:text-4xl">{t('home.role')}</p>
          </div>

          <div className="mt-12 lg:mt-28 font-mono text-xs md:text-sm">
            <p className="text-[#607B96]">{t('home.githubText')}</p>
            <div className="flex items-center mt-1 space-x-2 justify-center lg:justify-start">
              <span className="text-[#4D5BCE]">const</span>
              <span className="text-[#43D9AD]">githubLink</span>
              <span className="text-white">=</span>
              <a
                href={t('home.githubLink')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E99287] hover:underline text-xs lg:text-base md:text-lg"
              >
                "{t('home.githubLink')}"
              </a>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-[55%] h-full">
          {/* Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-[#43D9AD] to-[#4D5BCE] opacity-[0.07] blur-[150px]" />
          <div className="relative z-10">
            <CodeBlocks />
          </div>
        </div>
      </div>
    </div>
  );
};
