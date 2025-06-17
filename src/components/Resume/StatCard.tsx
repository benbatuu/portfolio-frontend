import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

const StatCard = ({ title, value, description, icon: Icon }: StatCardProps) => {
  return (
    <div className="bg-[#011627] border border-[#1E2D3D] rounded-xl p-6 hover:border-[#43D9AD] transition-colors duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-mono text-white group-hover:text-[#43D9AD] transition-colors duration-300">
          {title}
        </h3>
        <Icon className="w-6 h-6 text-[#43D9AD]" />
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <p className="text-[#607B96] text-sm">{description}</p>
    </div>
  );
};

export default StatCard;