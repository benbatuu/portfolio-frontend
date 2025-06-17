import { ErrorBoundary } from 'react-error-boundary';
import StatCard from './StatCard';
import { Code, Briefcase, Award, Star } from 'lucide-react';
import { StatsSectionProps } from '../../types/translation';

const ErrorFallback = () => (
  <div className="text-center p-4 bg-red-500/10 border border-red-500 rounded-lg">
    <p className="text-red-500">Something went wrong loading the stats section.</p>
  </div>
);

const StatsSection: React.FC<StatsSectionProps> = ({ title, description, items }) => {
  const iconMap = {
    Code,
    Briefcase,
    Award,
    Star
  };

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((stat, index) => {
              const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
              return (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  description={stat.description}
                  icon={IconComponent}
                />
              );
            })}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default StatsSection;