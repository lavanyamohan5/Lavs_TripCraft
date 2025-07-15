import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

const AboutFounder: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet the Creator</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the passionate founder behind your next adventure
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Hi, I'm Lavanya Mohan</h3>
                <p className="text-teal-600 font-medium">Founder & Creator of TripCraft</p>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                I created TripCraft to make your travel planning easier and joyful. Having traveled to over 30 countries, 
                I understand the challenges of planning the perfect trip. TripCraft combines my love for travel with technology 
                to help you discover amazing destinations effortlessly.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our mission is to transform how people plan their travels - making it more personalized, efficient, and enjoyable. 
                Every feature is designed with real travelers in mind, because great journeys start with great planning.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-3">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="relative h-64 lg:h-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-blue-500/20" />
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop')"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;