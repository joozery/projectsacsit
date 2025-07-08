import React, { useState, useEffect } from 'react';

import authService from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { User, Trophy, FileText, Settings } from 'lucide-react';

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

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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
      <div 
        className="pt-[100px] pb-16"
        style={{
          background: 'linear-gradient(135deg, #B3FFD1 0%, #BFB4EE 100%)'
        }}
      >
        <div className="text-center pt-8">
          <h1 className="text-4xl font-bold text-[#533193]">My account</h1>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg flex overflow-hidden">
          {/* เมนูซ้าย */}
          <div className="w-64 border-r p-6 bg-[#faf7ff]">
            <ul className="space-y-4">
              {menuItems.map(item => {
                const IconComponent = item.icon;
                return (
                  <li
                    key={item.label}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${activeMenu === item.label ? 'bg-white border-l-4 border-[#b3ffd1] text-[#533193] font-bold' : 'text-gray-500 hover:bg-gray-100'}`}
                    onClick={() => setActiveMenu(item.label)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* เนื้อหาขวา */}
          <div className="flex-1 p-10">
            <h2 className="text-2xl font-bold text-[#533193] mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6" />
              การตั้งค่า
            </h2>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">เปลี่ยนรหัสผ่าน</h3>
              <form className="max-w-md space-y-6" onSubmit={handleChangePassword}>
                <div>
                  <label className="block text-sm font-medium mb-1">รหัสผ่านปัจจุบัน</label>
                  <Input
                    type="password"
                    className="w-full border rounded-lg px-4 py-2"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">รหัสผ่านใหม่</label>
                  <Input
                    type="password"
                    className="w-full border rounded-lg px-4 py-2"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ยืนยันรหัสผ่านใหม่</label>
                  <Input
                    type="password"
                    className="w-full border rounded-lg px-4 py-2"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}
                <Button type="submit" disabled={loading} className="bg-gradient-to-r from-[#b3ffd1] to-[#bfb4ee] text-[#533193] px-8 py-2 rounded-lg mt-2">
                  {loading ? 'กำลังบันทึก...' : 'บันทึก'}
                </Button>
              </form>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleLogout} className="bg-[#533193] text-white px-8 py-2 rounded-lg">ออกบัญชี</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account; 