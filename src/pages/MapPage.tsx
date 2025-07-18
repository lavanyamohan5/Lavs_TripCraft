import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';

const MapPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-teal-600 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to TripCraft
          </button>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-8">
            <MapPin className="w-24 h-24 text-teal-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Interactive Map Coming Soon
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're working on an amazing interactive map feature that will help you explore destinations, 
              plan routes, and discover new places. Stay tuned for this exciting update!
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What's Coming</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Interactive destination map</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Route planning</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Location search</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Nearby attractions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Travel recommendations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Real-time updates</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={() => navigate('/')}
              className="bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
            >
              Explore Packages Instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;