import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, Upload } from 'lucide-react';

import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';

const RegisterResearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const registrationType = location.state?.registrationType || 'research';
  const formData = location.state?.formData || {};
  
  const [researchData, setResearchData] = useState({
    projectTitle: '',
    category: '',
    categoryOther: '',
    abstract: '',
    keywords: '',
    researchFile: null
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setResearchData(prev => ({
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResearchData(prev => ({
        ...prev,
        researchFile: file
      }));
      
      if (errors.researchFile) {
        setErrors(prev => ({
          ...prev,
          researchFile: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!researchData.projectTitle) newErrors.projectTitle = 'กรุณากรอกชื่อผลงาน';
    if (!researchData.category) newErrors.category = 'กรุณาเลือกประเภทผลงาน';
    if (researchData.category === 'other' && !researchData.categoryOther) {
      newErrors.categoryOther = 'กรุณาระบุประเภทผลงาน';
    }
    if (!researchData.abstract) newErrors.abstract = 'กรุณากรอกบทคัดย่อ';
    if (!researchData.keywords) newErrors.keywords = 'กรุณากรอกคำสำคัญ';
    if (!researchData.researchFile) newErrors.researchFile = 'กรุณาอัปโหลดเอกสารงานวิจัย';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Submit form data
      console.log('Research data:', researchData);
      console.log('Form data:', formData);
      navigate('/register/success', { 
        state: { 
          formData, 
          researchData, 
          registrationType 
        } 
      });
    }
  };

  const categories = [
    {
      value: 'lacquer',
      label: 'งานวิจัยเกี่ยวกับยางรัก ต้นรัก และพืชให้ยางกับการใช้เป็นวัตถุดิบในงานหัตถกรรม',
      labelEn: 'Lacquer sap, lacquer tree, and other resin-producing plants as raw materials in crafts'
    },
    {
      value: 'culture',
      label: 'งานวิจัยเกี่ยวกับศิลป วัฒนธรรมและการสร้างสรรคงานหัตถกรรม',
      labelEn: 'Art, culture, and the creative development of traditional crafts'
    },
    {
      value: 'preservation',
      label: 'งานวิจัยเกี่ยวกับการอนุรักษ์ภูมิปัญญาในงานหัตถกรรม',
      labelEn: 'Preservation of traditional knowledge in crafts'
    },
    {
      value: 'sustainability',
      label: 'งานวิจัยเกี่ยวกับวัสดุทางเลือกและการใช้วัตถุดิบในงานหัตถกรรมที่สอดคล้องกับยุคดิจิทัล',
      labelEn: 'Material science and sustainable alternatives in craft-making'
    },
    {
      value: 'esg',
      label: 'งานวิจัยเกี่ยวกับงานหัตถกรรมที่สอดคล้องกับแนวคิด ESG',
      labelEn: 'Artistic works and craftworks aligned with the ESG framework'
    },
    {
      value: 'other',
      label: 'งานวิจัยอื่น ๆ',
      labelEn: 'Other relevant research'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="pt-[120px] pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-8"
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
              
              {/* Step 2 - Active */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-[#533193] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-xs text-[#533193] mt-1">Finally</span>
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">ผลงานวิจัย หรือ บทความสร้างสรรค์ /</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Researcher or Academic Work</h2>
            <p className="text-lg text-gray-600">ข้อมูลของผลงานวิจัย หรือ บทความวิชาการ / Researcher or Academic Work Information</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Project Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อผลงาน / Project, Activity Title<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={researchData.projectTitle}
                onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                className={`w-full ${errors.projectTitle ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.projectTitle && <p className="text-red-500 text-xs mt-1">{errors.projectTitle}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ประเภทผลงาน / Category<span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {categories.map((category) => (
                  <label key={category.value} className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={researchData.category === category.value}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="mr-3 mt-1 text-[#533193] focus:ring-[#533193] flex-shrink-0"
                    />
                    <div className="text-sm text-gray-700">
                      <div>{category.label} /</div>
                      <div className="italic text-gray-600">{category.labelEn}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              
              {/* Other Category Input */}
              {researchData.category === 'other' && (
                <div className="mt-3">
                  <Input
                    type="text"
                    placeholder="ระบุประเภทผลงาน / Specify Category"
                    value={researchData.categoryOther}
                    onChange={(e) => handleInputChange('categoryOther', e.target.value)}
                    className={`w-full max-w-md ${errors.categoryOther ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.categoryOther && <p className="text-red-500 text-xs mt-1">{errors.categoryOther}</p>}
                </div>
              )}
            </div>

            {/* Abstract */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                บทคัดย่อ (ไม่เกิน 500 คำ) / Abstract (no more than 500)<span className="text-red-500">*</span>
              </label>
              <Textarea
                value={researchData.abstract}
                onChange={(e) => handleInputChange('abstract', e.target.value)}
                className={`w-full h-32 ${errors.abstract ? 'border-red-500' : 'border-gray-300'}`}
                maxLength={500}
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {researchData.abstract.length}/500
              </div>
              {errors.abstract && <p className="text-red-500 text-xs mt-1">{errors.abstract}</p>}
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                คำสำคัญ (ไม่เกิน 5 คำ) / Keyword (no more than 5)<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={researchData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                className={`w-full ${errors.keywords ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="คำสำคัญ1, คำสำคัญ2, คำสำคัญ3"
              />
              {errors.keywords && <p className="text-red-500 text-xs mt-1">{errors.keywords}</p>}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เอกสารงานวิจัย / Research Article<span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed rounded-[10px] p-6 text-center" style={{
                background: 'linear-gradient(90deg, #BFB4EE 0%, #B3FFD1 100%)',
                borderColor: '#BFB4EE'
              }}>
                <input
                  type="file"
                  id="research-file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="research-file" className="cursor-pointer">
                  <div className="bg-[#533193] text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-[#533193]/90 transition-colors">
                    <Upload className="w-4 h-4" />
                    upload
                  </div>
                </label>
                {researchData.researchFile && (
                  <p className="text-sm text-gray-600 mt-2">
                    ไฟล์ที่เลือก: {researchData.researchFile.name}
                  </p>
                )}
              </div>
              {errors.researchFile && <p className="text-red-500 text-xs mt-1">{errors.researchFile}</p>}
              
              {/* File Guidelines */}
              <div className="mt-4 text-xs text-gray-600 space-y-1">
                <p><strong>เอกสารอ้างอิง</strong> (ใช้รูปแบบ APA Style) จัดเรียงตามตัวอักษรโดยไม่ต้องแบ่งแยกตามประเภทเอกสาร นำเสนอแหล่งอ้างอิงภาษาไทยและแหล่งอ้างอิงภาษาอังกฤษ / <em>References (Use APA Style. Arrange entries alphabetically without separating by document type. List Thai sources first, followed by English sources.)</em></p>
                
                <p><strong>หมายเหตุ / Notes on Formatting:</strong></p>
                <p>1.1 ชื่อหัวข้อให้ใช้แบบอักษร TH SarabunPSK ขนาด 18 ตัวหนา / <em>Project title: TH SarabunPSK, font size 18, bold</em></p>
                <p>1.2 เนื้อหาให้ใช้แบบอักษร TH SarabunPSK ขนาด 16 / <em>Body text: TH SarabunPSK, font size 16</em></p>
                <p>1.3 ระยะห่างระหว่างบรรทัดให้เว้น 1.0 / <em>Line spacing: 1.0</em></p>
                <p>1.4 เอกสารที่ส่งมาควรไม่น้อยกว่า 1 หน้า แต่ไม่เกิน 300 คำ ความยาวไม่เกิน 3 - 5หน้ากระดาษ A4 การจัดหน้ากระดาษให้ใช้ระยะขอบ (ด้านบน ด้านล่าง ด้านซ้าย ด้านขวา) 1.0 นิ้ว 2.54 ซม. / <em>Abstract: - Thai version no more than 1 page, - English version no more than 300 words, - Full article: 3-5 pages (A4), - Page margins: 1 inch (2.54 cm) on all sides</em></p>
                <p>1.5 แนบไฟล์ในรูแบบ Microsoft Word แบบไฟล์ที่สำหรับเป็น PDF แบบแนบเฉพาะ / <em>Submit in Microsoft Word format and include a PDF backup file</em></p>
                <p>1.6 บทความฉบับเต็มควรมีไม่น้อยกว่า 10 หน้า แต่ไม่เกิน 15 หน้า / <em>Full-length article should be no fewer than 10 pages and no more than 15 pages</em></p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <Button
                onClick={handleSubmit}
                className="bg-[#533193] text-white hover:bg-[#533193]/90 px-12 py-3 rounded-full text-lg font-medium transition-all duration-300"
              >
                SUBMIT
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterResearch; 