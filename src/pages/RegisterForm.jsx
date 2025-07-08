import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, Loader2 } from 'lucide-react';

import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';
import authService from '@/services/authService';
import registrationService from '@/services/registrationService';

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const registrationType = location.state?.registrationType || 'general';
  
  const [formData, setFormData] = useState({
    title: '',
    titleOther: '',
    firstName: '',
    lastName: '',
    company: '',
    telephone: '',
    email: '',
    password: '',
    confirmPassword: '',
    educationLevel: '',
    educationOther: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = 'กรุณาเลือกคำนำหน้า';
    if (formData.title === 'other' && !formData.titleOther) newErrors.titleOther = 'กรุณาระบุคำนำหน้า';
    if (!formData.firstName) newErrors.firstName = 'กรุณากรอกชื่อ';
    if (!formData.lastName) newErrors.lastName = 'กรุณากรอกนามสกุล';
    if (!formData.company) newErrors.company = 'กรุณากรอกบริษัทหรือองค์กร';
    if (!formData.telephone) newErrors.telephone = 'กรุณากรอกเบอร์โทรศัพท์';
    if (!formData.email) newErrors.email = 'กรุณากรอกอีเมล';
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    if (!formData.educationLevel) newErrors.educationLevel = 'กรุณาเลือกระดับการศึกษา';
    if (formData.educationLevel === 'other' && !formData.educationOther) newErrors.educationOther = 'กรุณาระบุระดับการศึกษา';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    // Password validation (minimum 6 characters)
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitError('');

    try {
      // 1. สร้างบัญชีผู้ใช้
      const userData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.telephone,
        organization: formData.company,
        role: 'user'
      };

      const authResult = await authService.register(userData);
      
      if (!authResult.success) {
        setSubmitError(authResult.message);
        setIsLoading(false);
        return;
      }

      // 2. สร้างการลงทะเบียน
      const registrationData = {
        registration_type: registrationType,
        title_prefix: formData.title === 'other' ? formData.titleOther : formData.title,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.telephone,
        organization: formData.company,
        education_level: formData.educationLevel === 'other' ? formData.educationOther : formData.educationLevel,
        registration_year: 2025,
        terms_accepted: 'true' // เพิ่ม field นี้เพื่อผ่าน validation
      };

      const registrationResult = await registrationService.createRegistration(registrationData);
      
      if (!registrationResult.success) {
        setSubmitError(registrationResult.message);
        setIsLoading(false);
        return;
      }

      // 3. Navigate based on registration type
      if (registrationType === 'research') {
        navigate('/register/research', { 
          state: { 
            formData, 
            registrationType,
            registrationId: registrationResult.data?.id 
          } 
        });
      } else if (registrationType === 'creative') {
        navigate('/register/creative', { 
          state: { 
            formData, 
            registrationType,
            registrationId: registrationResult.data?.id 
          } 
        });
      } else {
        navigate('/register/success', { 
          state: { 
            formData, 
            registrationType,
            registrationId: registrationResult.data?.id 
          } 
        });
      }

    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError('เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="pt-[120px] pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          
          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="flex items-center space-x-4">
              {/* Step 1 - Active */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-[#533193] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="text-xs text-[#533193] mt-1">Firstly</span>
              </div>
              
              {/* Connector */}
              <div className="w-12 h-px bg-gray-300"></div>
              
              {/* Step 2 - Inactive */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-xs text-gray-500 mt-1">Finally</span>
              </div>
            </div>
          </motion.div>

          {/* Form Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800">General Information</h1>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                คำนำหน้า / Title<span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  { value: 'mr', label: 'นาย / Mr.' },
                  { value: 'mrs', label: 'นาง / Mrs.' },
                  { value: 'ms', label: 'นางสาว / Ms.' },
                  { value: 'other', label: 'อื่นๆ / Other' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="title"
                      value={option.value}
                      checked={formData.title === option.value}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="mr-2 text-[#533193] focus:ring-[#533193]"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              
              {/* Other Title Input */}
              {formData.title === 'other' && (
                <div className="mt-3">
                  <Input
                    type="text"
                    placeholder="ระบุคำนำหน้า / Specify Title"
                    value={formData.titleOther}
                    onChange={(e) => handleInputChange('titleOther', e.target.value)}
                    className={`w-full max-w-md ${errors.titleOther ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.titleOther && <p className="text-red-500 text-xs mt-1">{errors.titleOther}</p>}
                </div>
              )}
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="ชื่อ / First Name*"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="นามสกุล / Last Name*"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Company */}
            <div>
              <Input
                type="text"
                placeholder="บริษัทหรือองค์กร / Company or Organization*"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className={`w-full ${errors.company ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
            </div>

            {/* Telephone */}
            <div>
              <Input
                type="tel"
                placeholder="เบอร์โทรศัพท์ / Telephone Number*"
                value={formData.telephone}
                onChange={(e) => handleInputChange('telephone', e.target.value)}
                className={`w-full ${errors.telephone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
            </div>

            {/* Email */}
            <div>
              <Input
                type="email"
                placeholder="อีเมล / Email*"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <Input
                type="password"
                placeholder="รหัสผ่าน / Password*"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <Input
                type="password"
                placeholder="ยืนยันรหัสผ่าน / Confirm Password*"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ระดับการศึกษา / Education Level<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'bachelor', label: 'ปริญญาตรี / Bachelor Degrees' },
                  { value: 'master', label: 'ปริญญาโท / Master Degrees' },
                  { value: 'phd', label: 'ปริญญาเอก / Ph.D.(Doctor of Philosophy)' },
                  { value: 'other', label: 'อื่นๆ / Other' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="educationLevel"
                      value={option.value}
                      checked={formData.educationLevel === option.value}
                      onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                      className="mr-2 text-[#533193] focus:ring-[#533193]"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.educationLevel && <p className="text-red-500 text-xs mt-1">{errors.educationLevel}</p>}
              
              {/* Other Education Input */}
              {formData.educationLevel === 'other' && (
                <div className="mt-3">
                  <Input
                    type="text"
                    placeholder="ระบุระดับการศึกษา / Specify Education Level"
                    value={formData.educationOther}
                    onChange={(e) => handleInputChange('educationOther', e.target.value)}
                    className={`w-full max-w-md ${errors.educationOther ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.educationOther && <p className="text-red-500 text-xs mt-1">{errors.educationOther}</p>}
                </div>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4"
              >
                <p className="text-red-600 text-sm">{submitError}</p>
              </motion.div>
            )}

            {/* Next Button */}
            <div className="flex justify-center pt-8">
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-[#533193] text-white hover:bg-[#533193]/90 px-12 py-3 rounded-full text-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    กำลังดำเนินการ...
                  </>
                ) : (
                  'NEXT'
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 