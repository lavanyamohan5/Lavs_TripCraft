import React from 'react';
import { Star, Shield, DollarSign, Headphones } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Star,
      title: 'Curated Itineraries',
      description: 'Handpicked destinations and experiences tailored to your preferences and budget'
    },
    {
      icon: Shield,
      title: 'Trusted Partners',
      description: 'Reliable hotels, transport, and local guides verified by our quality standards'
    },
    {
      icon: DollarSign,
      title: 'Budget-Friendly Plans',
      description: 'Competitive prices with transparent billing and no hidden fees'
    },
    {
      icon: Headphones,
      title: '24/7 Travel Support',
      description: 'Round-the-clock assistance before, during, and after your trip'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose TripCraft?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make travel planning effortless with our comprehensive features and dedicated support
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="text-center bg-gray-50 p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;