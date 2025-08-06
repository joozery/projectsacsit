import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import useSpeakers from '@/hooks/useSpeakers';

// Fallback speaker images
import speaker01 from '@/assets/speker/01.jpg';
import speaker02 from '@/assets/speker/02.jpg';
import speaker03 from '@/assets/speker/03.jpg';
import speaker04 from '@/assets/speker/04.jpg';
import speaker05 from '@/assets/speker/05.jpg';
import speaker06 from '@/assets/speker/06.jpg';

const PublicSpeakersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const speakersPerPage = 6;
  
  // Use speakers API
  const { speakers: apiSpeakers, loading: speakersLoading } = useSpeakers({ 
    autoLoad: true,
    initialStatus: 'active'
  });

  // Fallback speakers data
  const fallbackSpeakers = [
    { name: 'chaulong', title: 'บทความ/ผลงานสร้างสรรค์', imgSrc: speaker01 },
    { name: 'jackson wang', title: 'บทความ/ผลงานสร้างสรรค์', imgSrc: speaker02 },
    { name: 'ดร. สมชาย เชี่ยวชาญ', title: 'บทความ/ผลงานสร้างสรรค์', imgSrc: speaker03 },
    { name: 'คุณวนิดา สร้างสรรค์', title: 'บทความ/ผลงานสร้างสรรค์', imgSrc: speaker04 },
    { name: 'อาจารย์มานพ สืบสาน', title: 'บทความ/ผลงานสร้างสรรค์', imgSrc: speaker05 },
    { name: 'คุณรัตนา ต่อยอด', title: 'บทความ/ผลงานสร้างสรรค์', imgSrc: speaker06 },
  ];

  // Transform API speakers to match the expected format
  const speakers = apiSpeakers.length > 0 
    ? apiSpeakers.map(speaker => ({
        name: speaker.name,
        title: 'บทความ/ผลงานสร้างสรรค์', // Default title
        imgSrc: speaker.photo_url || speaker01, // Use API photo or fallback
        pdfUrl: speaker.pdf_url, // Add PDF URL
        pdfFileName: speaker.pdf_filename // Add PDF filename
      }))
    : fallbackSpeakers;

  // Calculate pagination
  const totalPages = Math.ceil(speakers.length / speakersPerPage);
  const startIndex = (currentPage - 1) * speakersPerPage;
  const endIndex = startIndex + speakersPerPage;
  const currentSpeakers = speakers.slice(startIndex, endIndex);

  const handleSpeakerClick = (speaker) => {
    if (speaker.pdfUrl) {
      // เปิด PDF ในแท็บใหม่
      const link = document.createElement('a');
      link.href = speaker.pdfUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = speaker.pdfFileName || `${speaker.name}_document.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // ถ้าไม่มี PDF ให้แสดง alert หรือ modal ข้อมูล
      console.log("Speaker details:", speaker);
      alert(`ข้อมูลผู้บรรยาย: ${speaker.name}\nตำแหน่ง: ${speaker.title}`);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const numbers = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          numbers.push(i);
        }
        numbers.push('...');
        numbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        numbers.push(1);
        numbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          numbers.push(i);
        }
      } else {
        numbers.push(1);
        numbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          numbers.push(i);
        }
        numbers.push('...');
        numbers.push(totalPages);
      }
    }
    
    return numbers;
  };

  return (
    <>
      <Helmet>
        <title>วิทยากร - SACIT Symposium</title>
        <meta name="description" content="ดูรายชื่อวิทยากรทั้งหมดในงาน SACIT Symposium 2025" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <div 
          className="w-full flex items-center justify-center relative"
          style={{
            width: '100%',
            height: '280px',
            flexShrink: 0,
            background: 'linear-gradient(90deg, #BFB4EE 0%, #B3FFD1 100%)',
          }}
        >
          <h1
            className="relative z-10"
            style={{
              fontFamily: 'AWConqueror Std Didot',
              fontWeight: 700,
              fontSize: '40px',
              lineHeight: 'normal',
              color: '#533193',
              textAlign: 'center',
              width: '100%',
              margin: 0,
              padding: 0,
              marginTop: '60px',
              fontStyle: 'normal'
            }}
          >
            วิทยากร
          </h1>
        </div>
        
        {/* Breadcrumb Section */}
        <div className="w-full py-4 shadow-md border-b-4" style={{background: 'linear-gradient(90deg, #533193 0%, #BFB4EE 100%)', borderBottomColor: '#533193', borderBottomWidth: '4px'}}>
          <div className="container mx-auto flex justify-center items-center">
            <span
              className="flex items-center gap-2 text-lg font-medium drop-shadow"
              style={{
                fontFamily: 'Poppins',
                fontSize: '20px',
                fontWeight: 500,
                background: 'linear-gradient(90deg, #BFB4EE 0%, #B3FFD1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                lineHeight: 'normal',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <polygon points="9,2 16,9 9,16 2,9" fill="#C7BFFF"/>
              </svg>
              รายชื่อวิทยากรทั้งหมด
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Loading State */}
          {speakersLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  style={{ height: '400px' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-400">กำลังโหลด...</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Speakers Grid */}
          {!speakersLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentSpeakers.map((speaker, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden relative"
                  style={{ height: '500px' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Image - Full Card */}
                  <div className="relative w-full h-full">
                    <img 
                      src={speaker.imgSrc} 
                      alt={`${speaker.name} - ${speaker.title}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.backgroundColor = '#f3f4f6';
                        e.target.style.display = 'flex';
                        e.target.style.alignItems = 'center';
                        e.target.style.justifyContent = 'center';
                        e.target.innerHTML = '<span style="color: #6b7280;">Image not found</span>';
                      }}
                    />
                    
                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div>
                        {/* Department/Unit */}
                        <p className="text-gray-300 text-sm mb-2">หน่วยงาน</p>
                        
                        {/* Name */}
                        <h3 className="text-xl font-bold text-white mb-2">{speaker.name}</h3>
                        
                        {/* Title */}
                        <p className="text-gray-300 text-sm">{speaker.title}</p>
                      </div>
                      
                      {/* Navigation Button */}
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => handleSpeakerClick(speaker)}
                          className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
                          title={speaker.pdfUrl ? `คลิกเพื่อดู ${speaker.pdfFileName || 'เอกสาร'}` : `ข้อมูลผู้บรรยาย: ${speaker.name}`}
                        >
                          <ArrowRight className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!speakersLoading && speakers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">ยังไม่มีวิทยากร</h3>
              <p className="text-gray-500">วิทยากรจะปรากฏที่นี่เมื่อมีการเพิ่มข้อมูล</p>
            </div>
          )}

          {/* Pagination */}
          {!speakersLoading && speakers.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              {getPaginationNumbers().map((number, index) => (
                <button
                  key={index}
                  onClick={() => typeof number === 'number' && handlePageChange(number)}
                  disabled={typeof number !== 'number'}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200
                    ${typeof number === 'number' 
                      ? currentPage === number
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'text-gray-400 cursor-default'
                    }
                  `}
                >
                  {number}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PublicSpeakersPage; 