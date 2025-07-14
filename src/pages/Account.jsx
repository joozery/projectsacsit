import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import authService from '@/services/authService';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { User, Trophy, FileText, Settings, LogOut, Eye, EyeOff, Check, AlertCircle, Edit, Download } from 'lucide-react';

const menuItems = [
  { label: 'โปรไฟล์', icon: User },
  { label: 'ผลการตัดสิน', icon: Trophy },
  { label: 'ใบประกาศนียบัตร', icon: FileText },
  { label: 'การตั้งค่า', icon: Settings },
];

const Account = () => {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('การตั้งค่า');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Profile data state
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    educationLevel: '',
    prefix: ''
  });
  const [profileLoading, setProfileLoading] = useState(false);
  
  // Certificate data state
  const [certificateData, setCertificateData] = useState(null);
  const [certificateLoading, setCertificateLoading] = useState(false);
  
  // Results data state
  const [resultsData, setResultsData] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  
  // Submission history state
  const [submissionHistory, setSubmissionHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Add cache to prevent excessive API calls
  const [dataCache, setDataCache] = useState({
    profile: null,
    history: null,
    certificates: null,
    results: null,
    lastFetch: null
  });

  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

  const isCacheValid = (type) => {
    const cache = dataCache[type];
    const lastFetch = dataCache.lastFetch?.[type];
    return cache && lastFetch && (Date.now() - lastFetch) < CACHE_DURATION;
  };

  // Mock data for development when rate limited
  const mockProfileData = {
    firstName: 'Teeracha',
    lastName: 'Kavinkame', 
    email: 'teeracha@gmail.com',
    phone: '099-999-9999',
    organization: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี',
    educationLevel: 'ปริญญาตรี / Bachelor Degrees',
    prefix: 'นาย',
    department: 'คณะวิทยาศาสตร์'
  };

  const mockHistoryData = [
    { id: 1, date: '1/07/68', description: 'ส่งใบเสนอผลงานวิจัย', status: 'approved' },
    { id: 2, date: '6/07/68', description: 'เข้าร่วมงาน', status: 'pending' }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Load initial data based on active menu
      loadPageData();
    }
  }, [user, navigate, activeMenu]);

  const loadPageData = async () => {
    // Only load data once per session to avoid rate limiting
    const sessionKey = `data_loaded_${activeMenu}`;
    if (sessionStorage.getItem(sessionKey)) {
      console.log(`📋 Using cached data for ${activeMenu}`);
      return;
    }

    switch (activeMenu) {
      case 'โปรไฟล์':
        await fetchProfileData();
        await fetchSubmissionHistory();
        break;
      case 'ใบประกาศนียบัตร':
        await fetchCertificateData();
        break;
      case 'ผลการตัดสิน':
        await fetchResultsData();
        break;
      default:
        break;
    }

    // Mark as loaded for this session
    sessionStorage.setItem(sessionKey, 'true');
  };

  // API Functions using axios
  const fetchProfileData = async () => {
    setProfileLoading(true);
    setError('');
    try {
      console.log('🔍 Fetching profile data...');
      
      const response = await api.get('/users/profile');
      console.log('✅ Profile data received:', response.data);
      
      if (response.data.success) {
        setProfileData(response.data.data);
      } else {
        setError(`API Error: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error fetching profile:', error);
      if (error.response?.status === 429) {
        setError('⚠️ Too many requests - please try again later');
      } else {
        setError(`API Error: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchSubmissionHistory = async () => {
    setHistoryLoading(true);
    try {
      console.log('🔍 Fetching submission history...');
      
      const response = await api.get('/users/submissions/history');
      console.log('✅ History data received:', response.data);
      
      if (response.data.success) {
        setSubmissionHistory(response.data.data);
      }
    } catch (error) {
      console.error('❌ Error fetching submission history:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchCertificateData = async () => {
    setCertificateLoading(true);
    try {
      console.log('🔍 Fetching certificate data...');
      
      const response = await api.get('/users/certificates');
      console.log('✅ Certificate data received:', response.data);
      
      if (response.data.success) {
        setCertificateData(response.data.data);
      }
    } catch (error) {
      console.error('❌ Error fetching certificate:', error);
    } finally {
      setCertificateLoading(false);
    }
  };

  const fetchResultsData = async () => {
    setResultsLoading(true);
    try {
      console.log('🔍 Fetching results data...');
      
      const response = await api.get('/users/results');
      console.log('✅ Results data received:', response.data);
      
      if (response.data.success) {
        setResultsData(response.data.data);
      }
    } catch (error) {
      console.error('❌ Error fetching results:', error);
    } finally {
      setResultsLoading(false);
    }
  };

  const downloadCertificate = async () => {
    try {
      console.log('📥 Starting certificate download...');
      
      const response = await api.get('/users/certificates/download', {
        responseType: 'blob'
      });
      
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${user.email}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      console.log('✅ Certificate downloaded successfully');
    } catch (error) {
      console.error('❌ Error downloading certificate:', error);
      setError(`Download failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบ');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('รหัสผ่านใหม่ไม่ตรงกัน');
      return;
    }
    setLoading(true);
    try {
      const result = await authService.changePassword({ currentPassword, newPassword });
      if (result.success) {
        setSuccess('เปลี่ยนรหัสผ่านสำเร็จ');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(result.message || 'เกิดข้อผิดพลาด');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa]">
      {/* My account header with gradient */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-[100px] pb-16"
        style={{
          background: 'linear-gradient(135deg, #B3FFD1 0%, #BFB4EE 100%)'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center pt-8"
        >
          <h1 className="text-4xl font-bold text-[#533193]">My account</h1>
        </motion.div>
      </motion.div>
      
      {/* Main content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-5xl mx-auto px-4 -mt-8 relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg flex overflow-hidden border border-blue-200 min-h-[600px]"
        >
          {/* เมนูซ้าย */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-64 border-r border-blue-200 p-6 bg-white"
          >
            <ul className="space-y-3">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                        activeMenu === item.label
                            ? 'bg-[#8B7DC3] text-white font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#533193]'
                      }`}
                      onClick={() => setActiveMenu(item.label)}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </motion.div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* เนื้อหาขวา */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex-1 p-8 overflow-y-auto flex flex-col"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeMenu === 'การตั้งค่า' && (
                  <>
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                      <Settings className="w-6 h-6 text-[#533193]" />
                      <h2 className="text-2xl font-semibold text-[#533193]">การตั้งค่า</h2>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="mb-8"
                    >
                      <h3 className="text-lg font-semibold mb-6 text-gray-800">เปลี่ยนรหัสผ่าน</h3>
                      <form className="max-w-lg space-y-5" onSubmit={handleChangePassword}>
                        
                        {/* Current Password */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <label className="block text-sm font-medium mb-2 text-gray-700">รหัสผ่านปัจจุบัน</label>
                          <div className="relative">
                            <Input
                              type={showPasswords.current ? "text" : "password"}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
                              value={currentPassword}
                              onChange={e => setCurrentPassword(e.target.value)}
                              placeholder="••••••••••••"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                            >
                              {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </motion.button>
                          </div>
                        </motion.div>

                        {/* New Password */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >
                          <label className="block text-sm font-medium mb-2 text-gray-700">รหัสผ่านใหม่</label>
                          <div className="relative">
                            <Input
                              type={showPasswords.new ? "text" : "password"}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
                              value={newPassword}
                              onChange={e => setNewPassword(e.target.value)}
                              placeholder="••••••••••••"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                            >
                              {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </motion.button>
                          </div>
                        </motion.div>

                        {/* Confirm Password */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                        >
                          <label className="block text-sm font-medium mb-2 text-gray-700">ยืนยันรหัสผ่านใหม่</label>
                          <div className="relative">
                            <Input
                              type={showPasswords.confirm ? "text" : "password"}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
                              value={confirmPassword}
                              onChange={e => setConfirmPassword(e.target.value)}
                              placeholder="••••••••••••"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                            >
                              {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </motion.button>
                          </div>
                        </motion.div>

                        {/* Error/Success Messages */}
                        <AnimatePresence>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {error}
                            </motion.div>
                          )}
                          {success && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg border border-green-200"
                            >
                              <Check className="w-4 h-4" />
                              {success}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 }}
                          className="flex justify-end pt-4"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="bg-[#BFB4EE] text-[#533193] px-8 py-2.5 rounded-lg font-medium hover:bg-[#B3A7E8] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                          >
                            {loading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-[#533193] border-t-transparent rounded-full animate-spin"></div>
                                บันทึก
                              </div>
                            ) : (
                              'บันทึก'
                            )}
                          </motion.button>
                        </motion.div>
                      </form>
                    </motion.div>

                    {/* Logout Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="border-t pt-6"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-[#533193] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#533193]/90 transition-all shadow-sm"
                      >
                        <LogOut className="w-5 h-5" />
                        ออกบัญชี
                      </motion.button>
                    </motion.div>
                  </>
                )}

                {activeMenu === 'ใบประกาศนียบัตร' && (
                  <>
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                      <FileText className="w-6 h-6 text-[#533193]" />
                      <h2 className="text-2xl font-semibold text-[#533193]">ใบประกาศนียบัตร</h2>
                    </div>

                    {certificateLoading ? (
                      <div className="text-center py-16">
                        <div className="w-8 h-8 border-2 border-[#533193] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-gray-500 mt-2">กำลังโหลดใบประกาศนียบัตร...</p>
                      </div>
                    ) : certificateData ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="max-w-md"
                      >
                        {/* Certificate Preview */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="bg-gray-200 rounded-lg p-8 mb-6 aspect-[4/3] flex flex-col items-center justify-center relative"
                        >
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#533193] to-[#8B7DC3] rounded-full flex items-center justify-center mb-4 mx-auto">
                              <FileText className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">ใบประกาศนียบัตรผู้เข้าร่วมงาน</h3>
                            <p className="text-sm text-gray-600">SACIT Symposium 2025</p>
                            {certificateData.registrationNumber && (
                              <p className="text-xs text-gray-500 mt-1">เลขที่: {certificateData.registrationNumber}</p>
                            )}
                          </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                          className="flex gap-3"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={downloadCertificate}
                            className="flex items-center gap-2 bg-[#BFB4EE] text-[#533193] px-4 py-2.5 rounded-lg font-medium hover:bg-[#B3A7E8] transition-all shadow-sm"
                          >
                            <Download className="w-4 h-4" />
                            ดาวน์โหลด pdf
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 bg-[#8B7DC3] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#7B6DB8] transition-all shadow-sm"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-center py-16"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                          <FileText className="w-12 h-12 text-gray-400" />
                        </motion.div>
                        
                        <motion.h3 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                          className="text-xl font-semibold text-gray-800 mb-2"
                        >
                          ยังไม่มีใบประกาศนียบัตร
                        </motion.h3>
                        
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 }}
                          className="text-gray-600"
                        >
                          ใบประกาศนียบัตรจะพร้อมใช้งานหลังจากเข้าร่วมงานเสร็จสิ้น
                        </motion.p>
                      </motion.div>
                    )}
                  </>
                )}

                {activeMenu === 'โปรไฟล์' && (
                  <>
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                      <User className="w-6 h-6 text-[#533193]" />
                      <h2 className="text-2xl font-semibold text-[#533193]">โปรไฟล์</h2>
                    </div>
                    
                    {/* Profile Header */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="flex items-center gap-4 mb-8 bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800">Teeracha Kavinkame</h3>
                        <p className="text-gray-600">teeracha@gmail.com</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                    </motion.div>

                    {/* Personal Information */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="bg-white rounded-lg p-6 border border-gray-200 mb-6"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-semibold text-gray-800">ข้อมูลส่วนตัว</h4>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                      </div>
                      
                      {profileLoading ? (
                        <div className="text-center py-8">
                          <div className="w-8 h-8 border-2 border-[#533193] border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-gray-500 mt-2">กำลังโหลดข้อมูล...</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Show API errors */}
                          {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                              <p className="text-red-600 text-sm">{error}</p>
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <label className="text-sm text-gray-500 block mb-1">คำนำหน้า / Prefix</label>
                              <p className="text-gray-800 font-medium">{profileData.prefix || 'นาย'}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-500 block mb-1">นามสกุล / Last Name</label>
                              <p className="text-gray-800 font-medium">{profileData.lastName || 'กวินกานต์ / Kavinkame'}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <label className="text-sm text-gray-500 block mb-1">ชื่อ / First Name</label>
                              <p className="text-gray-800 font-medium">{profileData.firstName || 'รีรา / Teeracha'}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-500 block mb-1">เบอร์โทรศัพท์</label>
                              <p className="text-gray-800 font-medium">{profileData.phone || '099-999-9999'}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <label className="text-sm text-gray-500 block mb-1">ชื่อหน่วยงาน/องค์กร</label>
                              <p className="text-gray-800 font-medium">{profileData.organization || 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี'}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-500 block mb-1">หน่วยงาน</label>
                              <p className="text-gray-800 font-medium">{profileData.department || 'คณะวิทยาศาสตร์'}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <label className="text-sm text-gray-500 block mb-1">อีเมล / Email</label>
                              <p className="text-gray-800 font-medium">{profileData.email || user?.email || 'teeracha@gmail.com'}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-500 block mb-1">ระดับการศึกษา / Education Level</label>
                              <p className="text-gray-800 font-medium">{profileData.educationLevel || 'ปริญญาตรี / Bachelor Degrees'}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {/* Research History */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="bg-white rounded-lg p-6 border border-gray-200"
                    >
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">ประวัติการส่ง</h4>
                      
                      {historyLoading ? (
                        <div className="text-center py-8">
                          <div className="w-8 h-8 border-2 border-[#533193] border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-gray-500 mt-2">กำลังโหลดประวัติ...</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-3 text-sm text-gray-500 font-medium">ลำดับ</th>
                                <th className="text-left py-3 text-sm text-gray-500 font-medium">วัน เดือน ปี</th>
                                <th className="text-left py-3 text-sm text-gray-500 font-medium">รายการ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {submissionHistory.length > 0 ? (
                                submissionHistory.map((item, index) => (
                                  <tr key={index} className="border-b border-gray-100">
                                    <td className="py-3 text-gray-800">{index + 1}</td>
                                    <td className="py-3 text-gray-800">{item.date}</td>
                                    <td className="py-3 text-gray-800">{item.description}</td>
                                  </tr>
                                ))
                              ) : (
                                <>
                                  <tr className="border-b border-gray-100">
                                    <td className="py-3 text-gray-800">1</td>
                                    <td className="py-3 text-gray-800">1/07/68</td>
                                    <td className="py-3 text-gray-800">ส่งใบ น้ำเสนอผลงานวิจัย</td>
                                  </tr>
                                  <tr className="border-b border-gray-100">
                                    <td className="py-3 text-gray-800">2</td>
                                    <td className="py-3 text-gray-800">6/07/68</td>
                                    <td className="py-3 text-gray-800">เข้าร่วมงาน</td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}

                {activeMenu === 'ผลการตัดสิน' && (
                  <>
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                      <Trophy className="w-6 h-6 text-[#533193]" />
                      <h2 className="text-2xl font-semibold text-[#533193]">ผลการตัดสิน</h2>
                    </div>
                    
                    {resultsLoading ? (
                      <div className="text-center py-16">
                        <div className="w-8 h-8 border-2 border-[#533193] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-gray-500 mt-2">กำลังโหลดผลการตัดสิน...</p>
                      </div>
                    ) : resultsData.length > 0 ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="space-y-4"
                      >
                        {resultsData.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                            className="bg-white rounded-lg p-6 border border-gray-200"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                result.status === 'approved' 
                                  ? 'bg-green-100 text-green-600' 
                                  : result.status === 'rejected'
                                  ? 'bg-red-100 text-red-600'
                                  : 'bg-yellow-100 text-yellow-600'
                              }`}>
                                <Trophy className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{result.title}</h3>
                                <p className="text-gray-600 text-sm">{result.category}</p>
                                <p className={`text-sm font-medium ${
                                  result.status === 'approved' 
                                    ? 'text-green-600' 
                                    : result.status === 'rejected'
                                    ? 'text-red-600'
                                    : 'text-yellow-600'
                                }`}>
                                  สถานะ: {result.statusText}
                                </p>
                              </div>
                              {result.score && (
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-[#533193]">{result.score}</p>
                                  <p className="text-sm text-gray-500">คะแนน</p>
                                </div>
                              )}
                            </div>
                            {result.feedback && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-700">{result.feedback}</p>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-center py-16"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                          <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                        
                        <motion.h3 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                          className="text-xl font-semibold text-gray-800 mb-2"
                        >
                          ผลงานของคุณกำลังดำเนินการตัดสิน
                        </motion.h3>
                        
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 }}
                          className="text-gray-600"
                        >
                          ติดตามผลการตัดสินของงาน เร็วๆนี้
                        </motion.p>
                      </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Account; 