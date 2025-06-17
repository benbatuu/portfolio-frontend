import { useTranslation } from 'react-i18next';
// Components
import HeroSection from '../../components/Resume/HeroSection';
import StatsSection from '../../components/Resume/StatsSection';
import Timeline from '../../components/Resume/Timeline';
import SkillChart from '../../components/Resume/SkillChart';
import LanguageCard from '../../components/Resume/LanguageCard';
import { Navbar } from '../../components/Navbar/Navbar';
// Types
import { LanguageItem, SkillItem, StatItem, TimelineItem } from '../../types/translation';

export const Resume = () => {
  const { t } = useTranslation();

  const statsItems = t('resume.stats.items', { returnObjects: true }) as StatItem[] || [];
  const experienceItems = t('resume.experience.jobs', { returnObjects: true }) as TimelineItem[] || [];
  const educationItems = t('resume.education.items', { returnObjects: true }) as TimelineItem[] || [];
  const skillItems = t('resume.skills.items', { returnObjects: true }) as SkillItem[] || [];
  const languageItems = t('resume.languages.items', { returnObjects: true }) as LanguageItem[] || [];

  // Ensure all items are arrays
  const safeExperienceItems = Array.isArray(experienceItems) ? experienceItems : [];
  const safeEducationItems = Array.isArray(educationItems) ? educationItems : [];
  const safeStatsItems = Array.isArray(statsItems) ? statsItems : [];
  const safeSkillItems = Array.isArray(skillItems) ? skillItems : [];
  const safeLanguageItems = Array.isArray(languageItems) ? languageItems : [];

  return (
    <div className="h-full bg-[#011627] text-white overflow-y-auto">
      <Navbar />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection
          name={t('resume.hero.name')}
          title={t('resume.hero.title')}
          description={t('resume.hero.description')}
          downloadCV={t('resume.hero.downloadCV')}
          email={t('resume.hero.email')}
          phone={t('resume.hero.phone')}
          location={t('resume.hero.location')}
        />

        <StatsSection
          title={t('resume.stats.title')}
          description={t('resume.stats.description')}
          items={safeStatsItems}
        />

        <div className="mt-12 space-y-4">
          <Timeline
            title={t('resume.experience.title')}
            description={t('resume.experience.description')}
            items={safeExperienceItems}
            type="experience"
          />

          <Timeline
            title={t('resume.education.title')}
            description={t('resume.education.description')}
            items={safeEducationItems}
            type="education"
          />
        </div>

        <div className="mt-12 space-y-4">
          <SkillChart
            title={t('resume.skills.title')}
            description={t('resume.skills.description')}
            items={safeSkillItems}
          />

          <LanguageCard
            title={t('resume.languages.title')}
            description={t('resume.languages.description')}
            items={safeLanguageItems}
          />
        </div>
      </div>
    </div>
  );
};