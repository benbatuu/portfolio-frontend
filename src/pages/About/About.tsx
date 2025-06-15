import { FaGithub } from "react-icons/fa";
import { Navbar } from "../../components/Navbar/Navbar";
import { useState } from "react";
import { IoMdFolder, IoMdFolderOpen } from "react-icons/io";
import { HiMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdSchool, MdWork } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export const About = () => {
  const [activeSection, setActiveSection] = useState("bio");
  const [openFolders, setOpenFolders] = useState<string[]>(["personal-info"]);
  const { t } = useTranslation();

  const toggleFolder = (folder: string) => {
    if (openFolders.includes(folder)) {
      setOpenFolders(openFolders.filter(f => f !== folder));
    } else {
      setOpenFolders([...openFolders, folder]);
    }
  };

  const bioCode = `/**
 * ${t('about.bio.title')}
 */

const bio = {
  ${t('about.personalInfo.name')}: "Batuhan Küçük",
  ${t('about.personalInfo.role')}: "${t('experience.roles.fullstack')}",
  ${t('about.personalInfo.description')}: [
    ${(t('about.bio.description', { returnObjects: true }) as string[]).map(paragraph => `"${paragraph}"`).join(',\n    ')}
  ],
  ${t('about.personalInfo.interests')}: [
    ${(t('about.bio.interestsList', { returnObjects: true }) as string[]).map(interest => `"${interest}"`).join(',\n    ')}
  ]
}`;

  const educationCode = `/**
 * ${t('education.title')}
 */

const ${t('code.education')} = {
  ${t('code.university')}: [
    {
      ${t('code.school')}: "${t('education.university.isik.name')}",
      ${t('code.degree')}: "${t('education.university.isik.degree')}",
      ${t('code.period')}: "${t('education.university.isik.period')}",
      ${t('code.details')}: "${t('education.university.isik.details')}"
    },
    {
      ${t('code.school')}: "${t('education.university.kirklareli.name')}",
      ${t('code.degree')}: "${t('education.university.kirklareli.degree')}",
      ${t('code.period')}: "${t('education.university.kirklareli.period')}",
      ${t('code.achievement')}: "${t('education.university.kirklareli.achievement')}"
    }
  ],
  ${t('code.languages')}: [
    "${t('education.turkish')}",
    "${t('education.english')}"
  ]
}`;

  const experienceCode = `/**
 * ${t('experience.title')}
 */

const ${t('code.experience')} = {
  ${t('code.current')}: {
    ${t('code.company')}: [
      "${t('experience.companies.dna.name')}"
    ],
    ${t('code.period')}: "${t('experience.companies.dna.period')}",
    ${t('code.role')}: "${t('experience.roles.fullstack')}"
  },
  ${t('code.previous')}: [
    {
      ${t('code.company')}: "${t('experience.companies.realtor.name')}",
      ${t('code.period')}: "${t('experience.companies.realtor.period')}",
      ${t('code.role')}: "${t('experience.roles.software')}"
    },
    {
      ${t('code.company')}: "${t('experience.companies.smk.name')}",
      ${t('code.period')}: "${t('experience.companies.smk.period')}",
      ${t('code.role')}: "${t('experience.roles.web')}"
    },
    {
      ${t('code.company')}: "${t('experience.companies.grafil.name')}",
      ${t('code.period')}: "${t('experience.companies.grafil.period')}",
      ${t('code.role')}: "${t('experience.roles.web')}"
    }
  ]
}`;

  const contactCode = `/**
 * ${t('contact.title')}
 */

const ${t('code.contact')} = {
  ${t('code.email')}: "mailto:bennbatuu@gmail.com",
  ${t('code.phone')}: "tel:+905414725820",
  ${t('code.social')}: {
    ${t('code.github')}: "https://github.com/bennbatuu",
    ${t('code.instagram')}: "https://www.instagram.com/bennbatuu",
    ${t('code.linkedin')}: "https://www.linkedin.com/in/bennbatuu"
  },
  ${t('code.location')}: "Turkey"
}`;

  const getActiveCode = () => {
    switch (activeSection) {
      case "bio":
        return bioCode;
      case "education":
        return educationCode;
      case "experience":
        return experienceCode;
      case "contact":
        return contactCode;
      default:
        return bioCode;
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  const codeAnimation = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3 }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "bio":
        return (
          <div className="space-y-6 pb-8 lg:pb-0 md:pb-0">
            <div className="mb-6">
              <h3 className="text-2xl text-white mb-2">Batuhan Küçük</h3>
              <p className="text-[#4D5BCE]">{t('experience.roles.fullstack')}</p>
            </div>
            <div className="space-y-6">
              {(t('about.bio.description', { returnObjects: true }) as string[]).map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div>
                <h4 className="text-[#FEA55F] mb-2">{t('about.bio.interests')}</h4>
                <div className="flex flex-wrap gap-2">
                  {(t('about.bio.interestsList', { returnObjects: true }) as string[]).map((interest: string) => (
                    <span key={interest} className="px-3 py-1 bg-[#1E2D3D] rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "education":
        return (
          <div className="space-y-6 pb-72 lg:pb-0 md:pb-0">
            <div className="mb-6">
              <h3 className="text-2xl text-white mb-2">{t('education.title')}</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="mb-6">
                  <h4 className="text-[#FEA55F] text-lg">{t('education.university.isik.name')}</h4>
                  <p className="text-[#4D5BCE]">{t('education.university.isik.degree')}</p>
                  <p className="text-sm">{t('education.university.isik.period')} • {t('education.university.isik.details')}</p>
                </div>
                <div className="mb-6">
                  <h4 className="text-[#FEA55F] text-lg">{t('education.university.kirklareli.name')}</h4>
                  <p className="text-[#4D5BCE]">{t('education.university.kirklareli.degree')}</p>
                  <p className="text-sm">{t('education.university.kirklareli.period')} • {t('education.university.kirklareli.achievement')}</p>
                </div>
              </div>
              <div>
                <h4 className="text-[#FEA55F] mb-2">{t('education.languages')}</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="text-[#43D9AD] mr-2">•</span>
                    <span>{t('education.turkish')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#43D9AD] mr-2">•</span>
                    <span>{t('education.english')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="space-y-6 pb-72 lg:pb-0 md:pb-0">
            <div className="mb-6">
              <h3 className="text-2xl text-white mb-2">{t('experience.title')}</h3>
            </div>
            <div className="space-y-6">
              <div className="mb-6">
                <h4 className="text-[#FEA55F] text-lg">{t('experience.companies.dna.name')}</h4>
                <p className="text-[#4D5BCE]">{t('experience.roles.fullstack')}</p>
                <p className="text-sm">{t('experience.companies.dna.period')}</p>
              </div>
              <div className="mb-6">
                <h4 className="text-[#FEA55F] text-lg">{t('experience.companies.realtor.name')}</h4>
                <p className="text-[#4D5BCE]">{t('experience.roles.software')}</p>
                <p className="text-sm">{t('experience.companies.realtor.period')}</p>
              </div>
              <div className="mb-6">
                <h4 className="text-[#FEA55F] text-lg">{t('experience.companies.smk.name')}</h4>
                <p className="text-[#4D5BCE]">{t('experience.roles.web')}</p>
                <p className="text-sm">{t('experience.companies.smk.period')}</p>
              </div>
              <div className="mb-6">
                <h4 className="text-[#FEA55F] text-lg">{t('experience.companies.grafil.name')}</h4>
                <p className="text-[#4D5BCE]">{t('experience.roles.web')}</p>
                <p className="text-sm">{t('experience.companies.grafil.period')}</p>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-6 pb-72 lg:pb-0 md:pb-0">
            <h3 className="text-2xl text-white mb-6">{t('contact.title')}</h3>
            
            {/* Direct Contact Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <a 
                href="mailto:bennbatuu@gmail.com" 
                className="bg-[#011627] border border-[#1E2D3D] rounded-lg p-4 hover:border-[#607B96] transition-colors group"
              >
                <div className="flex items-center mb-2">
                  <HiMail className="text-[#FEA55F] mr-3" size={24} />
                  <span className="text-[#E5E9F0] group-hover:text-white transition-colors">Email</span>
                </div>
                <p className="text-[#607B96] group-hover:text-[#E5E9F0] transition-colors">bennbatuu@gmail.com</p>
              </a>

              <a 
                href="tel:+905414725820" 
                className="bg-[#011627] border border-[#1E2D3D] rounded-lg p-4 hover:border-[#607B96] transition-colors group"
              >
                <div className="flex items-center mb-2">
                  <FaPhoneAlt className="text-[#FEA55F] mr-3" size={24} />
                  <span className="text-[#E5E9F0] group-hover:text-white transition-colors">Phone</span>
                </div>
                <p className="text-[#607B96] group-hover:text-[#E5E9F0] transition-colors">+90 541 472 58 20</p>
              </a>
            </div>

            {/* Social Links Section */}
            <div className="space-y-4">
              <h4 className="text-[#E5E9F0] text-lg mb-4">Social Links</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="https://github.com/benbatuu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#011627] border border-[#1E2D3D] rounded-lg p-4 hover:border-[#607B96] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaGithub className="text-[#FEA55F] mr-3" size={24} />
                      <span className="text-[#E5E9F0] group-hover:text-white transition-colors">GitHub</span>
                    </div>
                    <span className="text-[#4D5BCE]">→</span>
                  </div>
                </a>

                <a 
                  href="https://www.instagram.com/bennbatuu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#011627] border border-[#1E2D3D] rounded-lg p-4 hover:border-[#607B96] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaInstagram className="text-[#FEA55F] mr-3" size={24} />
                      <span className="text-[#E5E9F0] group-hover:text-white transition-colors">Instagram</span>
                    </div>
                    <span className="text-[#4D5BCE]">→</span>
                  </div>
                </a>

                <a 
                  href="https://www.linkedin.com/in/bennbatuu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#011627] border border-[#1E2D3D] rounded-lg p-4 hover:border-[#607B96] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaLinkedin className="text-[#FEA55F] mr-3" size={24} />
                      <span className="text-[#E5E9F0] group-hover:text-white transition-colors">LinkedIn</span>
                    </div>
                    <span className="text-[#4D5BCE]">→</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Location Section */}
            <div className="mt-8 pt-6 border-t border-[#1E2D3D]">
              <div className="bg-[#011627] border border-[#1E2D3D] rounded-lg p-4">
                <p className="text-[#4D5BCE] mb-1">{t('contact.location')}</p>
                <p className="text-[#E5E9F0]">Turkey</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#010C15] to-[#011221] text-[#607B96]">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-[252px] flex-shrink-0 border-b md:border-b-0 border-r border-[#1E2D3D] bg-[#011627]/50 md:bg-transparent">
          <div className="p-4">
            <div className="mb-4">
              <motion.div 
                className="flex items-center cursor-pointer py-1"
                onClick={() => toggleFolder("personal-info")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {openFolders.includes("personal-info") ? <IoMdFolderOpen className="mr-2" /> : <IoMdFolder className="mr-2" />}
                <span>{t('about.personalInfo.folder')}</span>
              </motion.div>
              <AnimatePresence>
                {openFolders.includes("personal-info") && (
                  <motion.div 
                    className="ml-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className={`flex items-center py-1 cursor-pointer ${activeSection === "bio" ? "text-white" : ""}`}
                      onClick={() => setActiveSection("bio")}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HiMail className="mr-2" /> {t('about.personalInfo.bio')}
                    </motion.div>
                    <motion.div 
                      className={`flex items-center py-1 cursor-pointer ${activeSection === "education" ? "text-white" : ""}`}
                      onClick={() => setActiveSection("education")}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MdSchool className="mr-2" /> {t('about.personalInfo.education')}
                    </motion.div>
                    <motion.div 
                      className={`flex items-center py-1 cursor-pointer ${activeSection === "experience" ? "text-white" : ""}`}
                      onClick={() => setActiveSection("experience")}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MdWork className="mr-2" /> {t('about.personalInfo.experience')}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div 
              className="flex items-center cursor-pointer py-1"
              onClick={() => {
                toggleFolder("contacts");
                setActiveSection("contact");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {openFolders.includes("contacts") ? <IoMdFolderOpen className="mr-2" /> : <IoMdFolder className="mr-2" />}
              <span className={activeSection === "contact" ? "text-white" : ""}>{t('about.personalInfo.contacts')}</span>
            </motion.div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row max-h-[calc(100vh-116px)] md:max-h-full overflow-auto">
          {/* Code Block */}
          <div className="w-full md:w-1/2 p-4 border-r border-[#1E2D3D]">
            <div className="bg-[#011221] p-4 rounded-lg">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeSection}
                  className="font-mono text-sm whitespace-pre-wrap"
                  {...codeAnimation}
                >
                  <code className="text-[#607B96]">
                    {getActiveCode()}
                  </code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>

          {/* Output/Details */}
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-[#011221] p-4 rounded-lg">
              <div className="mb-4 flex items-center">
                <img
                  src="https://github.com/benbatuu.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <div className="text-white">{t('footer.username')}</div>
                  <div className="text-sm">{t('footer.createdAt')}</div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  {...fadeInUp}
                  className="overflow-x-auto"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 