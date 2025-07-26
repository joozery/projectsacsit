import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Agenda = () => {
  const [activeTab, setActiveTab] = useState('day1');
  return (
    <div className="min-h-screen bg-white relative">
      {/* Top Gradient Border */}
      <div 
        className="h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, #BFB4EE 0%, #B3FFD1 100%)'
        }}
      ></div>

      {/* Header Banner - Full Width */}
      <div className="relative overflow-hidden mt-20" style={{
        background: 'linear-gradient(90deg, #BFB4EE 32.07%, #B3FFD1 100%)',
        minHeight: '180px',
        padding: '2.5rem 1.5rem'
      }}>
        {/* Decorative Shapes */}
        <div className="absolute top-4 left-4 w-24 h-24 bg-gradient-to-br from-green-300 to-green-400 rounded-xl opacity-70 transform rotate-0 shadow-lg animate-bounce" style={{ animationDuration: '2s' }}></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-white to-gray-100 rounded-lg opacity-90 transform rotate-0 shadow-md animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }}></div>
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-white to-gray-100 rounded-lg opacity-90 transform rotate-0 shadow-md animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-4 right-4 w-28 h-28 bg-gradient-to-br from-purple-300 to-purple-400 rounded-xl opacity-70 transform rotate-0 shadow-lg animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}></div>
        
        {/* Additional Professional Elements */}
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-yellow-300 rounded-full opacity-60 animate-bounce" style={{ animationDuration: '1.2s' }}></div>
        <div className="absolute top-1/3 right-12 w-6 h-6 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '1.6s', animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-1/3 left-16 w-5 h-5 bg-pink-300 rounded-full opacity-40 animate-bounce" style={{ animationDuration: '1.4s', animationDelay: '1.2s' }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-300 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '0.2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-teal-300 rounded-full opacity-40 animate-bounce" style={{ animationDuration: '1.3s', animationDelay: '0.7s' }}></div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="mb-3" style={{
            textAlign: 'center',
            fontFamily: 'AWConqueror Std Didot',
            fontSize: '40px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            background: 'linear-gradient(90deg, #533193 0%, #BFB4EE 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Agenda of SACIT Symposium 2025
          </h1>
          <h2 className="mb-3" style={{
            width: '911px',
            height: '40px',
            flexShrink: 0,
            color: '#533192',
            textAlign: 'center',
            fontFamily: 'AWConqueror Std Didot',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal'
          }}>
            SACIT Symposium 2025: Crafting Sustainability across ASEAN and Beyond
          </h2>
          <div className="mb-3 inline-block rounded-lg" style={{
            width: '900px',
            height: '36px',
            flexShrink: 0,
            background: 'linear-gradient(90deg, #533193 0%, #BFB4EE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'AWConqueror Std Didot',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal'
            }}>
              August 7 – 8, 2025
            </span>
          </div>
          <p className="mb-2" style={{
            color: '#000',
            textAlign: 'center',
            fontFamily: 'AWConqueror Std Didot',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: 'normal'
          }}>
            At the Sustainable Arts and Crafts Institute of Thailand (SACIT)
          </p>
          <p className="mb-3" style={{
            color: '#000',
            textAlign: 'center',
            fontFamily: 'AWConqueror Std Didot',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: 'normal'
          }}>
            Bang Sai District, Phra Nakhon Si Ayutthaya Province, Thailand
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex mb-0">
              <button 
                className={`flex-1 py-4 px-6 text-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                  activeTab === 'day1' 
                    ? 'bg-purple-200 text-purple-800' 
                    : 'bg-white text-gray-400'
                }`}
                onClick={() => setActiveTab('day1')}
              >
                <span className="mr-2">◆</span>
                Day 1
              </button>
              <button 
                className={`flex-1 py-4 px-6 text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'day2' 
                    ? 'bg-purple-200 text-purple-800' 
                    : 'bg-white text-gray-400'
                }`}
                onClick={() => setActiveTab('day2')}
              >
                Day 2
              </button>
            </div>

            {/* Gradient Header Bar */}
            <div className="flex items-center px-6 w-full" style={{
              height: '60px',
              flexShrink: 0,
              background: 'linear-gradient(90deg, #533192 0%, #BFB4EE 50%, #B3FFD1 100%)'
            }}>
              <h3 className="text-2xl font-bold text-white">
                {activeTab === 'day1' ? 'Day 1 August 7, 2025' : 'Day 2 August 8, 2025'}
              </h3>
            </div>

            {/* Day 1 Content */}
            {activeTab === 'day1' && (
              <div className="p-8" style={{ background: 'linear-gradient(180deg, #533192 0%, #31195C 100%)' }}>
                
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white"></div>
                  
                  {/* Event 1 */}
                  <div className="flex items-start mb-8 relative">
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-6 z-10 border-2 border-purple-800">
                      <span className="text-purple-800 font-bold text-lg">1</span>
                    </div>
                    <div className="flex-1 bg-purple-200 text-purple-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg">Opening Registration & Welcome Coffee</h4>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="flex items-start mb-8 relative">
                    <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center mr-6 z-10 border-2 border-green-800">
                      <span className="text-green-800 font-bold text-lg">2</span>
                    </div>
                    <div className="flex-1 bg-green-300 text-green-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-2">Keynote Speech : Dr. Feng Jing (UNESCO)</h4>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-400 rounded-full mr-4"></div>
                        <div>
                          <p className="text-sm">Craft as Cultural Infrastructure: Crafting Sustainability in the ASEAN Context</p>
                          <p className="text-xs text-green-600">(Speech 20 Mins)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="flex items-start mb-8 relative">
                    <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center mr-6 z-10 border-2 border-green-800">
                      <span className="text-green-800 font-bold text-lg">3</span>
                    </div>
                    <div className="flex-1 bg-green-300 text-green-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-2">Presentation of the 2025 Honorary Awards for Thai Artisans</h4>
                      <p className="text-sm mb-2">Recognizing master artisans selected by the Sustainable Arts and Crafts Institute of Thailand (SACIT) as:</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>- The Master Artisans of Thailand</li>
                        <li>- The Master Craftsmen</li>
                        <li>- The Craftsmen Descendants</li>
                      </ul>
                    </div>
                  </div>

                  {/* Event 4 */}
                  <div className="flex items-start mb-8 relative">
                    <div className="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center mr-6 z-10 border-2 border-orange-800">
                      <span className="text-orange-800 font-bold text-lg">4</span>
                    </div>
                    <div className="flex-1 bg-orange-300 text-orange-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-2">Plenary lecture</h4>
                      <p className="text-sm mb-2">"Crafting Sustainability: Institutional Visions and Regional Practices"</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>- Thailand: The Sustainable Arts and Crafts Institute of Thailand (Public Organization): SACIT</li>
                        <li>- Thailand: Aracha Boon-Long NGOs in Thai Arts and Crafts</li>
                        <li>- Singapore: National Heritage Board (NHB)</li>
                        <li>- Malaysian: Sukaseni non-profit organization in Malaysia</li>
                      </ul>
                    </div>
                  </div>

                  {/* Event 5 */}
                  <div className="flex items-start mb-8 relative">
                    <div className="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center mr-6 z-10 border-2 border-orange-800">
                      <span className="text-orange-800 font-bold text-lg">5</span>
                    </div>
                    <div className="flex-1 bg-orange-300 text-orange-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-2">Special Lecture from Ms.Witchada Sitakalin, Creative Director at Jim Thompson</h4>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-400 rounded-full mr-4"></div>
                        <div>
                          <p className="text-sm">"Designing and Curating Craft: Creation and Cultural Intention in the Making of Sustainable Luxury"</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event 6 */}
                  <div className="flex items-start mb-8 relative">
                    <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center mr-6 z-10 border-2 border-green-800">
                      <span className="text-green-800 font-bold text-lg">6</span>
                    </div>
                    <div className="flex-1 bg-green-300 text-green-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-2">Special Lecture from Mr. Gaspard R.Pleansuk (Rush Pleansuk), Cultural Curator and the Founder of Sumphat Gallery</h4>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-400 rounded-full mr-4"></div>
                        <div>
                          <p className="text-sm">"Conversations Between Craft and Art, the Role of Craft as a Living Encyclopaedia"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Day 2 Content */}
            {activeTab === 'day2' && (
              <div className="bg-white rounded-b-lg p-8">
                
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white border-l-2 border-dashed border-white"></div>
                  
                  {/* Event 1 */}
                  <div className="flex items-start mb-8 relative">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-6 z-10">
                      <span className="text-purple-800 font-bold text-lg">1</span>
                    </div>
                    <div className="flex-1 bg-purple-800 text-white p-4 rounded-lg">
                      <h4 className="font-semibold text-lg">Research Presentations</h4>
                      <p className="text-sm">Academic papers and research findings</p>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="flex items-start mb-8 relative">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-6 z-10">
                      <span className="text-purple-800 font-bold text-lg">2</span>
                    </div>
                    <div className="flex-1 bg-purple-800 text-white p-4 rounded-lg">
                      <h4 className="font-semibold text-lg">Industry Panel</h4>
                      <p className="text-sm">Craft Industry Development and Innovation</p>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="flex items-start mb-8 relative">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-6 z-10">
                      <span className="text-purple-800 font-bold text-lg">3</span>
                    </div>
                    <div className="flex-1 bg-purple-800 text-white p-4 rounded-lg">
                      <h4 className="font-semibold text-lg">Lunch & Networking</h4>
                      <p className="text-sm">Collaboration opportunities</p>
                    </div>
                  </div>

                  {/* Event 4 */}
                  <div className="flex items-start mb-8 relative">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-6 z-10">
                      <span className="text-purple-800 font-bold text-lg">4</span>
                    </div>
                    <div className="flex-1 bg-purple-800 text-white p-4 rounded-lg">
                      <h4 className="font-semibold text-lg">Future of Crafts</h4>
                      <p className="text-sm">Sustainability and innovation in craft industry</p>
                    </div>
                  </div>

                  {/* Event 5 */}
                  <div className="flex items-start mb-8 relative">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-6 z-10">
                      <span className="text-purple-800 font-bold text-lg">5</span>
                    </div>
                    <div className="flex-1 bg-purple-800 text-white p-4 rounded-lg">
                      <h4 className="font-semibold text-lg">Closing Ceremony</h4>
                      <p className="text-sm">Summary and future directions</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Back to Home Button */}
            <div className="text-center mt-12">
              <Link 
                to="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-full hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Gradient Border */}
      <div 
        className="h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, #BFB4EE 0%, #B3FFD1 100%)'
        }}
      ></div>
    </div>
  );
};

export default Agenda;