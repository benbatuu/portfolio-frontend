import { Mail, Phone, MapPin, Linkedin, Download, Github } from 'lucide-react';
import { contactInfo, socialLinks, profileImage } from '../../constants/resumeData';
import { ErrorBoundary } from 'react-error-boundary';
import { HeroSectionProps } from '../../types/translation';

const ErrorFallback = () => (
  <div className="text-center p-4 bg-red-500/10 border border-red-500 rounded-lg">
    <p className="text-red-500">Something went wrong loading the hero section.</p>
  </div>
);

const HeroSection = ({ name, title, description, downloadCV, email, phone, location }: HeroSectionProps) => {
  const iconMap = {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-[#43D9AD] to-[#4D5BCE] opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-[#4D5BCE] to-[#43D9AD] opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Sol taraf - Ana bilgiler */}
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <h1 className="text-5xl font-mono text-white mb-4 animate-in slide-in-from-left duration-1000">
                  {name}
                </h1>
                <p className="text-2xl md:text-3xl text-[#43D9AD] mb-6 animate-in slide-in-from-left duration-1000 delay-300">
                  {title}
                </p>
                <p className="text-lg text-[#607B96] leading-relaxed mb-8 animate-in slide-in-from-left duration-1000 delay-500">
                  {description}
                </p>
              </div>
              
              {/* İletişim bilgileri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((contact, index) => {
                  const IconComponent = iconMap[contact.icon as keyof typeof iconMap];
                  const displayValue = contact.valueKey ? contact.valueKey === 'email' ? email : contact.valueKey === 'phone' ? phone : location : contact.value;
                  
                  return (
                    <div key={index} className="flex items-center justify-center lg:justify-start space-x-3 group">
                      <IconComponent size={20} className="text-[#43D9AD] group-hover:scale-110 transition-transform" />
                      <span className="group-hover:text-white transition-colors">{displayValue}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* Sosyal medya ve butonlar */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => window.open('/cv.pdf', '_blank')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-[#43D9AD] to-[#4D5BCE] text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                >
                  <Download size={20} />
                  <span>{downloadCV}</span>
                </button>
                
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = iconMap[social.icon as keyof typeof iconMap];
                    return (
                      <a 
                        key={index}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-3 rounded-lg transition-colors duration-300 group"
                        style={{ backgroundColor: social.bg }}
                        onMouseEnter={(e) => {
                          const target = e.currentTarget as HTMLAnchorElement;
                          target.style.backgroundColor = social.hoverBg;
                        }}
                        onMouseLeave={(e) => {
                          const target = e.currentTarget as HTMLAnchorElement;
                          target.style.backgroundColor = social.bg;
                        }}
                      >
                        <IconComponent size={20} className="group-hover:text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Sağ taraf - Profil resmi */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-[#43D9AD] shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-[#43D9AD] to-[#4D5BCE] flex items-center justify-center">
                    <img src={profileImage.src} alt={profileImage.alt} className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#43D9AD] to-[#4D5BCE] opacity-0 group-hover:opacity-20 scale-110 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default HeroSection;