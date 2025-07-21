import bannerImg from '../../../assets/bander.jpg';

const BannerSection = () => {
  return (
    <div className="w-full flex justify-center bg-[#fff] py-12">
      <div
        className="w-[1174px] h-[272px] relative  overflow-hidden shadow-lg"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(0, 0, 0, 0.00) 0%, #BFB4EE 100%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)),
            url(${bannerImg})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Content */}
        <div className="absolute inset-0 flex items-end justify-end p-6">
          <div className="text-right text-white">
            <p
              className="mb-1 text-sm opacity-90"
              style={{ fontFamily: 'Prompt, sans-serif' }}
            >
              เตรียมพบกับ SACIT Symposium 2025
            </p>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: 'Prompt, sans-serif' }}
            >
              ระหว่างวันที่ 7 – 8 สิงหาคม 2568
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
