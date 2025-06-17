import { ErrorBoundary } from 'react-error-boundary';
import { TimelineProps } from '../../types/translation';
import { useRef, useState, useEffect } from 'react';

const ErrorFallback = () => (
  <div className="text-center p-4 bg-red-500/10 border border-red-500 rounded-lg">
    <p className="text-red-500">Something went wrong loading the timeline section.</p>
  </div>
);

const Timeline = ({ title, description, items = [], type }: TimelineProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const itemWidth = isMobile ? 400 : 400 + 32; // card width + gap
      const newIndex = Math.round(scrollPosition / itemWidth);
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const itemWidth = isMobile ? 400 : 400 + 32;
      sliderRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < safeItems.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  // If no items, show a message
  if (safeItems.length === 0) {
    return (
      <section className="py-20 bg-[#011627] relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-mono text-white mb-4">{title}</h2>
            <p className="text-lg text-[#607B96] max-w-2xl mx-auto">{description}</p>
            <p className="mt-8 text-[#607B96]">No items to display</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className="py-20 bg-[#011627] relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-r from-[#43D9AD] to-[#4D5BCE] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#4D5BCE] to-[#43D9AD] opacity-5 rounded-full blur-3xl" />
        
        <div className="relative z-10 mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-mono text-white mb-4">{title}</h2>
            <p className="text-lg text-[#607B96] max-w-2xl mx-auto">{description}</p>
          </div>
          
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#1E2D3D] text-[#43D9AD] transition-all duration-300 hover:bg-[#43D9AD] hover:text-[#011627] disabled:opacity-50 disabled:cursor-not-allowed ${
                activeIndex === 0 ? 'opacity-50' : ''
              }`}
              aria-label="Previous item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === safeItems.length - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#1E2D3D] text-[#43D9AD] transition-all duration-300 hover:bg-[#43D9AD] hover:text-[#011627] disabled:opacity-50 disabled:cursor-not-allowed ${
                activeIndex === safeItems.length - 1 ? 'opacity-50' : ''
              }`}
              aria-label="Next item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Timeline items container */}
            <div 
              ref={sliderRef}
              className={`flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory cursor-grab active:cursor-grabbing scroll-smooth ${
                isMobile ? 'px-4' : 'px-16'
              }`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {safeItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex-none snap-center ${
                    isMobile ? 'w-[calc(100%-2rem)]' : 'w-[400px]'
                  }`}
                >
                  {/* Timeline dot with pulse animation */}
                  <div className="relative">
                    <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#43D9AD] border-4 border-[#011627] transition-all duration-300 ${
                      activeIndex === index ? 'scale-125 shadow-lg shadow-[#43D9AD]/20' : ''
                    }`}>
                      <div className={`absolute inset-0 rounded-full bg-[#43D9AD] animate-ping opacity-20 ${
                        activeIndex === index ? 'block' : 'hidden'
                      }`}></div>
                    </div>
                  </div>
                  
                  {/* Content card with hover effects */}
                  <div className={`mt-4 p-6 rounded-xl bg-[#011627] border transition-all duration-300 ${
                    activeIndex === index 
                      ? 'border-[#43D9AD] shadow-lg shadow-[#43D9AD]/10' 
                      : 'border-[#1E2D3D] hover:border-[#43D9AD]'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-mono text-white">{item.title}</h3>
                      <span className="text-sm text-[#43D9AD]">{item.period}</span>
                    </div>
                    {type === 'experience' ? (
                      <p className="text-[#607B96] mb-4">{item.company}</p>
                    ) : (
                      <p className="text-[#607B96] mb-4">{item.school}</p>
                    )}
                    <p className="text-[#607B96]">{item.description}</p>
                    {type === 'experience' && item.technologies && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-sm bg-[#1E2D3D] text-[#43D9AD] rounded transition-colors duration-300 hover:bg-[#43D9AD] hover:text-[#011627]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {safeItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-[#43D9AD] w-4' 
                      : 'bg-[#1E2D3D] hover:bg-[#43D9AD]/50'
                  }`}
                  aria-label={`Go to item ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Timeline;