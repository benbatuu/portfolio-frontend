export type  StatItem = {
  title: string;
  value: number | string;
  description: string;
  icon: string;
}

export type TimelineItem = {
  title: string;
  period: string;
  description: string;
  company?: string;
  school?: string;
  technologies?: string[];
}

export type SkillItem = {
  name: string;
  level: number;
  category: string;
}

export type LanguageItem = {
  name: string;
  level: string;
  flag: string;
}

export type HeroSectionProps = {
  name: string;
  title: string;
  description: string;
  downloadCV: string;
  email: string;
  phone: string;
  location: string;
}

export type StatsSectionProps =  {
  title: string;
  description: string;
  items: StatItem[];
}

export type TimelineProps = {
  title: string;
  description: string;
  items: TimelineItem[];
  type: 'experience' | 'education';
}

export type SkillChartProps = {
  title: string;
  description: string;
  items: SkillItem[];
}


export type  LanguageCardProps = {
  title: string;
  description: string;
  items: LanguageItem[];
}