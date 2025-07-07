import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, Check } from 'lucide-react';

import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';

const RegisterSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const registrationType = location.state?.registrationType || 'general';
  const formData = location.state?.formData || {};

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#533193] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[100px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] flex items-center justify-between h-full">
          <Link to="/" className="flex items-start py-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-end w-full">
                <img src={logoWhite} alt="SACIT" className="h-6 w-auto" />
              </div>
              <div className="flex items-center justify-start w-full">
                <img src={symposiumText} alt="Symposium" className="h-7 w-auto" />
              </div>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant="outline" 
                className="bg-transparent border border-[#B3FFD1] text-white hover:bg-white/5 transition-all duration-300 rounded-[30px] w-[140px] py-2.5 text-sm font-medium shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
              >
                LOGIN
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#B3FFD1] to-[#BFB4EE] text-[#533193] hover:opacity-90 transition-all duration-300 rounded-[100px] w-[140px] py-2.5 text-sm font-medium shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
              >
                REGISTER
              </Button>
            </div>
            
            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            
            {/* Icons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 transition-all duration-300 rounded-full w-14 h-14 flex items-center justify-center"
              >
                <Search className="w-8 h-8" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 transition-all duration-300 rounded-full w-14 h-14 flex items-center justify-center"
              >
                <Menu className="w-8 h-8" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-[120px] pb-16 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          
          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-12"
          >
            <div className="flex items-center space-x-4">
              {/* Step 1 - Completed */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-[#533193] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="text-xs text-[#533193] mt-1">Firstly</span>
              </div>
              
              {/* Connector */}
              <div className="w-12 h-px bg-[#533193]"></div>
              
              {/* Step 2 - Completed */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-[#533193] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-xs text-[#533193] mt-1">Finally</span>
              </div>
            </div>
          </motion.div>

          {/* Success Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-8">ลงทะเบียนสำเร็จ</h1>
          </motion.div>

          {/* Success Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-[#533193] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 space-y-2"
          >
            <p className="text-gray-700 text-lg">
              ขอบคุณที่ลงทะเบียนเข้าร่วมงาน
            </p>
            <p className="text-gray-700 text-lg">
              ระหว่างวันที่ <span className="font-semibold">8 - 9 สิงหาคม 2568</span> ในงาน{' '}
              <span className="font-semibold italic">SACIT Symposium 2025</span>
            </p>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex justify-center"
          >
            <Button
              onClick={handleBackToHome}
              className="bg-[#533193] text-white hover:bg-[#533193]/90 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
            >
              กลับหน้าหลัก
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess; 