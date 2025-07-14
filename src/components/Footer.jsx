import React from 'react';
import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';

const Footer = () => (
  <footer
    className="w-full pt-12 pb-4 text-[#533193]"
    style={{
      background: 'linear-gradient(120deg, #BFB4EE 0%, #B3FFD1 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-8">
        {/* Logo & Description */}
        <div className="flex-1 min-w-[220px]">
          <div className="flex items-center gap-3 mb-2">
            <img src={logoWhite} alt="SACIT" className="h-7 w-auto" />
            <img src={symposiumText} alt="Symposium" className="h-8 w-auto" />
          </div>
          <div className="font-semibold mb-1">สถาบันส่งเสริมศิลปหัตถกรรมไทย (องค์การมหาชน)</div>
          <div className="text-xs leading-snug opacity-80">
            THE SUSTAINABLE ARTS AND CRAFTS<br />
            INSTITUTE OF THAILAND (PUBLIC ORGANIZATION)
          </div>
        </div>
        {/* Register */}
        <div className="flex-1 min-w-[180px]">
          <div className="font-bold mb-2">ลงทะเบียน</div>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">SACIT Symposium</a></li>
            <li><a href="#" className="hover:underline">Agenda of SACIT Symposium 2025</a></li>
            <li><a href="#" className="hover:underline">ผู้บรรยาย</a></li>
          </ul>
        </div>
        {/* More Info */}
        <div className="flex-1 min-w-[180px]">
          <div className="font-bold mb-2">ข้อมูลเพิ่มเติม</div>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">สื่อและข่าวสาร</a></li>
            <li><a href="#" className="hover:underline">บรรยากาศภายในงาน</a></li>
            <li><a href="#" className="hover:underline">สำหรับเจ้าหน้าที่</a></li>
            <li><a href="#" className="hover:underline">เข้าสู่ระบบจัดการ</a></li>
          </ul>
        </div>
        {/* Newsletter */}
        <div className="flex-1 min-w-[220px]">
          <div className="font-bold mb-2 text-center md:text-left">Join us to know the news</div>
          <form className="flex gap-2 justify-center md:justify-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#533193] w-full max-w-[180px]"
            />
            <button type="submit" className="bg-[#533193] hover:bg-[#6B46C1] text-white px-4 py-2 rounded-md">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M2 12l19-7-7 19-2-8-8-2z" fill="currentColor"/></svg>
            </button>
          </form>
        </div>
      </div>
      <hr className="border-t border-[#533193]/20 my-4" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs opacity-80">
        <div>© {new Date().getFullYear()} SACIT Symposium. All rights reserved</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Terms of Services</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 