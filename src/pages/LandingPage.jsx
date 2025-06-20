
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Diamond, Sparkles, Users, Image as ImageIcon, Newspaper as LucideNewspaper, BarChart2, Send } from 'lucide-react';

const SacitLogo = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M50 0L61.2266 38.7734L100 50L61.2266 61.2266L50 100L38.7734 61.2266L0 50L38.7734 38.7734L50 0Z" fill="#A0E7D5"/>
    <path d="M50 25L55.8166 44.1834L75 50L55.8166 55.8166L50 75L44.1834 55.8166L25 50L44.1834 44.1834L50 25Z" fill="currentColor"/>
  </svg>
);


const LandingPage = () => {
  const navigate = useNavigate();
  const handleFeatureClick = () => {
    // In a real app, this would trigger a toast notification.
    // For this example, it does nothing as Toaster is part of Admin layout.
    console.log("Feature not implemented yet.");
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
    { name: 'ดร. สมชาย เชี่ยวชาญ', title: 'นักวิจัยด้านนวัตกรรมผ้าไทย', imgSrc: 'man with glasses in a suit' },
    { name: 'คุณวนิดา สร้างสรรค์', title: 'ศิลปินเครื่องปั้นดินเผา', imgSrc: 'woman artist with pottery' },
    { name: 'อาจารย์มานพ สืบสาน', title: 'ผู้เชี่ยวชาญงานไม้แกะสลัก', imgSrc: 'man crafting wood' },
    { name: 'คุณรัตนา ต่อยอด', title: 'นักออกแบบเครื่องประดับร่วมสมัย', imgSrc: 'woman designing jewelry' },
    { name: 'คุณวิชัย พัฒนา', title: 'ผู้ประกอบการ OTOP ระดับประเทศ', imgSrc: 'entrepreneur with local products' },
  ];
  
  const newsItems = [
    { title: 'ผาสาทแก้ว', description: 'ผ้าไหมทอลายโบราณ ผาสาทแก้ว', author: 'ครูณกรณ์ ตั้งหลัก', imgSrc: 'intricate silk fabric texture', type: 'ผลิตภัณฑ์', category: 'ผ้าทอพื้นเมือง' },
    { title: 'หัตถกรรมจักสาน', description: 'ตะกร้าไม้ไผ่ลวดลายประณีต', author: 'กลุ่มแม่บ้านสร้างสรรค์', imgSrc: 'woven bamboo basket detail', type: 'บทความ', category: 'งานจักสาน' },
    { title: 'Crafts Bangkok 2025', description: 'ประกาศรายชื่อผู้ผ่านการคัดเลือกเข้าร่วมจำหน่ายสินค้าในงาน Crafts Bangkok 2025', author: '', imgSrc: 'Crafts Bangkok event poster', type: 'ประกาศ', category: 'งานแสดงสินค้า' },
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
  ];


  return (
    <>
      <Helmet>
        <title>SACIT Symposium - สถาบันส่งเสริมศิลปหัตถกรรมไทย</title>
        <meta name="description" content="เข้าร่วม SACIT Symposium 2025 - งานประชุมวิชาการด้านศิลปหัตถกรรมครั้งที่ 1 เพื่อการพัฒนาที่ยั่งยืนในอาเซียนและนอกอาเซียน" />
      </Helmet>
      <div className="bg-[#F5F3F7] text-[#333333] font-['Sarabun']">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#4F2A7E] bg-opacity-90 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-2">
              <SacitLogo />
              <span className="text-2xl font-bold text-white">SACIT</span>
            </Link>
            <Button 
              variant="outline" 
              className="border-[#A0E7D5] text-[#A0E7D5] hover:bg-[#A0E7D5] hover:text-[#4F2A7E] transition-colors duration-300"
              onClick={() => navigate('/admin')}
            >
              สำหรับเจ้าหน้าที่
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-[#4F2A7E] via-[#6A3E9C] to-[#8657B9] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img-replace src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1920&q=80" alt="Abstract background pattern for hero section" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold">
                sacit
              </h1>
              <p className="text-3xl sm:text-4xl md:text-5xl font-light mt-2 mb-10">
                symposium
              </p>
              <Button 
                className="bg-[#A0E7D5] text-[#4F2A7E] hover:bg-opacity-80 text-lg font-semibold px-10 py-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={handleFeatureClick}
              >
                REGISTER
              </Button>
            </motion.div>
            <motion.div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
                <ChevronRight className="w-8 h-8 text-white/50 animate-bounce" />
            </motion.div>
          </div>
          <div className="absolute -right-40 -top-20 w-96 h-96 bg-white/5 rounded-full filter blur-2xl opacity-50"></div>
          <div className="absolute -left-32 bottom-0 w-80 h-80 bg-[#A0E7D5]/10 rounded-full filter blur-2xl opacity-50"></div>
        </section>

        {/* About Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-4xl font-bold text-[#4F2A7E] mb-6">เกี่ยวกับ SACIT Symposium</h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  SACIT Symposium is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl"
              >
                <img-replace alt="People attending a conference, showing engagement and learning" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#4F2A7E]/30 to-transparent"></div>
              </motion.div>
            </div>
            <motion.div 
              className="mt-16 p-8 sm:p-12 bg-gradient-to-br from-[#6A3E9C] to-[#4F2A7E] rounded-xl shadow-xl text-white text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h3 className="text-2xl sm:text-3xl font-semibold mb-3">เตรียมพบกับ SACIT Symposium 2025</h3>
              <p className="text-xl sm:text-2xl font-light mb-6">ระหว่างวันที่ 8 - 9 สิงหาคม 2568</p>
              <p className="text-md sm:text-lg leading-relaxed max-w-3xl mx-auto">
                SACIT เตรียมจัดงาน SACIT Symposium 2025 การประชุมวิชาการด้านศิลปหัตถกรรมครั้งที่ 1 ภายใต้แนวคิด "Crafting Sustainability across ASEAN and Beyond" เวทีนำเสนอแลกเปลี่ยนองค์ความรู้เชิงวิชาการและผลงานการสร้างสรรค์กลุ่มงานหัตถกรรมเครื่องรักและอื่น ๆ รวมถึงการต่อยอดและพัฒนาวัตถุดิบดั้งเดิมอย่าง “ยางรัก” และวัตถุดิบทดแทน เพื่อตอบโจทย์การส่งเสริมงานหัตถกรรมในทุกมิติอย่างยั่งยืน
              </p>
            </motion.div>
          </div>
        </section>

        {/* Agenda Section */}
        <section className="py-16 sm:py-24 bg-[#F5F3F7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-4xl font-bold text-center text-[#4F2A7E] mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Agenda of SACIT Symposium
            </motion.h2>
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-xl">
              <div className="flex border-b-2 border-gray-200 mb-6">
                {['Symposium Day 1', 'Symposium Day 2'].map((day, index) => (
                  <button 
                    key={day}
                    className={`py-3 px-4 sm:px-6 font-medium text-lg focus:outline-none transition-colors duration-300 ${ index === 0 ? 'text-[#4F2A7E] border-b-4 border-[#A0E7D5]' : 'text-gray-500 hover:text-[#6A3E9C]'}`}
                    onClick={handleFeatureClick}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Monday, August 8</h3>
                <div className="space-y-4">
                  {agenda.day1.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <p className="w-32 text-[#6A3E9C] font-medium">{item.time}</p>
                      <p className="text-gray-600">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-4xl font-bold text-center text-[#4F2A7E] mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              ผู้บรรยาย
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {speakers.map((speaker, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden shadow-lg mb-4 border-4 border-transparent group-hover:border-[#A0E7D5] transition-all duration-300 transform group-hover:scale-105">
                    <img-replace alt={speaker.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{speaker.name}</h3>
                  <p className="text-sm text-gray-600">{speaker.title}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                className="border-[#4F2A7E] text-[#4F2A7E] hover:bg-[#4F2A7E] hover:text-white transition-colors px-8 py-3 rounded-full text-lg font-medium"
                onClick={handleFeatureClick}
              >
                ผู้บรรยายทั้งหมด
              </Button>
            </div>
          </div>
        </section>
        
        {/* News Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#6A3E9C] to-[#4F2A7E] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold">สื่อและข่าวสาร</h2>
              <Button 
                variant="link" 
                className="text-[#A0E7D5] hover:text-white text-lg font-medium"
                onClick={handleFeatureClick}
              >
                สื่อและข่าวสารทั้งหมด <ChevronRight className="inline w-5 h-5" />
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {newsItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative h-56 rounded-lg overflow-hidden mb-4">
                    <img-replace alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute top-2 left-2 flex space-x-2">
                      {item.type && <span className="bg-[#A0E7D5] text-[#4F2A7E] text-xs font-semibold px-2 py-1 rounded">{item.type}</span>}
                      {item.category && <span className="bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded">{item.category}</span>}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#A0E7D5] transition-colors">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-3 h-10 overflow-hidden">{item.description}</p>
                  {item.author && <p className="text-sm text-gray-400">โดย {item.author}</p>}
                  <Button variant="link" className="text-[#A0E7D5] p-0 mt-3 group-hover:underline" onClick={handleFeatureClick}>
                    อ่านเพิ่มเติม <ChevronRight className="inline w-4 h-4"/>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold text-[#4F2A7E]">บรรยากาศภายในงาน</h2>
              <Button 
                variant="outline" 
                className="border-[#4F2A7E] text-[#4F2A7E] hover:bg-[#4F2A7E] hover:text-white transition-colors px-6 py-2.5 rounded-full text-md font-medium"
                onClick={handleFeatureClick}
              >
                ภาพและวิดีโอทั้งหมด <ChevronRight className="inline w-5 h-5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {galleryImages.slice(0, 8).map((image, index) => (
                <motion.div 
                  key={index} 
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <img-replace alt={image.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#EDE7F6] pt-16 pb-8 text-[#4F2A7E]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div>
                <Link to="/" className="flex items-center space-x-2 mb-4">
                  <SacitLogo />
                  <span className="text-3xl font-bold text-[#4F2A7E]">sacit</span>
                </Link>
                <p className="text-sm text-[#6A3E9C] leading-relaxed">สถาบันส่งเสริมศิลปหัตถกรรมไทย (องค์การมหาชน)<br/>THE SUSTAINABLE ARTS AND CRAFTS INSTITUTE OF THAILAND (PUBLIC ORGANIZATION)</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">ลงทะเบียน</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-[#A0E7D5] transition-colors">SACIT Symposium</Link></li>
                  <li><Link to="#" className="hover:text-[#A0E7D5] transition-colors">Agenda of SACIT Symposium 2025</Link></li>
                  <li><Link to="#" className="hover:text-[#A0E7D5] transition-colors">ผู้บรรยาย</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">ข้อมูลเพิ่มเติม</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-[#A0E7D5] transition-colors">สื่อและข่าวสาร</Link></li>
                  <li><Link to="#" className="hover:text-[#A0E7D5] transition-colors">บรรยากาศภายในงาน</Link></li>
                  <li><Link to="#" className="hover:text-[#A0E7D5] transition-colors">สำหรับเจ้าหน้าที่</Link></li>
                  <li><Link to="/admin" className="hover:text-[#A0E7D5] transition-colors">เข้าสู่ระบบ</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Join us to know the news</h4>
                <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                  <Input type="email" placeholder="Enter your email" className="bg-white border-gray-300 focus:border-[#A0E7D5] focus:ring-[#A0E7D5] rounded-md" />
                  <Button type="submit" className="bg-[#A0E7D5] text-[#4F2A7E] hover:bg-opacity-80 rounded-md px-4">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
            <div className="border-t border-[#D1C4E9] pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-[#6A3E9C]">
              <p>&copy; 2025 SACIT Symposium. All rights reserved</p>
              <div className="flex space-x-4 mt-4 sm:mt-0">
                <Link to="#" className="hover:text-[#A0E7D5]">Terms of Services</Link>
                <Link to="#" className="hover:text-[#A0E7D5]">Privacy Policy</Link>
                <Link to="#" className="hover:text-[#A0E7D5]">Cookies</Link>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default LandingPage;

