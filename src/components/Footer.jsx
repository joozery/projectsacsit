import React from 'react';
import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';

const Footer = () => (
  <footer
    className="w-full pt-12 pb-6 text-white font-['DBMomentX','Prompt','sans-serif']"
    style={{
      background: 'linear-gradient(180deg, #533192 0%, #31195C 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
        {/* Logo & Description */}
        <div className="col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logoWhite} alt="SACIT" className="h-12 w-auto" />
          </div>
          <div className="text-sm font-medium mb-2">สถาบันส่งเสริมศิลปหัตถกรรมไทย</div>
          <div className="text-sm opacity-80 mb-4">(องค์การมหาชน)</div>
        </div>

        {/* About us */}
        <div className="col-span-1">
          <div className="font-bold mb-4 text-white">About us</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline opacity-90">SACIT Symposium 2025</a></li>
          </ul>
          
          <div className="mt-6">
            <div className="font-bold mb-3 text-white">เนื้อหากิจกรรม</div>
            <ul className="space-y-1 text-xs opacity-90">
              <li>Main Exhibition: Lacquer Legacy</li>
              <li>Creative Works Exhibition (Collaborative Partners)</li>
              <li>Live Exhibition (Demonstrative Area)</li>
            </ul>
          </div>
        </div>

        {/* ข้อมูลเพิ่มเติม */}
        <div className="col-span-1">
          <div className="font-bold mb-4 text-white">ข้อมูลเพิ่มเติม</div>
          <ul className="space-y-2 text-sm opacity-90">
            <li><a href="#" className="hover:underline">ข่าวสาร</a></li>
            <li><a href="#" className="hover:underline">นิทรรศการ</a></li>
            <li><a href="#" className="hover:underline">หลองเสริมสร้าง</a></li>
            <li><a href="#" className="hover:underline">Proceeding</a></li>
            <li><a href="#" className="hover:underline">กำหนดการ</a></li>
            <li><a href="#" className="hover:underline">วิทยากร</a></li>
          </ul>
        </div>

        {/* Register */}
        <div className="col-span-1">
          <div className="font-bold mb-4 text-white">Register</div>
          <ul className="space-y-2 text-sm opacity-90">
            <li><a href="#" className="hover:underline">บรรยากาศภายในงาน</a></li>
            <li><a href="#" className="hover:underline">ภาพถ่ายในงาน</a></li>
            <li><a href="#" className="hover:underline">วิดีโอภายในงาน</a></li>
          </ul>

          <div className="mt-6">
            <div className="font-bold mb-3 text-white">ค้นหา</div>
            <div className="text-sm opacity-90">ค้นหา</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-white/20 my-6" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="opacity-90">
          SACIT Symposium. All rights reserved
        </div>
        <div className="flex gap-6 opacity-90">
          <a href="#" className="hover:underline">Terms of Services</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 