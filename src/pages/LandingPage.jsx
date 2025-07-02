import React, { useState } from 'react';
import '@fontsource/poppins';
import '@fontsource/poppins/400.css';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Diamond, Sparkles, Users, Image as ImageIcon, Newspaper as LucideNewspaper, BarChart2, Send, Search, Menu } from 'lucide-react';
import Lightbox from '@/components/Lightbox';

import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';
import kvSymposium from '@/assets/KV Symposium.svg';
import heroslideImage from '@/assets/heroslide/heroslide.jpg';

// Speaker images
import speaker01 from '@/assets/speker/01.jpg';
import speaker02 from '@/assets/speker/02.jpg';
import speaker03 from '@/assets/speker/03.jpg';
import speaker04 from '@/assets/speker/04.jpg';
import speaker05 from '@/assets/speker/05.jpg';

// Gallery images
import gallery01 from '@/assets/gallery/01.jpg';
import gallery02 from '@/assets/gallery/02.jpg';
import gallery03 from '@/assets/gallery/03.jpg';
import gallery04 from '@/assets/gallery/04.jpg';
import gallery05 from '@/assets/gallery/05.jpg';
import gallery06 from '@/assets/gallery/06.jpg';
import gallery07 from '@/assets/gallery/07.jpg';
import gallery08 from '@/assets/gallery/08.jpg';
import gallery09 from '@/assets/gallery/09.jpg';



