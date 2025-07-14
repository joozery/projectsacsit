import React from 'react';
import bgImg from '@/assets/Group107.jpg';
import sacsitImg from '@/assets/sacsit.jpg';

const About = () => (
  <div>
    {/* Hero Section */}
    <div
      className="w-full h-[340px] flex items-center justify-center relative pt-12"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <h1
        className="relative z-10"
        style={{
          fontFamily: 'AWConqueror Std Didot',
          fontWeight: 700,
          fontSize: '64px',
          lineHeight: '100%',
          color: '#fff',
          textAlign: 'center',
          width: '100%',
          margin: 0,
          padding: 0,
        }}
      >
        About Us
      </h1>
    </div>
    {/* ส่วนอื่น ๆ ของ About */}
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
          ประวัติความเป็นมา
        </span>
      </div>
    </div>
    <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-start gap-12">
      {/* เงาสีม่วง */}
      <div className="relative w-full max-w-[380px] aspect-square flex-shrink-0">
        <div
          className="absolute"
          style={{
            width: '100%',
            height: '100%',
            background: '#533193',
            borderRadius: '12px',
            top: '20px',
            left: '20px',
            zIndex: 0,
          }}
        />
        <img
          src={sacsitImg}
          alt="SACIT Craft Center"
          className="relative w-full h-full object-cover rounded-xl border-8 border-white z-10"
          style={{
            display: 'block',
            position: 'relative',
            zIndex: 1,
            background: '#fff',
          }}
        />
      </div>
      {/* เนื้อหาขวา */}
      <div className="flex-1 flex flex-col justify-start max-w-2xl">
        <h2
          className="mb-4"
          style={{
            color: '#533193',
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.2,
          }}
        >
          สถาบันส่งเสริมศิลปหัตถกรรมไทย<br />(องค์การมหาชน)
        </h2>
        <p className="text-gray-800 text-base md:text-lg mb-2" style={{ lineHeight: '1.8', fontFamily: 'Poppins' }}>
          พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช บรมนาถบพิตร ทรงลงพระปรมาภิไธยในพระราชบัญญัติว่าด้วย องค์ส่งเสริมศิลปหัตถกรรมไทย (องค์การมหาชน) พ.ศ. 2546 หรือ ศศท.เดิม...
        </p>
        <p className="text-gray-800 text-base md:text-lg" style={{ lineHeight: '1.8', fontFamily: 'Poppins' }}>
          (เนื้อหาต่อ...)
        </p>
      </div>
    </div>
  </div>
);

export default About; 