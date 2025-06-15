import { Navbar } from "../../components/Navbar/Navbar";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface ContactForm {
  name: string;
  email: string;
  company: string;
  position: string;
  budget: string;
  projectType: string;
  timeline: string;
  message: string;
}

interface Testimonial {
  name: string;
  company: string;
  position: string;
  message: string;
  rating: number;
  flag: string;
}

export const HireMe = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    position: '',
    budget: '',
    projectType: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentLanguage = i18n.language;

  const services = [
    {
      titleKey: 'hireMe.services.frontend.title',
      descriptionKey: 'hireMe.services.frontend.description',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      icon: '💻',
      projectTypeValue: 'web-app'
    },
    {
      titleKey: 'hireMe.services.fullstack.title',
      descriptionKey: 'hireMe.services.fullstack.description',
      technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
      icon: '🚀',
      projectTypeValue: 'full-stack'
    },
    {
      titleKey: 'hireMe.services.mobile.title',
      descriptionKey: 'hireMe.services.mobile.description',
      technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
      icon: '📱',
      projectTypeValue: 'mobile-app'
    },
    {
      titleKey: 'hireMe.services.uiux.title',
      descriptionKey: 'hireMe.services.uiux.description',
      technologies: ['Figma', 'CSS3', 'SCSS', 'Animations'],
      icon: '🎨',
      projectTypeValue: 'landing-page'
    }
  ];

  const testimonialsTr: Testimonial[] = [
    {
      name: 'Ahmet Yılmaz',
      company: 'TechCorp Türkiye',
      position: 'CTO',
      message: 'Mükemmel kod kalitesi ve zamanında teslim. E-ticaret sitemizi baştan sona geliştirdi, her detayı özenle çalıştı. Kesinlikle tavsiye ederim.',
      rating: 5,
      flag: '🇹🇷'
    },
    {
      name: 'Elif Kaya',
      company: 'Startupİstanbul',
      position: 'Ürün Müdürü',
      message: 'Projemizi beklentilerimizin üzerinde tamamladı. React Native ile geliştirdiği mobil uygulama harika çalışıyor. Çok profesyonel yaklaşım.',
      rating: 5,
      flag: '🇹🇷'
    },
    {
      name: 'Mehmet Demir',
      company: 'Dijital Ajans',
      position: 'Kreatif Direktör',
      message: 'Figma tasarımlarımızı birebir koda çevirdi. Animasyonlar ve etkileşimler mükemmel. Müşterilerimiz çok memnun kaldı.',
      rating: 5,
      flag: '🇹🇷'
    },
    {
      name: 'Zeynep Özkan',
      company: 'FinTech Solutions',
      position: 'Kurucu',
      message: 'Finansal uygulamamızı güvenlik standartlarına uygun şekilde geliştirdi. Kod kalitesi ve dokümantasyon çok iyi.',
      rating: 5,
      flag: '🇹🇷'
    },
    {
      name: 'Can Erdem',
      company: 'EdTech Platform',
      position: 'Genel Müdür',
      message: 'Eğitim platformumuzun frontend kısmını Next.js ile yeniden yazdı. Performans artışı inanılmaz, kullanıcı deneyimi harika.',
      rating: 5,
      flag: '🇹🇷'
    }
  ];

  const testimonialsEn: Testimonial[] = [
    {
      name: 'John Smith',
      company: 'WebFlow Inc.',
      position: 'Lead Developer',
      message: 'Outstanding work quality and attention to detail. Built our entire dashboard from scratch using React and TypeScript. Highly professional.',
      rating: 5,
      flag: '🇺🇸'
    },
    {
      name: 'Sarah Johnson',
      company: 'TechStart Berlin',
      position: 'CEO',
      message: 'Delivered our MVP ahead of schedule with excellent code quality. The React Native app works flawlessly across all devices.',
      rating: 5,
      flag: '🇩🇪'
    },
    {
      name: 'Michael Chen',
      company: 'Digital Solutions',
      position: 'Product Manager',
      message: 'Perfect implementation of our Figma designs. The animations and micro-interactions are smooth and engaging. Great collaboration.',
      rating: 5,
      flag: '🇨🇦'
    },
    {
      name: 'Emma Wilson',
      company: 'CloudTech Ltd.',
      position: 'CTO',
      message: 'Built our cloud management platform with Next.js and Node.js. Scalable architecture and clean code. Excellent communication throughout.',
      rating: 5,
      flag: '🇬🇧'
    },
    {
      name: 'David Rodriguez',
      company: 'Innovate Labs',
      position: 'Founder',
      message: 'Transformed our legacy system into a modern React application. Performance improvements were remarkable. True professional.',
      rating: 5,
      flag: '🇪🇸'
    },
    {
      name: 'Lisa Anderson',
      company: 'HealthTech Solutions',
      position: 'Director',
      message: 'Developed our patient management system with security and compliance in mind. Code quality and documentation are exceptional.',
      rating: 5,
      flag: '🇦🇺'
    }
  ];

  const currentTestimonials = currentLanguage === 'tr' ? testimonialsTr : testimonialsEn;

  const handleServiceClick = (projectTypeValue: string) => {
    setFormData(prev => ({
      ...prev,
      projectType: projectTypeValue
    }));
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulated form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '', email: '', company: '', position: '', 
        budget: '', projectType: '', timeline: '', message: ''
      });
      setIsModalOpen(false);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'React': 'bg-cyan-500/20 text-cyan-300',
      'Next.js': 'bg-white/20 text-white',
      'TypeScript': 'bg-blue-500/20 text-blue-300',
      'Tailwind CSS': 'bg-teal-500/20 text-teal-300',
      'Node.js': 'bg-green-500/20 text-green-300',
      'Express': 'bg-gray-500/20 text-gray-300',
      'MongoDB': 'bg-green-600/20 text-green-400',
      'PostgreSQL': 'bg-blue-600/20 text-blue-400',
      'React Native': 'bg-cyan-600/20 text-cyan-400',
      'Expo': 'bg-purple-500/20 text-purple-300',
      'Firebase': 'bg-yellow-500/20 text-yellow-300',
      'Redux': 'bg-purple-600/20 text-purple-400',
      'Figma': 'bg-pink-500/20 text-pink-300',
      'CSS3': 'bg-blue-500/20 text-blue-300',
      'SCSS': 'bg-pink-600/20 text-pink-400',
      'Animations': 'bg-orange-500/20 text-orange-300'
    };
    return colors[tech] || 'bg-[#1E2D3D] text-[#607B96]';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010C15] to-[#011221] text-[#607B96]">
      <Navbar />

      <div className="p-8 overflow-y-auto pb-24 max-h-screen">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white font-bold mb-4">
            {t('hireMe.title')}
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            {t('hireMe.subtitle')}
          </p>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h2 className="text-2xl text-white font-semibold mb-8 text-center">
            {t('hireMe.servicesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceClick(service.projectTypeValue)}
                className="border border-[#1E2D3D] rounded-lg p-6 hover:border-[#607B96] transition-all duration-300 hover:shadow-lg hover:shadow-[#43D9AD]/10 cursor-pointer hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{service.icon}</span>
                  <h3 className="text-xl text-white font-semibold">{t(service.titleKey)}</h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed">{t(service.descriptionKey)}</p>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`text-xs px-2 py-1 rounded-md ${getTechColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-2xl text-white font-semibold mb-8 text-center">
            {t('hireMe.testimonialsTitle')}
          </h2>
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4" style={{ width: `${currentTestimonials.length * 350}px` }}>
              {currentTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 border border-[#1E2D3D] rounded-lg p-6 hover:border-[#607B96] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                    <span className="text-lg">{testimonial.flag}</span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed italic">
                    "{testimonial.message}"
                  </p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-[#43D9AD]">
                      {testimonial.position} - {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#010C15] to-[#011221] border border-[#1E2D3D] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-white font-semibold">
                  {t('hireMe.contactTitle')}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#607B96] hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
                  ✅ {t('hireMe.form.successMessage')}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                  ❌ {t('hireMe.form.errorMessage')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    {t('hireMe.form.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-[#1E2D3D] border border-[#607B96] rounded-lg text-white focus:border-[#43D9AD] focus:outline-none transition-colors"
                    placeholder={t('hireMe.form.namePlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    {t('hireMe.form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-[#1E2D3D] border border-[#607B96] rounded-lg text-white focus:border-[#43D9AD] focus:outline-none transition-colors"
                    placeholder={t('hireMe.form.emailPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    {t('hireMe.form.company')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#1E2D3D] border border-[#607B96] rounded-lg text-white focus:border-[#43D9AD] focus:outline-none transition-colors"
                    placeholder={t('hireMe.form.companyPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    {t('hireMe.form.position')}
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#1E2D3D] border border-[#607B96] rounded-lg text-white focus:border-[#43D9AD] focus:outline-none transition-colors"
                    placeholder={t('hireMe.form.positionPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    {t('hireMe.form.projectType')} *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-[#1E2D3D] border border-[#607B96] rounded-lg text-white focus:border-[#43D9AD] focus:outline-none transition-colors"
                  >
                    <option value="">{t('hireMe.form.projectTypePlaceholder')}</option>
                    <option value="web-app">{t('hireMe.form.projectTypes.webApp')}</option>
                    <option value="mobile-app">{t('hireMe.form.projectTypes.mobileApp')}</option>
                    <option value="ecommerce">{t('hireMe.form.projectTypes.ecommerce')}</option>
                    <option value="landing-page">{t('hireMe.form.projectTypes.landingPage')}</option>
                    <option value="full-stack">{t('hireMe.form.projectTypes.fullStack')}</option>
                    <option value="other">{t('hireMe.form.projectTypes.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    {t('hireMe.form.budget')}
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#1E2D3D] border border-[#607B96] rounded-lg text-white focus:border-[#43D9AD] focus:outline-none transition-colors"
                  >
                    <option value="">{t('hireMe.form.budgetPlaceholder')}</option>
                    <option value="5k-15k">{t('hireMe.form.budgetRanges.range1')}</option>
                    <option value="15k-30k">{t('hireMe.form.budgetRanges.range2')}</option>
                    <option value="30k-50k">{t('hireMe.form.budgetRanges.range3')}</option>
                    <option value="50k+">{t('hireMe.form.budgetRanges.range4')}</option>
                    <option value="discuss">{t('hireMe.form.budgetRanges.discuss')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    {t('hireMe.form.timeline')}
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#1E2D3D] border border-[#607B96] rounded-lg text-white focus:border-[#43D9AD] focus:outline-none transition-colors"
                  >
                    <option value="">{t('hireMe.form.timelinePlaceholder')}</option>
                    <option value="asap">{t('hireMe.form.timelines.asap')}</option>
                    <option value="1month">{t('hireMe.form.timelines.oneMonth')}</option>
                    <option value="2-3months">{t('hireMe.form.timelines.twoThreeMonths')}</option>
                    <option value="flexible">{t('hireMe.form.timelines.flexible')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    {t('hireMe.form.contactPreference')}
                  </label>
                  <div className="flex gap-4 text-sm">
                    <a
                      href="mailto:your.email@example.com"
                      className="text-[#43D9AD] hover:underline flex items-center gap-1"
                    >
                      📧 {t('hireMe.form.contactMethods.email')}
                    </a>
                    <a
                      href="https://wa.me/905xxxxxxxxx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#43D9AD] hover:underline flex items-center gap-1"
                    >
                      📱 {t('hireMe.form.contactMethods.whatsapp')}
                    </a>
                    <a
                      href="https://linkedin.com/in/yourprofile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#43D9AD] hover:underline flex items-center gap-1"
                    >
                      💼 {t('hireMe.form.contactMethods.linkedin')}
                    </a>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-white">
                    {t('hireMe.form.message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-3 bg-[#1E2D3D] border border-[#607B96] rounded-lg text-white focus:border-[#43D9AD] focus:outline-none transition-colors resize-vertical"
                    placeholder={t('hireMe.form.messagePlaceholder')}
                  />
                </div>

                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 border border-[#607B96] text-[#607B96] rounded-lg font-semibold hover:border-white hover:text-white transition-colors"
                  >
                    {t('hireMe.form.cancel') || 'İptal'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-[#43D9AD] text-[#010C15] rounded-lg font-semibold hover:bg-[#43D9AD]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin w-4 h-4 border-2 border-[#010C15] border-t-transparent rounded-full"></div>
                        {t('hireMe.form.sending')}
                      </span>
                    ) : (
                      t('hireMe.form.submit')
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};