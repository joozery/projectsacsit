import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Shield, Settings, Eye } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Prompt, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">นโยบายคุกกี้</h1>
          </div>
          
          <p className="text-purple-100 text-lg">
            SACIT Symposium 2025 - ข้อมูลเกี่ยวกับการใช้คุกกี้บนเว็บไซต์
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-600" />
                คุกกี้คืออะไร
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                คุกกี้ (Cookies) คือไฟล์ข้อความขนาดเล็กที่เว็บไซต์จัดเก็บไว้ในอุปกรณ์ของคุณเมื่อคุณเข้าชมเว็บไซต์ 
                คุกกี้ช่วยให้เว็บไซต์จดจำการตั้งค่าและพฤติกรรมการใช้งานของคุณ 
                เพื่อปรับปรุงประสบการณ์การใช้งานให้ดียิ่งขึ้น
              </p>
            </section>

            {/* Types of Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <Settings className="w-6 h-6 text-purple-600" />
                ประเภทของคุกกี้ที่เราใช้
              </h2>
              
              <div className="grid gap-6">
                {/* Essential Cookies */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">
                    1. คุกกี้ที่จำเป็น (Essential Cookies)
                  </h3>
                  <p className="text-blue-700 mb-3">
                    คุกกี้เหล่านี้มีความจำเป็นสำหรับการทำงานของเว็บไซต์ และไม่สามารถปิดได้
                  </p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• การจัดการเซสชันผู้ใช้ (User Session)</li>
                    <li>• การรักษาความปลอดภัย</li>
                    <li>• การจดจำการตั้งค่าเว็บไซต์</li>
                  </ul>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    2. คุกกี้เพื่อการวิเคราะห์ (Analytics Cookies)
                  </h3>
                  <p className="text-green-700 mb-3">
                    ช่วยให้เราเข้าใจพฤติกรรมการใช้งานของผู้เข้าชม เพื่อปรับปรุงเว็บไซต์
                  </p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Google Analytics</li>
                    <li>• การนับจำนวนผู้เข้าชม</li>
                    <li>• การวิเคราะห์พฤติกรรมการใช้งาน</li>
                  </ul>
                </div>

                {/* Functional Cookies */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">
                    3. คุกกี้เพื่อการใช้งาน (Functional Cookies)
                  </h3>
                  <p className="text-purple-700 mb-3">
                    เพื่อจดจำการตั้งค่าและการเลือกของคุณ
                  </p>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• การจดจำข้อมูลการเข้าสู่ระบบ</li>
                    <li>• การตั้งค่าภาษา</li>
                    <li>• การจดจำความยินยอมคุกกี้</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-purple-600" />
                เราใช้คุกกี้เพื่ออะไร
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>• ปรับปรุงประสิทธิภาพและความเร็วของเว็บไซต์</p>
                <p>• จดจำการตั้งค่าและความชอบของคุณ</p>
                <p>• วิเคราะห์การใช้งานเพื่อพัฒนาเว็บไซต์</p>
                <p>• รักษาความปลอดภัยของเว็บไซต์</p>
                <p>• จัดเก็บข้อมูลการลงทะเบียนและการเข้าร่วมงาน</p>
              </div>
            </section>

            {/* Control Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">การจัดการคุกกี้</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <p className="text-amber-800 mb-4">
                  คุณสามารถควบคุมและจัดการคุกกี้ได้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ
                </p>
                <div className="space-y-2 text-amber-700 text-sm">
                  <p><strong>Chrome:</strong> Settings → Privacy and security → Cookies</p>
                  <p><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies</p>
                  <p><strong>Safari:</strong> Preferences → Privacy → Cookies</p>
                  <p><strong>Edge:</strong> Settings → Cookies and site permissions</p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">ติดต่อเรา</h2>
              <p className="text-gray-700 mb-4">
                หากคุณมีคำถามเกี่ยวกับนโยบายคุกกี้นี้ สามารถติดต่อเราได้ที่:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-gray-700">
                <p><strong>อีเมล:</strong> info@sacitsymposium.org</p>
                <p><strong>โทรศัพท์:</strong> 02-123-4567</p>
                <p><strong>ที่อยู่:</strong> สถาบันส่งเสริมศิลปหัตถกรรมไทย (องค์การมหาชน)</p>
              </div>
            </section>

            {/* Last Updated */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-500 text-sm">
                อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy; 