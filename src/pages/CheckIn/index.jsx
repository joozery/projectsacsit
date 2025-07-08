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
  AlertCircle
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';

const CheckInPage = () => {
  const [searchParams] = useSearchParams();
  const year = searchParams.get('year') || '2025';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [attendeesData, setAttendeesData] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('attendeesData');
    if (savedData) {
      setAttendeesData(JSON.parse(savedData));
    } else {
      // Default data if no saved data
      const defaultData = {
        '2025': {
          general: [
            {
              id: 1,
              name: 'นายสมชาย ใจดี',
              email: 'somchai@email.com',
              phone: '081-234-5678',
              organization: 'บริษัท ABC จำกัด',
              registeredAt: '2024-01-15',
              status: 'confirmed',
              checkedIn: false,
              checkInTime: null,
              checkInRequested: false,
              checkInRequestTime: null
            },
            {
              id: 2,
              name: 'นางสาววนิดา สวยงาม',
              email: 'wanida@email.com',
              phone: '089-876-5432',
              organization: 'มหาวิทยาลัย XYZ',
              registeredAt: '2024-01-16',
              status: 'confirmed',
              checkedIn: false,
              checkInTime: null,
              checkInRequested: false,
              checkInRequestTime: null
            },
            {
              id: 3,
              name: 'นายประยุทธ์ ขยัน',
              email: 'prayuth@email.com',
              phone: '092-111-2222',
              organization: 'สำนักงานศิลปะ',
              registeredAt: '2024-01-17',
              status: 'confirmed',
              checkedIn: true,
              checkInTime: '2024-01-20 08:30:00',
              checkInRequested: true,
              checkInRequestTime: '2024-01-20 08:25:00'
            }
          ],
          research: [
            {
              id: 4,
              name: 'ดร.อนุรักษ์ วิจัยดี',
              email: 'anurak@university.ac.th',
              phone: '081-999-8888',
              organization: 'มหาวิทยาลัยเทคโนโลยี',
              registeredAt: '2024-01-18',
              status: 'confirmed',
              projectTitle: 'การพัฒนาเทคนิคการทำยางรักแบบใหม่',
              category: 'lacquer',
              submissionStatus: 'approved',
              checkedIn: false,
              checkInTime: null,
              checkInRequested: false,
              checkInRequestTime: null
            }
          ],
          creative: [
            {
              id: 6,
              name: 'คุณศิลปิน สร้างสรรค์',
              email: 'silpin@artist.com',
              phone: '094-777-6666',
              organization: 'สตูดิโอศิลปะ',
              registeredAt: '2024-01-20',
              status: 'confirmed',
              projectTitle: 'ผลงานเครื่องปั้นดินเผาร่วมสมัย',
              category: 'contemporary',
              submissionStatus: 'approved',
              checkedIn: false,
              checkInTime: null,
              checkInRequested: true,
              checkInRequestTime: '2024-01-20 08:45:00'
            }
          ]
        }
      };
      setAttendeesData(defaultData);
      localStorage.setItem('attendeesData', JSON.stringify(defaultData));
    }
  }, []);

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
    }, 500);
  };

  const handleCheckInRequest = async (attendee) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
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
      setIsLoading(false);
      
      // Update search results
      setSearchResults(prev => 
        prev.map(a => a.id === attendee.id ? updatedAttendee : a)
      );
    }, 1000);
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
  if (!attendeesData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8B7DC3] via-[#B3FFD1] to-[#BFB4EE] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#533193] mx-auto mb-4"></div>
          <p className="text-white">กำลังโหลดข้อมูล...</p>
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
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ส่งคำขอเรียบร้อย!</h2>
            <p className="text-gray-600 mb-6">คำขอเช็คอินของคุณได้ถูกส่งแล้ว รอการยืนยันจากเจ้าหน้าที่</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold text-gray-900">{selectedAttendee.name}</p>
                  <p className="text-sm text-gray-600">{selectedAttendee.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <Building className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">{selectedAttendee.organization}</p>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">
                  เวลาส่งคำขอ: {new Date(selectedAttendee.checkInRequestTime).toLocaleString('th-TH')}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <p className="text-sm text-yellow-600 font-medium">
                  สถานะ: รอการยืนยันจากเจ้าหน้าที่
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-blue-900 mb-2">ขั้นตอนถัดไป:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• เจ้าหน้าที่จะตรวจสอบข้อมูลของคุณ</li>
                <li>• หากข้อมูลถูกต้อง จะได้รับการยืนยันเช็คอิน</li>
                <li>• คุณสามารถเข้าร่วมงานได้ทันที</li>
              </ul>
            </div>
            
            <Button 
              onClick={resetForm}
              className="w-full bg-[#533193] hover:bg-[#533193]/90 text-white py-3 rounded-xl"
            >
              ส่งคำขอสำหรับคนอื่น
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B7DC3] via-[#B3FFD1] to-[#BFB4EE]">
      {/* Main Content */}
      <div className="pt-[120px] pb-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">ค้นหาชื่อของคุณ</h2>
            <p className="text-gray-600 text-sm">กรอกชื่อ, อีเมล, เบอร์โทร หรือชื่อองค์กร</p>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="ค้นหาชื่อ, อีเมล, หรือองค์กร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg rounded-xl border-2 border-gray-200 focus:border-[#533193]"
            />
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#533193] mx-auto"></div>
              <p className="text-gray-600 mt-2">กำลังค้นหา...</p>
            </div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && !isLoading && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-3">พบ {searchResults.length} รายการ</p>
              {searchResults.map((attendee) => (
                <motion.div
                  key={attendee.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{attendee.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{attendee.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span>{attendee.organization}</span>
                        </div>
                        {attendee.projectTitle && (
                          <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded mt-2">
                            {attendee.projectTitle}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                          {getStatusIcon(attendee)}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(attendee)}`}>
                          {getStatusText(attendee)}
                        </span>
                        {attendee.checkInRequested && !attendee.checkedIn && (
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(attendee.checkInRequestTime).toLocaleTimeString('th-TH', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                        {attendee.checkedIn && (
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(attendee.checkInTime).toLocaleTimeString('th-TH', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                      
                      {!attendee.checkInRequested && !attendee.checkedIn && (
                        <Button
                          onClick={() => handleCheckInRequest(attendee)}
                          className="bg-[#533193] hover:bg-[#533193]/90 text-white px-4 py-2 rounded-xl mt-2 text-sm"
                          disabled={isLoading}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          ส่งคำขอ
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Results */}
          {searchTerm.length >= 2 && searchResults.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">ไม่พบข้อมูลที่ตรงกับการค้นหา</p>
              <p className="text-sm text-gray-500 mt-1">กรุณาตรวจสอบการสะกดหรือลองใช้คำค้นหาอื่น</p>
            </div>
          )}

          {/* Instructions */}
          {searchTerm.length === 0 && (
            <div className="text-center py-8">
              <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">ยินดีต้อนรับสู่ SACIT Symposium {year}</p>
              <p className="text-sm text-gray-500">กรุณากรอกชื่อหรือข้อมูลของคุณเพื่อส่งคำขอเช็คอิน</p>
              <div className="bg-blue-50 rounded-lg p-4 mt-4 text-left">
                <h3 className="font-semibold text-blue-900 mb-2">ขั้นตอนการเช็คอิน:</h3>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. ค้นหาชื่อของคุณในระบบ</li>
                  <li>2. กดปุ่ม "ส่งคำขอ" เพื่อส่งคำขอเช็คอิน</li>
                  <li>3. รอเจ้าหน้าที่ตรวจสอบและยืนยัน</li>
                  <li>4. เข้าร่วมงานได้ทันทีเมื่อได้รับการยืนยัน</li>
                </ol>
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/80 text-sm">
            หากมีปัญหาในการส่งคำขอ กรุณาติดต่อเจ้าหน้าที่
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckInPage; 