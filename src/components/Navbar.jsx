import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, User, Settings, LogOut, FileText, Award, HelpCircle, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import authService from '@/services/authService';
import logoWhite from '@/assets/logow.svg';
import symposiumText from '@/assets/symposiam.svg';

const Navbar = ({ 
  variant = 'default', // 'default', 'simple', 'transparent'
  showAuthButtons = true,
  showNavigation = true,
  showIcons = true,
  className = '',
  onFeatureClick = () => console.log("Feature not implemented yet.")
}) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close mobile menu when clicking outside
  const handleOutsideClick = (e) => {
    if (mobileMenuOpen && !e.target.closest('.mobile-menu-container')) {
      setMobileMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [mobileMenuOpen]);

  // Simple navbar - just colored bar
  if (variant === 'simple') {
    return <div className={`w-full h-20 bg-[#533193] shadow-md ${className}`} />;
  }

  // Transparent navbar - no background
  const bgClass = variant === 'transparent' 
    ? 'bg-transparent' 
    : 'bg-[#533193]';

  return (
    <>
      <style jsx global>{`
        body {
          overflow-x: hidden !important;
        }
        html {
          overflow-x: hidden !important;
        }
        
        /* Prevent layout shift when dropdown opens */
        .navbar-container {
          width: 100%;
          max-width: 100vw;
          overflow: hidden;
        }
        
        /* Ensure dropdown doesn't cause horizontal scroll */
        [data-radix-popper-content-wrapper] {
          max-width: 280px !important;
          right: 16px !important;
        }
      `}</style>
      <header className={`fixed top-0 left-0 right-0 z-50 ${bgClass} shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[100px] mobile-menu-container navbar-container ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] flex items-center justify-between h-full relative">
          {/* Logo */}
          <Link to="/" className="flex items-start py-4 flex-shrink-0">
            <div className="flex flex-col">
              <div className="flex items-center justify-end w-full">
                <img src={logoWhite} alt="SACIT" className="h-6 w-auto" />
              </div>
              <div className="flex items-center justify-start w-full">
                <img src={symposiumText} alt="Symposium" className="h-7 w-auto" />
              </div>
            </div>
          </Link>
          
          {/* Center Navigation - Desktop Only */}
          {showNavigation && (
            <div className="hidden md:flex items-center gap-8 flex-shrink-0">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 transition-all duration-300 text-sm font-custom-bold"
                onClick={onFeatureClick}
              >
                About Us
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 transition-all duration-300 text-sm font-custom-bold"
                onClick={onFeatureClick}
              >
                News/Update
              </Button>
            </div>
          )}
          
          {/* Center - Empty space when no navigation */}
          {!showNavigation && <div className="flex-1 min-w-0"></div>}
          
          {/* Right Side */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* User Info with Dropdown - when logged in */}
            {isLoggedIn && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:bg-white/10 rounded-lg px-3 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20">
                      <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden border-2 border-white/30 flex-shrink-0">
                        <img 
                          src={user?.avatar || 'https://i.pravatar.cc/100?u=' + user?.email} 
                          alt="avatar" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="text-white hidden sm:block">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm max-w-[120px] truncate">{user?.first_name} {user?.last_name}</span>
                          <ChevronDown className="w-3 h-3 text-white/70 flex-shrink-0" />
                        </div>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 z-[9999] bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden animate-in fade-in-0 zoom-in-95" 
                    sideOffset={12}
                    alignOffset={-8}
                    avoidCollisions={true}
                    collisionPadding={16}
                  >
                    {/* Menu Items */}
                    <div className="py-2">
                      <DropdownMenuItem 
                        onClick={() => navigate('/account')} 
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-purple-50 transition-all duration-200 mx-2 rounded-lg"
                      >
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-700 text-sm">โปรไฟล์</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => navigate('/certificates')} 
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-amber-50 transition-all duration-200 mx-2 rounded-lg"
                      >
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <Award className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="font-medium text-gray-700 text-sm">ใบประกาศนียบัตร</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => navigate('/submissions')} 
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50 transition-all duration-200 mx-2 rounded-lg"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-700 text-sm">การส่งผลงาน</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-green-50 transition-all duration-200 mx-2 rounded-lg"
                      >
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Settings className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-700 text-sm">การตั้งค่า</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-indigo-50 transition-all duration-200 mx-2 rounded-lg"
                      >
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="font-medium text-gray-700 text-sm">ช่วยเหลือ</span>
                      </DropdownMenuItem>
                    </div>
                    
                    {/* Divider */}
                    <div className="h-px bg-gray-200 mx-4 my-2"></div>
                    
                    {/* Logout */}
                    <div className="py-2">
                      <DropdownMenuItem 
                        onClick={handleLogout} 
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-red-50 transition-all duration-200 mx-2 rounded-lg text-red-600 hover:text-red-700"
                      >
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <LogOut className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="font-medium text-sm">ออกจากระบบ</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Divider */}
                <div className="w-px h-6 bg-white/20 hidden sm:block flex-shrink-0"></div>
              </>
            )}
            
            {/* Auth Buttons - when not logged in */}
            {!isLoggedIn && showAuthButtons && (
              <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="bg-transparent border border-[#B3FFD1] text-white hover:bg-white/5 transition-all duration-300 rounded-[30px] w-[140px] py-2.5 text-sm font-custom-bold shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                  >
                    LOGIN
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    className="bg-gradient-to-r from-[#B3FFD1] to-[#BFB4EE] text-[#533193] hover:opacity-90 transition-all duration-300 rounded-[100px] w-[140px] py-2.5 text-sm font-custom-bold shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                  >
                    REGISTER
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Divider - when showing auth buttons */}
            {!isLoggedIn && showAuthButtons && (
              <div className="hidden md:block w-px h-6 bg-white/20 flex-shrink-0"></div>
            )}
            
            {/* Icons */}
            {showIcons && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/10 transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0"
                  onClick={onFeatureClick}
                >
                  <Search className="w-6 h-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/10 transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center md:hidden flex-shrink-0"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && showNavigation && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-[#533193] shadow-lg border-t border-white/10 md:hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:bg-white/10 transition-all duration-300 justify-start font-custom"
                onClick={() => {
                  onFeatureClick();
                  setMobileMenuOpen(false);
                }}
              >
                About Us
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:bg-white/10 transition-all duration-300 justify-start font-custom"
                onClick={() => {
                  onFeatureClick();
                  setMobileMenuOpen(false);
                }}
              >
                News/Update
              </Button>
              
              {/* Mobile Auth Buttons - when not logged in */}
              {!isLoggedIn && showAuthButtons && (
                <div className="border-t border-white/20 pt-2 mt-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent border border-[#B3FFD1] text-white hover:bg-white/5 transition-all duration-300 rounded-[30px] py-2.5 text-sm font-custom-bold mb-2"
                    >
                      LOGIN
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#B3FFD1] to-[#BFB4EE] text-[#533193] hover:opacity-90 transition-all duration-300 rounded-[100px] py-2.5 text-sm font-custom-bold"
                    >
                      REGISTER
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
};

export default Navbar; 