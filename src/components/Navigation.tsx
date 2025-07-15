import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors"
            >
              TripCraft
            </button>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-teal-600 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('packages')}
                className="text-gray-700 hover:text-teal-600 transition-colors"
              >
                Packages
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-teal-600 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-teal-600 transition-colors"
              >
                Contact
              </button>
              
              {/* Authentication Buttons */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleProfileClick}
                    className="flex items-center text-gray-700 hover:text-teal-600 transition-colors"
                  >
                    <User className="w-4 h-4 mr-1" />
                    {user?.name || 'Profile'}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Login
                </button>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-teal-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <button 
              onClick={() => scrollToSection('home')}
              className="block px-3 py-2 text-gray-700 hover:text-teal-600 w-full text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('packages')}
              className="block px-3 py-2 text-gray-700 hover:text-teal-600 w-full text-left"
            >
              Packages
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block px-3 py-2 text-gray-700 hover:text-teal-600 w-full text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block px-3 py-2 text-gray-700 hover:text-teal-600 w-full text-left"
            >
              Contact
            </button>
            
            {/* Mobile Authentication */}
            <div className="border-t border-gray-200 pt-2">
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={handleProfileClick}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-teal-600 w-full text-left"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user?.name || 'Profile'}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600 w-full text-left"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-lg mx-3 hover:bg-teal-700 transition-colors"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;