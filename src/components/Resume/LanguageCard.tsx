import { ErrorBoundary } from 'react-error-boundary';
import { LanguageCardProps } from '../../types/translation';

const ErrorFallback = () => (
  <div className="text-center p-4 bg-red-500/10 border border-red-500 rounded-lg">
    <p className="text-red-500">Something went wrong loading the languages section.</p>
  </div>
);

const LanguageCard = ({title, description, items }: LanguageCardProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className="py-20 bg-[#011627] relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-r from-[#43D9AD] to-[#4D5BCE] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#4D5BCE] to-[#43D9AD] opacity-5 rounded-full blur-3xl" />
        
        <div className="relative z-10  mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-mono text-white mb-4">{title}</h2>
            <p className="text-lg text-[#607B96] max-w-2xl mx-auto">{description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((language, index) => (
              <div
                key={index}
                className="bg-[#011627] border border-[#1E2D3D] rounded-xl p-6 hover:border-[#43D9AD] transition-colors duration-300 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={language.flag}
                    alt={`${language.name} flag`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-mono text-white group-hover:text-[#43D9AD] transition-colors">
                      {language.name}
                    </h3>
                    <p className="text-[#607B96]">{language.level}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default LanguageCard;