import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';
import heroslideImage from '@/assets/heroslide/heroslide.jpg';

const Register = () => {
  const handleFeatureClick = () => {
    console.log("Feature not implemented yet.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B7DC3] via-[#B3FFD1] to-[#BFB4EE] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#533193] rounded-full opacity-10 -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#533193] rounded-full opacity-15 translate-x-40 translate-y-40"></div>
      
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
                onClick={handleFeatureClick}
              >
                LOGIN
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#B3FFD1] to-[#BFB4EE] text-[#533193] hover:opacity-90 transition-all duration-300 rounded-[100px] w-[140px] py-2.5 text-sm font-medium shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                onClick={handleFeatureClick}
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
                onClick={handleFeatureClick}
              >
                <Search className="w-8 h-8" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 transition-all duration-300 rounded-full w-14 h-14 flex items-center justify-center"
                onClick={handleFeatureClick}
              >
                <Menu className="w-8 h-8" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-[100px] min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Background Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-full max-w-[600px] mx-auto">
              {/* Purple Frame */}
              <div className="absolute inset-0 bg-[#533193] rounded-lg transform translate-x-4 translate-y-4"></div>
              
              {/* Image */}
              <div className="relative bg-white rounded-lg overflow-hidden">
                <img src={heroslideImage} alt="SACIT Symposium Event" className="w-full h-[500px] object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Registration Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#533193] mb-4">Register</h1>
              <p className="text-[#533193]/80 text-lg">เลือกประเภทการลงทะเบียน</p>
            </div>

            <div className="space-y-4">
              {/* Option 1 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#B3FFD1]/80 backdrop-blur-sm text-[#533193] py-4 px-6 rounded-full text-lg font-medium border border-[#533193]/20 hover:bg-[#B3FFD1] transition-all duration-300 shadow-lg"
                onClick={handleFeatureClick}
              >
                ลงทะเบียนเข้าร่วมงานทั่วไป
              </motion.button>

              {/* Option 2 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#B3FFD1]/80 backdrop-blur-sm text-[#533193] py-4 px-6 rounded-full text-lg font-medium border border-[#533193]/20 hover:bg-[#B3FFD1] transition-all duration-300 shadow-lg"
                onClick={handleFeatureClick}
              >
                นำเสนอผลงานวิจัย/บทความวิชาการ
              </motion.button>

              {/* Option 3 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#B3FFD1]/80 backdrop-blur-sm text-[#533193] py-4 px-6 rounded-full text-lg font-medium border border-[#533193]/20 hover:bg-[#B3FFD1] transition-all duration-300 shadow-lg"
                onClick={handleFeatureClick}
              >
                นำเสนอผลงานสร้างสรรค์
              </motion.button>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-8">
              <Link 
                to="/" 
                className="text-[#533193] hover:text-[#533193]/80 transition-colors font-medium"
              >
                ← กลับสู่หน้าหลัก
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register; 