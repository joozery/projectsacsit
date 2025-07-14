import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';

import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';

const RegisterSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, registrationType, registrationId, researchData } = location.state || {};
  
  // Extract registration data
  const registrationData = location.state?.registrationData;
  const registrationNumber = registrationData?.registration?.registration_number || 
                            registrationData?.registration_number ||
                            location.state?.registration_number;

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleContinue = () => {
    if (registrationType === 'research') {
      navigate('/register/research', { state: { formData, registrationType, registrationId } });
    } else if (registrationType === 'creative') {
      navigate('/register/creative', { state: { formData, registrationType, registrationId } });
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="pt-[120px] pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          
          {/* Success Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              ลงทะเบียนสำเร็จ!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              ขอบคุณสำหรับการลงทะเบียนเข้าร่วม SACIT Symposium 2025
            </p>
            
            {/* Registration Number Display */}
            {registrationNumber && (
              <div className="bg-[#533193] text-white px-6 py-3 rounded-lg inline-block mb-4">
                <p className="text-sm opacity-90">หมายเลขการลงทะเบียน</p>
                <p className="text-xl font-bold">{registrationNumber}</p>
              </div>
            )}
            
            {!registrationNumber && registrationId && (
              <p className="text-sm text-gray-500 mb-4">
                Registration ID: #{registrationId}
              </p>
            )}
            
            <p className="text-sm text-gray-500">
              กรุณาเก็บหมายเลขนี้ไว้สำหรับการอ้างอิง
            </p>
          </motion.div>

          {/* User Info */}
          {formData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 rounded-lg p-6 mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">ข้อมูลการลงทะเบียน</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ชื่อ:</span>
                  <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">อีเมล:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">บริษัท/องค์กร:</span>
                  <span className="font-medium">{formData.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ประเภทการลงทะเบียน:</span>
                  <span className="font-medium capitalize">
                    {registrationType === 'general' ? 'ทั่วไป' : 
                     registrationType === 'research' ? 'วิจัย' : 
                     registrationType === 'creative' ? 'สร้างสรรค์' : 'ทั่วไป'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-3">ขั้นตอนต่อไป</h3>
            <div className="space-y-2 text-sm text-blue-700">
              {registrationType === 'general' ? (
                <>
                  <p>• คุณจะได้รับอีเมลยืนยันการลงทะเบียนภายใน 24 ชั่วโมง</p>
                  <p>• กรุณาตรวจสอบอีเมลและยืนยันการลงทะเบียน</p>
                  <p>• ข้อมูลเพิ่มเติมเกี่ยวกับงานจะถูกส่งไปยังอีเมลของคุณ</p>
                </>
              ) : (
                <>
                  <p>• กรุณาเตรียมเอกสารสำหรับการส่งผลงาน</p>
                  <p>• ระบบจะนำคุณไปยังหน้าส่งผลงานต่อไป</p>
                  <p>• กำหนดส่งผลงาน: 31 มกราคม 2025</p>
                </>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="border-[#533193] text-[#533193] hover:bg-[#533193] hover:text-white px-8 py-3 rounded-full transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              กลับหน้าหลัก
            </Button>
            
            {registrationType !== 'general' && (
              <Button
                onClick={handleContinue}
                className="bg-[#533193] text-white hover:bg-[#533193]/90 px-8 py-3 rounded-full transition-all duration-300"
              >
                ส่งผลงานต่อไป
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess; 