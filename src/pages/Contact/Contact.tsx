import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Navbar } from "../../components/Navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdFolder, IoMdFolderOpen } from "react-icons/io";
import { HiMail, HiPhone } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FileUpload } from '../../components/FileUpload';

export const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFolders, setOpenFolders] = useState<string[]>(["contacts", "find-me-also-in"]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada dosya ile birlikte form gönderme işlemi yapılabilir
    console.log('Form Data:', formData);
    console.log('Selected File:', selectedFile);
    setIsSubmitted(true);
  };

  const handleNewMessage = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setSelectedFile(null);
  };

  const toggleFolder = (folder: string) => {
    if (openFolders.includes(folder)) {
      setOpenFolders(openFolders.filter(f => f !== folder));
    } else {
      setOpenFolders([...openFolders, folder]);
    }
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toUpperCase() || '';
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="w-full space-y-8 pt-12">
      <div>
        <label className="block text-[#607B96] mb-2">{t('contact.form.name')}</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-[#011627] border border-[#1E2D3D] rounded p-2.5 text-[#E5E9F0] focus:border-[#607B96] focus:outline-none text-[#465E77]"
        />
      </div>

      <div>
        <label className="block text-[#607B96] mb-2">{t('contact.form.email')}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-[#011627] border border-[#1E2D3D] rounded p-2.5 text-[#E5E9F0] focus:border-[#607B96] focus:outline-none text-[#465E77]"
        />
      </div>

      <FileUpload
        onFileSelect={handleFileSelect}
        label={t('contact.form.upload')}
        acceptedTypes=".pdf,.doc,.docx,.txt"
        maxSizeMB={10}
      />

      <div>
        <label className="block text-[#607B96] mb-2">{t('contact.form.message')}</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={8}
          className="w-full bg-[#011627] border border-[#1E2D3D] rounded p-2.5 text-[#E5E9F0] focus:border-[#607B96] focus:outline-none resize-none text-[#465E77]"
        />
      </div>

      <button
        type="submit"
        className="bg-[#1E2D3D] text-[#E5E9F0] px-4 py-2 rounded hover:bg-[#2b3f57] transition-colors"
      >
        {t('contact.form.submit')}
      </button>
    </form>
  );

  const renderThankYou = () => (
    <div className="w-full flex flex-col items-center justify-center space-y-6 text-center px-12 py-12">
      <h2 className="text-3xl text-white">{t('contact.form.thankYou.title')}</h2>
      <p className="text-[#607B96] text-lg">
        {t('contact.form.thankYou.message')}
      </p>
      <button
        onClick={handleNewMessage}
        className="bg-[#1E2D3D] text-[#E5E9F0] px-4 py-2 rounded hover:bg-[#2b3f57] transition-colors mt-4"
      >
        {t('contact.form.thankYou.newMessage')}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#010C15] to-[#011221] text-[#607B96]">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-[252px] border-b md:border-b-0 md:border-r border-[#1E2D3D] bg-[#011627]/50 md:bg-transparent">
          <div>
            <div>
              <div 
                className="flex items-center cursor-pointer border-t border-b px-4 py-2 border-[#1E2D3D]"
                onClick={() => toggleFolder("contacts")}
              >
                {openFolders.includes("contacts") ? <IoMdFolderOpen className="mr-2" /> : <IoMdFolder className="mr-2" />}
                <span>{t('contact.sidebar.contacts')}</span>
              </div>
              <AnimatePresence>
                {openFolders.includes("contacts") && (
                  <motion.div 
                    className="ml-4 space-y-2 p-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center py-1">
                      <HiMail className="mr-2" /> <a href={`mailto:${t('contact.email')}`} target="_blank" rel="noopener noreferrer">{t('contact.email')}</a>
                    </div>
                    <div className="flex items-center py-1">
                      <HiPhone className="mr-2" /> <a href={`tel:${t('contact.phone')}`} target="_blank" rel="noopener noreferrer">{t('contact.phone')}</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <div 
                className="flex items-center cursor-pointer border-b px-4 py-2 border-[#1E2D3D]"
                onClick={() => toggleFolder("find-me-also-in")}
              >
                {openFolders.includes("find-me-also-in") ? <IoMdFolderOpen className="mr-2" /> : <IoMdFolder className="mr-2" />}
                <span>{t('contact.sidebar.findMe')}</span>
              </div>
              <AnimatePresence>
                {openFolders.includes("find-me-also-in") && (
                  <motion.div 
                    className="ml-4 space-y-2 p-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex flex-row md:flex-col lg:flex-col w-full">
                        <div className="flex items-center pr-2">
                        <FaGithub className="mr-2" /> <a href={t('contact.social.github')} target="_blank" rel="noopener noreferrer">Github</a>
                        </div>  
                        <div className="flex items-center pr-2">
                        <FaInstagram className="mr-2" /> <a href={t('contact.social.instagram')} target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                        <div className="flex items-center">
                        <FaLinkedin className="mr-2" /> <a href={t('contact.social.linkedin')} target="_blank" rel="noopener noreferrer">Linkedin</a>
                        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row">
            {/* Form Section */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSubmitted ? 'thank-you' : 'form'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md"
                >
                  {isSubmitted ? renderThankYou() : renderForm()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Code Preview */}
            <div className="flex-1 border-t md:border-t-0 md:border-l border-[#1E2D3D] flex items-center p-4 md:p-0">
              <div className="font-mono text-sm w-full px-4 md:px-12 overflow-x-auto">
                <div className="mb-4 flex items-center">
                  <span className="text-[#607B96] mr-4">1</span>
                  <span className="text-[#C98BDF]">const</span>
                  <span className="text-[#5565E8] mx-2">button</span>
                  <span className="text-white">=</span>
                  <span className="text-[#4D5BCE] mx-2">document</span>
                  <span className="text-white">.</span>
                  <span className="text-[#43D9AD]">querySelector</span>
                  <span className="text-white">(</span>
                  <span className="text-[#E99287]">'#sendBtn'</span>
                  <span className="text-white">);</span>
                </div>

                <div className="mb-4">
                  <span className="text-[#607B96] mr-4">2</span>
                </div>

                <div className="mb-4">
                  <span className="text-[#607B96] mr-4">3</span>
                  <span className="text-[#4D5BCE]">const</span>
                  <span className="text-[#43D9AD] mx-2">message</span>
                  <span className="text-white">=</span>
                  <span className="text-white mx-2">{'{'}</span>
                </div>

                <div className="mb-4 pl-8">
                  <span className="text-[#607B96] mr-4">4</span>
                  <span className="text-[#43D9AD]">date</span>
                  <span className="text-white">:</span>
                  <span className="text-[#E99287] ml-2">"{new Date().toLocaleDateString('en-GB', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric',
                    weekday: 'long'
                  }).replace(/^(\w+), (\d+) (\w+) (\d+)$/, '$2 $3 $4 $1')} {new Date().toLocaleTimeString('en-GB', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false
                  })}"</span>
                  <span className="text-white">,</span>
                </div>

                <div className="mb-4 pl-8">
                  <span className="text-[#607B96] mr-4">5</span>
                  <span className="text-[#43D9AD]">name</span>
                  <span className="text-white">:</span>
                  <span className="text-[#E99287] ml-2 break-all">"{formData.name || 'Jonathan Davis'}"</span>
                  <span className="text-white">,</span>
                </div>

                <div className="mb-4 pl-8">
                  <span className="text-[#607B96] mr-4">6</span>
                  <span className="text-[#43D9AD]">email</span>
                  <span className="text-white">:</span>
                  <span className="text-[#E99287] ml-2 break-all">"{formData.email || 'jonathan-davis@gmail.com'}"</span>
                  <span className="text-white">,</span>
                </div>

                {selectedFile && (
                  <>
                    <div className="mb-4 pl-8">
                      <span className="text-[#607B96] mr-4">7</span>
                      <span className="text-[#43D9AD]">attachments</span>
                      <span className="text-white">:</span>
                      <span className="text-white mx-2">{'{'}</span>
                    </div>

                    <div className="mb-4 pl-12">
                      <span className="text-[#607B96] mr-4">8</span>
                      <span className="text-[#43D9AD]">name</span>
                      <span className="text-white">:</span>
                      <span className="text-[#E99287] ml-2 break-all">"{selectedFile.name}"</span>
                      <span className="text-white">,</span>
                    </div>

                    <div className="mb-4 pl-12">
                      <span className="text-[#607B96] mr-4">9</span>
                      <span className="text-[#43D9AD]">type</span>
                      <span className="text-white">:</span>
                      <span className="text-[#E99287] ml-2">"{getFileExtension(selectedFile.name)}"</span>
                      <span className="text-white">,</span>
                    </div>

                    <div className="mb-4 pl-12">
                      <span className="text-[#607B96] mr-4">10</span>
                      <span className="text-[#43D9AD]">size</span>
                      <span className="text-white">:</span>
                      <span className="text-[#E99287] ml-2">"{formatFileSize(selectedFile.size)}"</span>
                    </div>

                    <div className="mb-4 pl-8">
                      <span className="text-[#607B96] mr-4">11</span>
                      <span className="text-white">{'}'}</span>
                      <span className="text-white">,</span>
                    </div>
                  </>
                )}

                <div className="mb-4 pl-8">
                  <span className="text-[#607B96] mr-4">{selectedFile ? '12' : '7'}</span>
                  <span className="text-[#43D9AD]">message</span>
                  <span className="text-white">:</span>
                  <span className="text-[#E99287] ml-2 break-all whitespace-pre-wrap">"{formData.message || 'Hey! Just checked your website and it looks awesome! Also, I checked your articled on Medium. Lerned a few nice tips. Thanks!'}"</span>
                </div>

                <div className="mb-4">
                  <span className="text-[#607B96] mr-4">{selectedFile ? '13' : '8'}</span>
                  <span className="text-white">{'}'}</span>
                </div>

                <div className="mb-4">
                  <span className="text-[#607B96] mr-4">{selectedFile ? '14' : '9'}</span>
                </div>

                <div className="mb-4">
                  <span className="text-[#607B96] mr-4">{selectedFile ? '15' : '10'}</span>
                  <span className="text-[#43D9AD]">button</span>
                  <span className="text-white">.</span>
                  <span className="text-[#4D5BCE]">addEventListener</span>
                  <span className="text-white">{'('}</span>
                  <span className="text-[#E99287]">'click'</span>
                  <span className="text-white">,</span>
                  <span className="text-[#FEA55F]">{'() => ('}</span>
                  <span className="text-white">{'{'}</span>
                </div>

                <div className="mb-4 pl-8">
                  <span className="text-[#607B96] mr-4">{selectedFile ? '16' : '11'}</span>
                  <span className="text-[#4D5BCE]">form</span>
                  <span className="text-white">.</span>
                  <span className="text-[#43D9AD]">send</span>
                  <span className="text-white">(</span>
                  <span className="text-[#43D9AD]">message</span>
                  <span className="text-white">);</span>
                </div>

                <div>
                  <span className="text-[#607B96] mr-4">{selectedFile ? '17' : '12'}</span>
                  <span className="text-white">{'})'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};