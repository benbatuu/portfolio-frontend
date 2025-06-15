import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCloudUpload, HiOutlineDocument, HiOutlineX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

interface FileUploadProps {
  onFileSelect?: (file: File | null) => void;
  acceptedTypes?: string;
  label?: string;
  maxSizeMB?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes = ".pdf,.doc,.docx,.txt",
  label = "Dosya Yükle",
  maxSizeMB = 10
}) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setError("");
    
    // Dosya boyutu kontrolü
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(t('fileUpload.errors.fileSize'));
      return;
    }

    // Dosya türü kontrolü
    const allowedTypes = acceptedTypes.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      setError(t('fileUpload.errors.fileType'));
      return;
    }

    setSelectedFile(file);
    onFileSelect?.(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError("");
    onFileSelect?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <label className="block text-[#607B96] mb-2">{label}</label>
      
      {!selectedFile ? (
        <motion.div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300
            ${dragActive 
              ? 'border-[#607B96] bg-[#607B96]/10' 
              : 'border-[#1E2D3D] hover:border-[#607B96]/50 hover:bg-[#607B96]/5'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes}
            onChange={handleChange}
            className="hidden"
          />
          
          <motion.div
            animate={dragActive ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <HiOutlineCloudUpload className="mx-auto h-12 w-12 text-[#607B96] mb-4" />
          </motion.div>
          
          <div className="space-y-2">
            <p className="text-[#E5E9F0] font-medium">
            {t('fileUpload.dropzone.title')}
            </p>
            <p className="text-[#607B96] text-sm">
            {t('fileUpload.dropzone.supportedFormats')}
            </p>
            <p className="text-[#607B96] text-xs">
            {t('fileUpload.dropzone.maxSize')}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[#1E2D3D] rounded-lg p-4 bg-[#011627]/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HiOutlineDocument className="h-8 w-8 text-[#607B96]" />
              <div>
                <p className="text-[#E5E9F0] font-medium truncate max-w-48">
                  {selectedFile.name}
                </p>
                <p className="text-[#607B96] text-sm">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={handleRemoveFile}
              className="p-1 hover:bg-[#1E2D3D] rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <HiOutlineX className="h-5 w-5 text-[#607B96] hover:text-[#E5E9F0]" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};