import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log('Form data:', formData);
      
      // Navigate based on registration type
      if (registrationType === 'research') {
        // Go to research submission page
        navigate('/register/research', { state: { formData, registrationType } });
      } else if (registrationType === 'creative') {
        // Go to creative work submission page (to be created)
        navigate('/register/creative', { state: { formData, registrationType } });
      } else {
        // General registration - go directly to success
        navigate('/register/success', { state: { formData, registrationType } });
      }
    }
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

            {/* Next Button */}
            <div className="flex justify-center pt-8">
              <Button
                onClick={handleNext}
                className="bg-[#533193] text-white hover:bg-[#533193]/90 px-12 py-3 rounded-full text-lg font-medium transition-all duration-300"
              >
                NEXT
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 