const LandingPage = () => {
  const navigate = useNavigate();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const galleryImagesArray = [gallery01, gallery02, gallery03, gallery04, gallery05, gallery06, gallery07, gallery08, gallery09];
  
  const handleFeatureClick = () => {
    // In a real app, this would trigger a toast notification.
    // For this example, it does nothing as Toaster is part of Admin layout.
    console.log("Feature not implemented yet.");
  };

  const openLightbox = (image, index) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    console.log('Next image clicked, current index:', lightboxIndex);
    const nextIndex = (lightboxIndex + 1) % galleryImagesArray.length;
    console.log('Next index:', nextIndex);
    setLightboxIndex(nextIndex);
    setLightboxImage(galleryImagesArray[nextIndex]);
  };

  const prevImage = () => {
    console.log('Prev image clicked, current index:', lightboxIndex);
    const prevIndex = lightboxIndex === 0 ? galleryImagesArray.length - 1 : lightboxIndex - 1;
    console.log('Prev index:', prevIndex);
    setLightboxIndex(prevIndex);
    setLightboxImage(galleryImagesArray[prevIndex]);
  };

  const agenda = {
    day1: [
      { time: '8.30 a.m.', description: 'Breakfast and register' },
      { time: '10.00 a.m.', description: 'General sessions' },
      { time: '12.00 a.m.', description: 'Lunch' },
      { time: '1.30 p.m.', description: 'General sessions' },
    ],
    day2: [
      { time: '9.00 a.m.', description: 'Workshops' },
      { time: '11.00 a.m.', description: 'Keynote speaker' },
      { time: '1.00 p.m.', description: 'Networking lunch' },
      { time: '2.30 p.m.', description: 'Closing remarks' },
    ]
  };

  const speakers = [
    { name: 'ดร. สมชาย เชี่ยวชาญ', title: 'นักวิจัยด้านนวัตกรรมผ้าไทย', imgSrc: speaker01 },
    { name: 'คุณวนิดา สร้างสรรค์', title: 'ศิลปินเครื่องปั้นดินเผา', imgSrc: speaker02 },
    { name: 'อาจารย์มานพ สืบสาน', title: 'ผู้เชี่ยวชาญงานไม้แกะสลัก', imgSrc: speaker03 },
    { name: 'คุณรัตนา ต่อยอด', title: 'นักออกแบบเครื่องประดับร่วมสมัย', imgSrc: speaker04 },
    { name: 'คุณวิชัย พัฒนา', title: 'ผู้ประกอบการ OTOP ระดับประเทศ', imgSrc: speaker05 },
  ];
  
  const newsItems = [
    { title: 'ผาสาทแก้ว', description: 'ผ้าไหมทอลายโบราณ ผาสาทแก้ว', author: 'ครูณกรณ์ ตั้งหลัก', imgSrc: 'intricate silk fabric texture', type: 'ผลิตภัณฑ์', category: 'ผ้าทอพื้นเมือง' },
    { title: 'หัตถกรรมจักสาน', description: 'ตะกร้าไม้ไผ่ลวดลายประณีต', author: 'กลุ่มแม่บ้านสร้างสรรค์', imgSrc: 'woven bamboo basket detail', type: 'บทความ', category: 'งานจักสาน' },
    { title: 'Crafts Bangkok 2025', description: 'ประกาศรายชื่อผู้ผ่านการคัดเลือกเข้าร่วมจำหน่ายสินค้าในงาน Crafts Bangkok 2025', author: '', imgSrc: 'Crafts Bangkok event poster', type: 'ประกาศ', category: 'งานแสดงสินค้า' },
    { title: 'เครื่องปั้นดินเผาลายคราม', description: 'ศิลปะเครื่องปั้นดินเผาแบบดั้งเดิม ลวดลายสีคราม', author: 'อาจารย์สมศรี วิจิตรศิลป์', imgSrc: 'blue ceramic pottery', type: 'บทความ', category: 'เครื่องปั้นดินเผา' },
  ];

  const galleryImages = [
    { alt: 'People at a conference registration desk', description: 'Attendees registering for SACIT event' },
    { alt: 'Speaker presenting on stage', description: 'Expert sharing insights at SACIT conference' },
    { alt: 'Handicrafts displayed at an exhibition', description: 'Beautiful Thai handicrafts on display' },
    { alt: 'Networking session at SACIT event', description: 'Participants networking and discussing' },
    { alt: 'Workshop participants learning a craft', description: 'Hands-on workshop at SACIT' },
    { alt: 'Colorful textile art', description: 'Vibrant Thai textile art piece' },
    { alt: 'Ceramic art pieces', description: 'Unique ceramic creations by Thai artists' },
    { alt: 'Wooden sculptures', description: 'Intricate wooden sculptures' },
    { alt: 'Traditional Thai pottery workshop', description: 'Artists creating beautiful pottery' },
    { alt: 'Cultural performance at symposium', description: 'Traditional dance performance' },
  ];


  return (
    <>
      <Helmet>
        <title>SACIT Symposium - สถาบันส่งเสริมศิลปหัตถกรรมไทย</title>
        <meta name="description" content="เข้าร่วม SACIT Symposium 2025 - งานประชุมวิชาการด้านศิลปหัตถกรรมครั้งที่ 1 เพื่อการพัฒนาที่ยั่งยืนในอาเซียนและนอกอาเซียน" />
      </Helmet>
      <div className="bg-[#F5F3F7] text-[#333333] font-['Poppins']">
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
                  <Link to="/register">
                    <Button 
                      className="bg-gradient-to-r from-[#B3FFD1] to-[#BFB4EE] text-[#533193] hover:opacity-90 transition-all duration-300 rounded-[100px] w-[140px] py-2.5 text-sm font-medium shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                    >
                      REGISTER
                    </Button>
                  </Link>
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

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[827px] flex items-center justify-center pt-[100px] bg-[linear-gradient(263deg,#533192_0%,#8973C0_0.01%,#BFB4EE_31.73%,#B9D9DF_62.02%,#B3FFD1_100%)] overflow-hidden"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col justify-center text-left"
            >
              <div className="mb-12">
                <img src={kvSymposium} alt="Symposium 2025" className="w-[500px] h-auto" />
              </div>
              <div className="max-w-[600px]">
                <h2 className="text-[24px] font-medium mb-6 text-black text-right">SACIT Symposium</h2>
                <p className="text-base font-normal text-black leading-normal">
                  The SACIT Symposium is an academic conference organized by the SUPPORT Arts and Crafts International Centre of Thailand (SACIT) to foster knowledge exchange in the field of Thai arts and crafts. It brings together scholars, artists, designers, entrepreneurs, and enthusiasts from both Thailand and abroad to share ideas and insights. The event aims to promote the sustainable development of Thai craftsmanship in contemporary society and often features exhibitions, discussions, and showcases of traditional techniques such as lacquerware.
                </p>
              </div>
            </motion.div>

                          <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="relative"
              >
              {/* Image Container */}
              <div className="relative w-full max-w-[600px]">
                {/* Purple Frame */}
                <div className="absolute inset-0 bg-[#533193] rounded-lg transform translate-x-4 translate-y-4"></div>
                
                {/* Image with Navigation */}
                <div className="relative bg-white rounded-lg overflow-hidden">
                  <img src={heroslideImage} alt="SACIT Symposium Event" className="w-full h-[400px] object-cover"/>
                  
                  {/* Navigation Buttons */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6 text-[#533193]" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6 text-[#533193]" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute -right-40 -top-20 w-96 h-96 bg-white/5 rounded-full filter blur-2xl opacity-50"></div>
          <div className="absolute -left-32 bottom-0 w-80 h-80 bg-[#A0E7D5]/10 rounded-full filter blur-2xl opacity-50"></div>
                </motion.div>

        {/* About Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-white mx-auto relative"
              style={{
                borderRadius: '10px',
                boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.25)',
                width: '100%',
                maxWidth: '1174px',
                height: '400px',
                flexShrink: 0
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Top Section - English Text Only */}
              <div className="p-8 text-center bg-gradient-to-b from-[#8B7DC3] to-[#533193] rounded-t-[10px]" style={{ height: '150px' }}>
                <p className="text-base leading-relaxed text-white max-w-4xl mx-auto">
                  SACIT is planning to organize the 1st SACIT Symposium on Fine Arts and Crafts under the concept of
                </p>
                <p className="text-base font-semibold text-white max-w-4xl mx-auto mt-1">
                  "Crafting Sustainability across ASEAN and Beyond"
                </p>
                <p className="text-sm leading-relaxed text-white/90 max-w-4xl mx-auto mt-2">
                  The stage offers an exchange of academic knowledge and creative works of love craftsmanship and more.
                </p>
                <p className="text-sm leading-relaxed text-white/90 max-w-4xl mx-auto mt-1">
                  As well as the extension and development of traditional materials such as <span className="font-semibold">"Lacquerware"</span> and replacement materials.
                </p>
                <p className="text-sm leading-relaxed text-white/90 max-w-4xl mx-auto">
                  To answer the problem of sustainable promotion of handicrafts in all dimensions.
                </p>
              </div>
              
              {/* Bottom Section - Image with Date */}
              <div 
                className="rounded-b-[10px] relative overflow-hidden" 
                style={{
                  width: '100%',
                  height: '250px',
                  background: `linear-gradient(90deg, rgba(0, 0, 0, 0.00) 0%, #BFB4EE 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), url(${heroslideImage}) lightgray 50% / cover no-repeat`
                }}
              >
                <div className="absolute bottom-4 right-4 text-right">
                  <p className="text-xs sm:text-sm text-white/80">เตรียมพบกับ SACIT Symposium 2025</p>
                  <p className="text-lg sm:text-2xl font-bold text-white">ระหว่างวันที่ 8 - 9 สิงหาคม 2568</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Agenda Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-[#8B7DC3] via-[#B3FFD1] to-[#BFB4EE] relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#533193] rounded-full opacity-10 -translate-x-48 translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#B3FFD1] rounded-full opacity-20 translate-x-40 translate-y-40"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.h2 
              className="text-4xl font-bold text-center text-[#533193] mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Agenda of SACIT Symposium 2025
            </motion.h2>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
              {/* Tab Headers */}
              <div className="flex">
                <button 
                  className="flex-1 py-4 px-6 font-medium text-lg bg-[#BFB4EE] text-[#533193] focus:outline-none transition-colors duration-300"
                  onClick={handleFeatureClick}
                >
                  ◆ Symposium Day 1
                </button>
                <button 
                  className="flex-1 py-4 px-6 font-medium text-lg bg-gray-200 text-gray-500 hover:text-[#533193] focus:outline-none transition-colors duration-300"
                  onClick={handleFeatureClick}
                >
                  Symposium Day 2
                </button>
              </div>
              
              {/* Date Header */}
              <div className="bg-[#533193] text-white py-3 px-6">
                <h3 className="text-xl font-medium italic">Monday, August 8</h3>
              </div>
              
              {/* Agenda Content */}
              <div className="p-8">
                <div className="max-w-2xl mx-auto">
                  {/* Table Header */}
                  <div className="grid grid-cols-2 gap-8 mb-6 pb-4 border-b-2 border-[#533193]">
                    <h4 className="text-lg font-semibold text-[#533193] text-center">time</h4>
                    <h4 className="text-lg font-semibold text-[#533193] text-center">description</h4>
                  </div>
                  
                  {/* Agenda Items */}
                  <div className="space-y-6">
                    {agenda.day1.map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="grid grid-cols-2 gap-8 items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <p className="text-[#533193] font-medium text-center text-lg">{item.time}</p>
                        <p className="text-gray-700 text-center italic text-lg">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#8B7DC3] rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
          <div className="absolute top-20 right-0 w-48 h-48 bg-[#B3FFD1] rounded-full opacity-30 translate-x-24 -translate-y-12 transform rotate-45"></div>
          <div className="absolute bottom-0 left-20 w-32 h-32 bg-[#BFB4EE] rounded-full opacity-25"></div>
          
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-center text-[#533193]"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Speaker
            </motion.h2>
          </div>
          
          <div className="flex gap-0 mb-12 w-full">
            {speakers.map((speaker, index) => (
              <motion.div 
                key={index} 
                className="relative group overflow-hidden flex-1"
                style={{
                  height: '356px'
                }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img 
                  src={speaker.imgSrc} 
                  alt={`${speaker.name} - ${speaker.title}`} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.innerHTML = '<span style="color: #6b7280;">Image not found</span>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Name</h3>
                  <p className="text-sm opacity-90">{speaker.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-[#533193] text-[#533193] hover:bg-[#533193] hover:text-white transition-colors px-8 py-3 rounded-full text-lg font-medium"
              onClick={handleFeatureClick}
            >
              all speakers
            </Button>
          </div>
        </section>
        
        {/* News Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-[#8B7DC3] via-[#B3FFD1] to-[#BFB4EE] relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#533193] rounded-full opacity-20 -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#533193] rounded-full opacity-15 translate-x-40 translate-y-40"></div>
          
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold text-[#533193]">Media and news</h2>
              <Button 
                variant="outline" 
                className="border-[#533193] text-[#533193] hover:bg-[#533193] hover:text-white transition-colors px-6 py-2 rounded-full text-sm font-medium"
                onClick={handleFeatureClick}
              >
                all media and news
              </Button>
            </div>
            
            {/* Cards */}
            <div className="flex gap-6 justify-start">
              {newsItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer flex-shrink-0"
                  style={{
                    width: '300px',
                    height: '380px',
                    borderRadius: '15px',
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #533192 100%), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="%23lightgray"/></svg>') lightgray 50% / cover no-repeat`
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={handleFeatureClick}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img-replace alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #533192 100%)'
                    }}
                  ></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.category && (
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30">
                          {item.category}
                        </span>
                      )}
                      {item.type && (
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30">
                          {item.type}
                        </span>
                      )}
                    </div>
                    
                    {/* Bottom Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">{item.description}</p>
                      {item.author && (
                        <p className="text-white/80 text-sm font-medium">{item.author}</p>
                      )}
                      
                      {/* Arrow Button */}
                      <div className="flex justify-end">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
                          <ChevronRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-center"
              style={{
                background: 'linear-gradient(90deg, #533193 0%, #BFB4EE 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"AWConqueror Std Didot"',
                fontSize: '40px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal'
              }}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Overall of SACIT Symposium
            </motion.h2>
          </div>
          
          {/* Gallery Grid */}
          <div className="w-full">
            {/* Top Row - 5 images (เลื่อนจากขวาไปซ้าย) */}
            <div className="grid grid-cols-5 gap-0">
              {[gallery01, gallery02, gallery03, gallery04, gallery05].map((image, index) => (
                <motion.div 
                  key={index} 
                  className="aspect-[4/3] bg-gray-200 overflow-hidden hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  onClick={() => openLightbox(image, index)}
                >
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Bottom Row - 5 images (เลื่อนจากซ้ายไปขวา) */}
            <div className="grid grid-cols-5 gap-0">
              {[gallery06, gallery07, gallery08, gallery09].map((image, index) => (
                <motion.div 
                  key={index + 5} 
                  className="aspect-[4/3] bg-gray-200 overflow-hidden hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  onClick={() => openLightbox(image, index + 5)}
                >
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 6}`}
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
              ))}
              {/* รูปที่ 10 - ใช้ gallery01 อีกครั้ง */}
              <motion.div 
                className="aspect-[4/3] bg-gray-200 overflow-hidden hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 4 * 0.1, ease: "easeOut" }}
                onClick={() => openLightbox(gallery01, 0)}
              >
                <img 
                  src={gallery01} 
                  alt="Gallery 10"
                  className="w-full h-full object-cover" 
                />
              </motion.div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="border-[#533193] text-[#533193] hover:bg-[#533193] hover:text-white transition-colors px-8 py-3 rounded-full text-lg font-medium"
              onClick={handleFeatureClick}
            >
              all photos and video
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-[#8B7DC3] via-[#B3FFD1] to-[#BFB4EE] pt-16 pb-8 text-[#533193] relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#533193] rounded-full opacity-10 -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#533193] rounded-full opacity-15 translate-x-40 translate-y-40"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div>
                <Link to="/" className="flex items-center space-x-2 mb-4">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-end w-full">
                      <img 
                        src={logoWhite} 
                        alt="SACIT" 
                        className="h-6 w-auto"
                        style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(15%) saturate(4390%) hue-rotate(248deg) brightness(91%) contrast(93%)' }}
                      />
                    </div>
                    <div className="flex items-center justify-start w-full">
                      <img 
                        src={symposiumText} 
                        alt="Symposium" 
                        className="h-7 w-auto"
                        style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(15%) saturate(4390%) hue-rotate(248deg) brightness(91%) contrast(93%)' }}
                      />
                    </div>
                  </div>
                </Link>
                <p className="text-sm text-[#533193]/80 leading-relaxed">สถาบันส่งเสริมศิลปหัตถกรรมไทย (องค์การมหาชน)<br/>THE SUSTAINABLE ARTS AND CRAFTS INSTITUTE OF THAILAND (PUBLIC ORGANIZATION)</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">ลงทะเบียน</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-[#533193] transition-colors">SACIT Symposium</Link></li>
                  <li><Link to="#" className="hover:text-[#533193] transition-colors">Agenda of SACIT Symposium 2025</Link></li>
                  <li><Link to="#" className="hover:text-[#533193] transition-colors">ผู้บรรยาย</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">ข้อมูลเพิ่มเติม</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-[#533193] transition-colors">สื่อและข่าวสาร</Link></li>
                  <li><Link to="#" className="hover:text-[#533193] transition-colors">บรรยากาศภายในงาน</Link></li>
                  <li><Link to="/admin" className="hover:text-[#533193] transition-colors">สำหรับเจ้าหน้าที่</Link></li>
                  <li><Link to="/admin" className="hover:text-[#533193] transition-colors">เข้าสู่ระบบจัดการ</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Join us to know the news</h4>
                <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                  <Input type="email" placeholder="Enter your email" className="bg-white border-gray-300 focus:border-[#A0E7D5] focus:ring-[#A0E7D5] rounded-md" />
                  <Button type="submit" className="bg-[#533193] text-white hover:bg-[#533193]/80 rounded-md px-4">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
            <div className="border-t border-[#533193]/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-[#533193]/80">
              <p>&copy; 2025 SACIT Symposium. All rights reserved</p>
              <div className="flex space-x-4 mt-4 sm:mt-0">
                <Link to="#" className="hover:text-[#533193]">Terms of Services</Link>
                <Link to="#" className="hover:text-[#533193]">Privacy Policy</Link>
                <Link to="#" className="hover:text-[#533193]">Cookies</Link>
              </div>
            </div>
          </div>
        </footer>

      </div>
      
      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          imageUrl={lightboxImage}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
          hasNext={true}
          hasPrev={true}
          currentIndex={lightboxIndex}
          totalImages={galleryImagesArray.length}
        />
      )}
    </>
  );
};

export default LandingPage;