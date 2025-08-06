import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  QrCode,
  Send,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import registrationService from '@/services/registrationService';
import { api } from '@/services/api';

import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';

const CheckInPage = () => {
  const [searchParams] = useSearchParams();
  const year = searchParams.get('year') || '2025'; // ใช้ปี 2025 แทน 2025
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [attendeesData, setAttendeesData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  // Fetch attendees data from API
  const fetchAttendeesData = async () => {
    setLoadingData(true);
    setError(null);
    
    try {
      // Fetch registrations data directly from registrations API
      const [generalResponse, researchResponse, creativeResponse] = await Promise.all([
        api.get('/registrations', { params: { year, type: 'general' } }),
        api.get('/registrations', { params: { year, type: 'research' } }),
        api.get('/registrations', { params: { year, type: 'creative' } })
      ]);
      
      // Transform API data to match our format
      const transformAttendee = (attendee) => ({
        id: attendee.id,
        name: `${attendee.title_prefix || ''} ${attendee.first_name} ${attendee.last_name}`.trim(),
        email: attendee.email,
        phone: attendee.phone,
        organization: attendee.organization,
        education: attendee.education_level || 'ไม่ระบุ',
        registeredAt: attendee.created_at || attendee.registered_at,
        status: attendee.status || 'confirmed',
        checkedIn: attendee.checked_in || false,
        checkInTime: attendee.check_in_time,
        checkInRequested: attendee.check_in_requested || false,
        checkInRequestTime: attendee.check_in_request_time,
        projectTitle: attendee.project_title,
        category: attendee.category,
        submissionStatus: attendee.submission_status,
        type: attendee.registration_type
      });

      const generalAttendees = generalResponse.data.success ? generalResponse.data.data?.map(transformAttendee) || [] : [];
      const researchAttendees = researchResponse.data.success ? researchResponse.data.data?.map(transformAttendee) || [] : [];
      const creativeAttendees = creativeResponse.data.success ? creativeResponse.data.data?.map(transformAttendee) || [] : [];

      const newData = {
        [year]: {
          general: generalAttendees,
          research: researchAttendees,
          creative: creativeAttendees
        }
      };

      setAttendeesData(newData);
      localStorage.setItem('attendeesData', JSON.stringify(newData));
      
    } catch (error) {
      console.error('Error fetching attendees data:', error);
      setError('ไม่สามารถดึงข้อมูลผู้เข้าร่วมงานได้');
      
      // Fallback to localStorage if available
      const savedData = localStorage.getItem('attendeesData');
      if (savedData) {
        setAttendeesData(JSON.parse(savedData));
      }
    } finally {
      setLoadingData(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchAttendeesData();
  }, [year]);

  const getAllAttendees = () => {
    if (!attendeesData || !attendeesData[year]) {
      return [];
    }
    const yearData = attendeesData[year];
    return [...(yearData.general || []), ...(yearData.research || []), ...(yearData.creative || [])];
  };

  const findAttendeeType = (attendeeId) => {
    if (!attendeesData || !attendeesData[year]) return null;
    
    const yearData = attendeesData[year];
    
    if (yearData.general?.find(a => a.id === attendeeId)) return 'general';
    if (yearData.research?.find(a => a.id === attendeeId)) return 'research';
    if (yearData.creative?.find(a => a.id === attendeeId)) return 'creative';
    
    return null;
  };

  const updateAttendeeData = (attendeeId, updates) => {
    const attendeeType = findAttendeeType(attendeeId);
    if (!attendeeType || !attendeesData) return;

    const newData = {
      ...attendeesData,
      [year]: {
        ...attendeesData[year],
        [attendeeType]: attendeesData[year][attendeeType].map(attendee =>
          attendee.id === attendeeId ? { ...attendee, ...updates } : attendee
        )
      }
    };

    setAttendeesData(newData);
    localStorage.setItem('attendeesData', JSON.stringify(newData));
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('attendeeDataUpdated', { detail: newData }));
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const allAttendees = getAllAttendees();
      const results = allAttendees.filter(attendee => 
        attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.phone.includes(searchTerm) ||
        attendee.organization.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  };

  const handleCheckInRequest = async (attendee) => {
    setIsLoading(true);
    
    try {
      // Use the attendee.id directly as it's now the registration ID
      const response = await api.put(`/registrations/${attendee.id}/checkin`, {
        check_in_requested: true
      });

      if (response.data.success) {
        const requestTime = new Date().toISOString();
        
        // Update attendee check-in request status in shared data
        updateAttendeeData(attendee.id, {
          checkInRequested: true,
          checkInRequestTime: requestTime
        });
        
        // Update local state for UI
        const updatedAttendee = {
          ...attendee,
          checkInRequested: true,
          checkInRequestTime: requestTime
        };
        
        setSelectedAttendee(updatedAttendee);
        setRequestSuccess(true);
        
        // Update search results
        setSearchResults(prev => 
          prev.map(a => a.id === attendee.id ? updatedAttendee : a)
        );
      } else {
        alert('เกิดข้อผิดพลาดในการส่งคำขอ: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error sending check-in request:', error);
      alert('เกิดข้อผิดพลาดในการส่งคำขอ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSearchTerm('');
    setSearchResults([]);
    setSelectedAttendee(null);
    setRequestSuccess(false);
  };

  const getStatusColor = (attendee) => {
    if (attendee.checkedIn) return 'bg-green-100 text-green-800';
    if (attendee.checkInRequested) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (attendee) => {
    if (attendee.checkedIn) return 'เช็คอินแล้ว';
    if (attendee.checkInRequested) return 'รอการยืนยัน';
    return 'ยังไม่ได้เช็คอิน';
  };

  const getStatusIcon = (attendee) => {
    if (attendee.checkedIn) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (attendee.checkInRequested) return <Clock className="w-6 h-6 text-yellow-600" />;
    return <AlertCircle className="w-6 h-6 text-gray-400" />;
  };

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const timeoutId = setTimeout(handleSearch, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, attendeesData]);

  // Show loading if data is not loaded yet
  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8B7DC3] via-[#B3FFD1] to-[#BFB4EE] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white" style={{ fontFamily: 'Prompt' }}>กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  // Show error if data loading failed
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8B7DC3] via-[#B3FFD1] to-[#BFB4EE] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-white mb-4" style={{ fontFamily: 'Prompt' }}>{error}</p>
          <Button onClick={fetchAttendeesData} className="bg-white text-[#533193]" style={{ fontFamily: 'Prompt' }}>
            ลองใหม่
          </Button>
        </div>
      </div>
    );
  }

  if (requestSuccess && selectedAttendee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8B7DC3] via-[#B3FFD1] to-[#BFB4EE]">
        {/* Header */}
        <header className="bg-[#533193] shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center mb-2">
                <div className="flex items-center justify-end w-full">
                  <img src={logoWhite} alt="SACIT" className="h-6 w-auto" />
                </div>
                <div className="flex items-center justify-start w-full">
                  <img src={symposiumText} alt="Symposium" className="h-7 w-auto" />
                </div>
              </div>
              <h1 className="text-xl font-bold text-white">SACIT Symposium {year}</h1>
            </div>
          </div>
        </header>

        {/* Success Content */}
        <div className="container mx-auto px-4 py-8 max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Prompt' }}>ส่งคำขอเรียบร้อย!</h2>
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'Prompt' }}>คำขอเช็คอินของคุณได้ถูกส่งแล้ว รอการยืนยันจากเจ้าหน้าที่</p>
            
                          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-semibold text-gray-900" style={{ fontFamily: 'Prompt' }}>{selectedAttendee.name}</p>
                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Prompt' }}>{selectedAttendee.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-5 h-5 text-gray-500" />
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Prompt' }}>{selectedAttendee.organization}</p>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Prompt' }}>
                    เวลาส่งคำขอ: {new Date(selectedAttendee.checkInRequestTime).toLocaleString('th-TH')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <p className="text-sm text-yellow-600 font-medium" style={{ fontFamily: 'Prompt' }}>
                    สถานะ: รอการยืนยันจากเจ้าหน้าที่
                  </p>
                </div>
              </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-blue-900 mb-2" style={{ fontFamily: 'Prompt' }}>ขั้นตอนถัดไป:</h3>
              <ul className="text-sm text-blue-800 space-y-1" style={{ fontFamily: 'Prompt' }}>
                <li>• เจ้าหน้าที่จะตรวจสอบข้อมูลของคุณ</li>
                <li>• หากข้อมูลถูกต้อง จะได้รับการยืนยันเช็คอิน</li>
                <li>• คุณสามารถเข้าร่วมงานได้ทันที</li>
              </ul>
            </div>
            
            <Button 
              onClick={resetForm}
              className="w-full bg-[#533193] hover:bg-[#533193]/90 text-white py-3 rounded-xl"
              style={{ fontFamily: 'Prompt' }}
            >
              ส่งคำขอสำหรับคนอื่น
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B7DC3] via-[#B3FFD1] to-[#BFB4EE] flex flex-col">
      {/* Header */}
      <header className="bg-[#533193] pb-6 pt-6 flex flex-col items-center justify-center text-center">
        <span className="text-white text-base mb-1" style={{ fontFamily: 'Prompt' }}>✦ SACIT</span>
        <span className="text-white text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: 'Prompt' }}>Symposium</span>
        <span className="text-white text-2xl md:text-3xl font-bold mt-1" style={{ fontFamily: 'Prompt' }}>ส่งคำขอเช็คอิน</span>
        <span className="text-white text-base mt-1" style={{ fontFamily: 'Prompt' }}>SACIT Symposium {year}</span>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-6">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-6 py-8 flex flex-col items-center mx-auto">
          <div className="w-full text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Prompt' }}>ค้นหาชื่อของคุณ</h2>
            <p className="text-gray-600 text-base" style={{ fontFamily: 'Prompt' }}>กรอกชื่อ, อีเมล, เบอร์โทร หรือชื่อองค์กร</p>
          </div>
          
          {/* Search Input */}
          <div className="relative w-full mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="ค้นหาชื่อ, อีเมล, หรือองค์กร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-base rounded-xl border-2 border-gray-200 focus:border-[#533193] focus:ring-0 bg-gray-50"
              style={{ fontFamily: 'Prompt' }}
            />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="w-full mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Prompt' }}>ผลการค้นหา ({searchResults.length})</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {searchResults.map((attendee) => (
                  <motion.div
                    key={attendee.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                                         <div className="flex items-start justify-between mb-2">
                       <div className="flex-1">
                         <h4 className="font-semibold text-gray-900" style={{ fontFamily: 'Prompt' }}>{attendee.name}</h4>
                         <p className="text-sm text-gray-600" style={{ fontFamily: 'Prompt' }}>{attendee.email}</p>
                         <p className="text-sm text-gray-600" style={{ fontFamily: 'Prompt' }}>{attendee.organization}</p>
                       </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(attendee)}
                                                 <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(attendee)}`} style={{ fontFamily: 'Prompt' }}>
                           {getStatusText(attendee)}
                         </span>
                      </div>
                    </div>
                    
                    {!attendee.checkedIn && !attendee.checkInRequested && (
                      <Button
                        onClick={() => handleCheckInRequest(attendee)}
                        disabled={isLoading}
                        className="w-full bg-[#533193] hover:bg-[#533193]/90 text-white py-2 rounded-lg text-sm"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            กำลังส่งคำขอ...
                          </>
                                                 ) : (
                           <span style={{ fontFamily: 'Prompt' }}>ส่งคำขอเช็คอิน</span>
                         )}
                      </Button>
                    )}
                    
                                         {attendee.checkInRequested && !attendee.checkedIn && (
                       <div className="text-center">
                         <p className="text-sm text-yellow-600 font-medium" style={{ fontFamily: 'Prompt' }}>
                           ✓ ส่งคำขอแล้ว รอการยืนยัน
                         </p>
                         <p className="text-xs text-gray-500" style={{ fontFamily: 'Prompt' }}>
                           {attendee.checkInRequestTime && 
                             new Date(attendee.checkInRequestTime).toLocaleString('th-TH')
                           }
                         </p>
                       </div>
                     )}
                    
                                         {attendee.checkedIn && (
                       <div className="text-center">
                         <p className="text-sm text-green-600 font-medium" style={{ fontFamily: 'Prompt' }}>
                           ✓ เช็คอินแล้ว
                         </p>
                         <p className="text-xs text-gray-500" style={{ fontFamily: 'Prompt' }}>
                           {attendee.checkInTime && 
                             new Date(attendee.checkInTime).toLocaleString('th-TH')
                           }
                         </p>
                       </div>
                     )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

                     {/* Loading indicator */}
           {isLoading && searchTerm.length >= 2 && (
             <div className="w-full text-center mb-4">
               <Loader2 className="w-6 h-6 text-[#533193] animate-spin mx-auto" />
               <p className="text-sm text-gray-600 mt-2" style={{ fontFamily: 'Prompt' }}>กำลังค้นหา...</p>
             </div>
           )}

                     {/* No results */}
           {searchResults.length === 0 && searchTerm.length >= 2 && !isLoading && (
             <div className="w-full text-center mb-4">
               <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
               <p className="text-gray-600" style={{ fontFamily: 'Prompt' }}>ไม่พบข้อมูลที่ตรงกับคำค้นหา</p>
               <p className="text-sm text-gray-500" style={{ fontFamily: 'Prompt' }}>ลองค้นหาด้วยชื่อ, อีเมล, หรือองค์กร</p>
             </div>
           )}

          {/* QR Code */}
          <div className="flex flex-col items-center mb-6">
            <QrCode className="w-16 h-16 text-gray-300 mb-2" />
          </div>
          
          {/* Welcome Text */}
          <div className="text-center mb-4">
            <div className="font-semibold text-gray-700" style={{ fontFamily: 'Prompt' }}>ยินดีต้อนรับสู่ SACIT Symposium {year}</div>
            <div className="text-gray-500 text-sm" style={{ fontFamily: 'Prompt' }}>กรุณากรอกชื่อหรือข้อมูลของคุณเพื่อส่งคำขอเช็คอิน</div>
          </div>
          
          {/* Steps Box */}
          <div className="w-full bg-blue-50 rounded-xl p-4 text-left mt-2 mb-2">
            <div className="font-bold text-blue-900 mb-2" style={{ fontFamily: 'Prompt' }}>ขั้นตอนการเช็คอิน:</div>
            <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1" style={{ fontFamily: 'Prompt' }}>
              <li>ค้นหาชื่อของคุณในระบบ</li>
              <li>กดปุ่ม "ส่งคำขอ" เพื่อส่งคำขอเช็คอิน</li>
              <li>รอเจ้าหน้าที่ตรวจสอบและยืนยัน</li>
              <li>เข้าร่วมงานได้ทันทีเมื่อได้รับการยืนยัน</li>
            </ol>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6 w-full">
          <p className="text-green-400 text-sm" style={{ fontFamily: 'Prompt' }}>
            หากมีปัญหาในการส่งคำขอ กรุณาติดต่อเจ้าหน้าที่
          </p>
        </div>
      </main>
    </div>
  );
};

export default CheckInPage; 