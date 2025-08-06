import React from 'react';
import { motion } from 'framer-motion';

const CollaborativePartners = () => {
  // University partners data
  const universities = [
    {
      id: 1,
      name: 'มหาวิทยาลัยเชียงใหม่',
      nameEn: 'Chiang Mai University',
      logo: '/src/assets/logos/cmu-logo.png', // You'll need to add actual logos
      color: '#8B4513', // Brown color for CMU
      description: 'มหาวิทยาลัยชั้นนำของภาคเหนือ ที่มีประวัติศาสตร์ยาวนานและเป็นแหล่งเรียนรู้ทางวิชาการ',
      established: '2461'
    },
    {
      id: 2,
      name: 'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา',
      nameEn: 'Rajamangala University of Technology Lanna',
      logo: '/src/assets/logos/rmutl-logo.png',
      color: '#1E40AF', // Blue color
      description: 'มหาวิทยาลัยเทคโนโลยีที่มุ่งเน้นการพัฒนาทักษะด้านเทคโนโลยีและนวัตกรรม',
      established: '2548'
    },
    {
      id: 3,
      name: 'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา',
      nameEn: 'Faculty of Arts and Architecture',
      subName: 'คณะศิลปกรรมและสถาปัตยกรรมศาสตร์',
      logo: '/src/assets/logos/faa-logo.png',
      color: '#7C3AED', // Purple color
      description: 'คณะที่เน้นการพัฒนาศิลปกรรมและสถาปัตยกรรม เพื่อสร้างสรรค์งานศิลปะที่มีคุณค่า',
      established: '2552'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Gradient Background */}
      <div className="relative mt-20">
        <div 
          className="w-full py-24"
          style={{
            background: 'linear-gradient(135deg, #BFB4EE 0%, #B3FFD1 100%)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 
                className="mb-6"
                style={{
                  color: 'rgb(83, 49, 146)',
                  fontFamily: 'Prompt',
                  fontSize: '48px',
                  fontWeight: '800',
                  lineHeight: 'normal',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Creative Works Exhibition
              </h1>
              <h2 
                className="mb-4"
                style={{
                  color: 'rgb(83, 49, 146)',
                  fontFamily: 'Prompt',
                  fontSize: '32px',
                  fontWeight: '600',
                  lineHeight: 'normal'
                }}
              >
                Collaborative Partners
              </h2>
              <p 
                className="text-lg max-w-3xl mx-auto"
                style={{
                  color: 'rgb(83, 49, 146)',
                  fontFamily: 'Prompt',
                  fontWeight: '500'
                }}
              >
                พันธมิตรทางวิชาการที่ร่วมกันสร้างสรรค์นิทรรศการผลงานสร้างสรรค์
                <br />
                เพื่อแสดงความร่วมมือและแลกเปลี่ยนองค์ความรู้ทางศิลปะและวัฒนธรรม
              </p>
            </motion.div>
          </div>
        </div>

        {/* Purple accent bar */}
        <div className="w-full h-2 bg-gradient-to-r from-purple-700 to-purple-500"></div>
      </div>

      {/* Universities Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {universities.map((university, index) => (
            <motion.div
              key={university.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              {/* University Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 overflow-hidden">
                {/* Logo Section */}
                <div 
                  className="relative h-64 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${university.color}20 0%, ${university.color}10 100%)`
                  }}
                >
                  {/* Placeholder for logo - you can replace with actual logo images */}
                  <div 
                    className="w-32 h-32 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${university.color} 0%, ${university.color}CC 100%)`
                    }}
                  >
                    <div className="text-white text-4xl font-bold">
                      {university.name.charAt(0)}
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm"></div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{
                        color: university.color,
                        fontFamily: 'Prompt',
                        fontWeight: '700'
                      }}
                    >
                      {university.name}
                    </h3>
                    {university.subName && (
                      <p 
                        className="text-sm mb-2"
                        style={{
                          color: university.color,
                          fontFamily: 'Prompt',
                          fontWeight: '500'
                        }}
                      >
                        {university.subName}
                      </p>
                    )}
                    <p 
                      className="text-gray-600 text-sm font-medium"
                      style={{
                        fontFamily: 'Prompt'
                      }}
                    >
                      {university.nameEn}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p 
                      className="text-gray-700 text-sm leading-relaxed text-center"
                      style={{
                        fontFamily: 'Prompt',
                        fontWeight: '400'
                      }}
                    >
                      {university.description}
                    </p>
                    
                    <div className="flex justify-center">
                      <span 
                        className="px-4 py-2 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${university.color}15`,
                          color: university.color,
                          fontFamily: 'Prompt'
                        }}
                      >
                        ก่อตั้ง พ.ศ. {university.established}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom accent */}
                <div 
                  className="h-1"
                  style={{
                    background: `linear-gradient(90deg, ${university.color} 0%, ${university.color}66 100%)`
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Collaboration Statement */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 
              className="text-3xl font-bold mb-6"
              style={{
                color: 'rgb(83, 49, 146)',
                fontFamily: 'Prompt',
                fontWeight: '700'
              }}
            >
              ความร่วมมือเพื่อการพัฟนา
            </h3>
            <p 
              className="text-lg text-gray-700 leading-relaxed"
              style={{
                fontFamily: 'Prompt',
                fontWeight: '500'
              }}
            >
              การจัดนิทรรศการ Creative Works Exhibition ครั้งนี้ เป็นผลจากความร่วมมือระหว่างสถาบันการศิกษาชั้นนำ
              ที่มีวิสัยทัศน์ร่วมกันในการส่งเสริมศิลปะ วัฒนธรรม และนวัตกรรมทางการออกแบบ 
              เพื่อสร้างเครือข่ายการเรียนรู้และแลกเปลี่ยนประสบการณ์ที่จะนำไปสู่การพัฒนาที่ยั่งยืน
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div 
        className="py-16"
        style={{
          background: 'linear-gradient(135deg, #533193 0%, #BFB4EE 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 
              className="text-3xl font-bold text-white mb-6"
              style={{
                fontFamily: 'Prompt',
                fontWeight: '700'
              }}
            >
              ติดต่อเรา
            </h3>
            <p 
              className="text-white text-lg mb-8"
              style={{
                fontFamily: 'Prompt',
                fontWeight: '500'
              }}
            >
              สนใจร่วมงานหรือต้องการข้อมูลเพิ่มเติม ติดต่อเราได้
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:info@sacit.ac.th"
                className="bg-white text-purple-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                style={{
                  fontFamily: 'Prompt',
                  fontWeight: '600'
                }}
              >
                📧 info@sacit.ac.th
              </a>
              <a 
                href="tel:+66-2-xxx-xxxx"
                className="bg-white/20 text-white border border-white px-8 py-3 rounded-full font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                style={{
                  fontFamily: 'Prompt',
                  fontWeight: '600'
                }}
              >
                📞 02-XXX-XXXX
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativePartners;