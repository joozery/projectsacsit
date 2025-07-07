import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, ArrowLeft, Check } from 'lucide-react';

import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';

const RegisterTerms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [agreed, setAgreed] = useState(false);
  
  const registrationType = location.state?.registrationType || 'general';
  
  const registrationTypeNames = {
    general: 'ลงทะเบียนเข้าร่วมงานทั่วไป',
    research: 'นำเสนอผลงานวิจัย/บทความวิชาการ',
    creative: 'นำเสนอผลงานสร้างสรรค์'
  };

  const handleAcceptTerms = () => {
    if (agreed) {
      // Navigate to registration form with the selected type
      navigate('/register/form', { state: { registrationType } });
    }
  };

  const handleBackToSelection = () => {
    navigate('/register');
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
      <div className="pt-[120px] pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              เงื่อนไข และข้อตกลงการลงทะเบียน
            </h1>
          </motion.div>

          {/* Terms Content Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
              <p>
                งานประชุมวิชาการศิลปหัตถกรรมครั้งที่ 1 พ.ศ. 2562 ส่งผลงานภายในวันที่ 1 มิถุนายน 2565 
                สถาบันส่งเสริมศิลปหัตถกรรมไทย (องค์การมหาชน) ให้การสนับสนุนผลงานดังกล่าว สถาบันส่งเสริมศิลปหัตถกรรมไทย 
                (องค์การมหาชน) จะประกาศรายชื่อผู้ได้รับการคัดเลือกผลงานดังกล่าว และต้องได้รับการรับรองผลงานดังกล่าว
                เพื่อนำเสนอผลงานดังกล่าวในงานประชุมวิชาการดังกล่าว เพื่อให้ผลงานดังกล่าวได้รับการยอมรับ สถาบันส่งเสริม
                ศิลปหัตถกรรมไทย (องค์การมหาชน) จะประกาศรายชื่อผู้ได้รับการคัดเลือกผลงานดังกล่าว และต้องได้รับการรับรอง
                ผลงานดังกล่าวเพื่อนำเสนอผลงานดังกล่าวในงานประชุมวิชาการดังกล่าว ไม่ใช่ผลงานดังกล่าว ต้องได้รับ
              </p>

              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>ผู้ส่งผลงานต้องเป็นผู้มีคุณวุฒิระดับปริญญาตรีขึ้นไปประจำปีงบประมาณ 2563</li>
                <li>ผู้ส่งผลงานต้องสมัครใจเข้าร่วมการประกวดผลงานดังกล่าวด้วยตนเอง</li>
                <li>ผู้ส่งผลงานและผลงานจะต้องผ่านกระบวนการคัดเลือกจากคณะกรรมการ</li>
                <li>ผลงานดังกล่าวต้องเป็นผลงานใหม่ที่ไม่เคยได้รับรางวัลมาก่อน</li>
                <li>ผู้ส่งผลงานต้องรับผิดชอบในผลงานของตนเองและไม่ละเมิดลิขสิทธิ์ของผู้อื่น</li>
              </ol>

              <p>
                ก่อน สถาบันส่งเสริมศิลปหัตถกรรมไทย (องค์การมหาชน) จะส่งผลงานของผู้เข้าร่วมการประกวดผลงานดังกล่าว 
                และเงื่อนไขการส่งผลงานดังกล่าว เท่านั้น
              </p>
            </div>

            {/* Agreement Checkbox */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => setAgreed(!agreed)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 border-gray-400 flex items-center justify-center transition-colors mt-0.5 ${
                    agreed ? 'bg-gray-600 border-gray-600 text-white' : 'bg-white'
                  }`}
                >
                  {agreed && <Check className="w-3 h-3" />}
                </button>
                <label className="text-sm text-gray-700 cursor-pointer leading-relaxed" onClick={() => setAgreed(!agreed)}>
                  ยอมรับเงื่อนไขและข้อตกลงการลงทะเบียนในการเข้าร่วม{' '}
                  <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                    นโยบายความเป็นส่วนตัว
                  </span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                onClick={handleAcceptTerms}
                disabled={!agreed}
                className={`px-8 py-2 rounded-full transition-all duration-300 ${
                  agreed 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                ตกลง
              </Button>
            </div>

            {/* Back Link */}
            <div className="text-center mt-6">
              <button 
                onClick={handleBackToSelection}
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium underline"
              >
                กลับไปยังหน้าหลัก
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTerms; 