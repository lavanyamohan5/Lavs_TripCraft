import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Star, Calendar, Users, Camera, Phone, Mail, User, CalendarDays } from 'lucide-react';

interface DestinationData {
  name: string;
  country: string;
  duration: string;
  image: string;
  description: string;
  highlights: string[];
  priceRange: string;
  priceMin: number;
  priceMax: number;
  bestTime: string;
  idealFor: string;
  activities: string[];
  themes: string[];
  rating: number;
  reviews: number;
}

interface BookingFormData {
  name: string;
  email: string;
  startDate: string;
  endDate: string;
}

const DestinationDetail: React.FC = () => {
  const { destinationId } = useParams<{ destinationId: string }>();
  const navigate = useNavigate();
  
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    name: '',
    email: '',
    startDate: '',
    endDate: ''
  });

  const destinationData: Record<string, DestinationData> = {
    'ooty': {
      name: 'Ooty Hill Station',
      country: 'Tamil Nadu, India',
      duration: '2-3 Days',
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      description: 'Nestled in the Nilgiri Hills, Ooty is a charming hill station known for its pleasant climate, tea gardens, and colonial architecture. Often called the "Queen of Hill Stations," it offers a perfect escape from the heat with its misty mountains and scenic beauty.',
      highlights: ['Botanical Gardens', 'Ooty Lake', 'Nilgiri Mountain Railway', 'Tea Gardens', 'Doddabetta Peak'],
      priceRange: '₹8,000 - ₹15,000',
      priceMin: 8000,
      priceMax: 15000,
      bestTime: 'April to June, September to November',
      idealFor: 'Couples, Families, Nature Lovers',
      activities: ['Boating', 'Toy Train Ride', 'Tea Plantation Tours', 'Trekking', 'Photography'],
      themes: ['nature', 'romantic', 'adventure'],
      rating: 4.8,
      reviews: 1247
    },
    'goa': {
      name: 'Goa Beach Paradise',
      country: 'Goa, India',
      duration: '2-3 Days',
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      description: 'Goa is India\'s beach capital, offering golden sandy beaches, vibrant nightlife, and Portuguese colonial charm. From peaceful beaches to bustling markets, Goa provides the perfect blend of relaxation and adventure.',
      highlights: ['Baga Beach', 'Old Goa Churches', 'Anjuna Flea Market', 'Dudhsagar Falls', 'Spice Plantations'],
      priceRange: '₹10,000 - ₹20,000',
      priceMin: 10000,
      priceMax: 20000,
      bestTime: 'November to March',
      idealFor: 'Beach Lovers, Party Enthusiasts, Couples',
      activities: ['Water Sports', 'Beach Parties', 'Dolphin Watching', 'Heritage Tours', 'Sunset Cruises'],
      themes: ['beach', 'adventure', 'romantic'],
      rating: 4.6,
      reviews: 2156
    },
    'pondicherry': {
      name: 'Pondicherry French Quarter',
      country: 'Puducherry, India',
      duration: '2-3 Days',
      image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      description: 'Pondicherry, also known as Puducherry, is a unique blend of French colonial heritage and Indian culture. With its charming streets, beautiful beaches, and spiritual atmosphere, it offers a tranquil getaway.',
      highlights: ['French Quarter', 'Auroville', 'Promenade Beach', 'Sri Aurobindo Ashram', 'Paradise Beach'],
      priceRange: '₹7,000 - ₹14,000',
      priceMin: 7000,
      priceMax: 14000,
      bestTime: 'October to March',
      idealFor: 'Culture Enthusiasts, Spiritual Seekers, Photographers',
      activities: ['Heritage Walks', 'Beach Relaxation', 'Yoga & Meditation', 'Cycling Tours', 'French Cuisine'],
      themes: ['cultural', 'beach', 'romantic'],
      rating: 4.7,
      reviews: 892
    },
    'manali': {
      name: 'Manali Adventure',
      country: 'Himachal Pradesh, India',
      duration: '4-6 Days',
      image: 'https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      description: 'Manali is a high-altitude Himalayan resort town known for its cool climate, snow-capped mountains, and adventure activities. It\'s a perfect destination for thrill-seekers and nature lovers alike.',
      highlights: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple', 'Old Manali', 'Manu Temple'],
      priceRange: '₹15,000 - ₹25,000',
      priceMin: 15000,
      priceMax: 25000,
      bestTime: 'March to June, October to February',
      idealFor: 'Adventure Seekers, Honeymooners, Mountain Lovers',
      activities: ['Paragliding', 'River Rafting', 'Skiing', 'Trekking', 'Mountain Biking'],
      themes: ['adventure', 'nature', 'romantic'],
      rating: 4.9,
      reviews: 1834
    },
    'kerala': {
      name: 'Kerala Backwaters',
      country: 'Kerala, India',
      duration: '4-6 Days',
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      description: 'Kerala, known as "God\'s Own Country," offers serene backwaters, lush green landscapes, and rich cultural heritage. The backwater cruises through palm-fringed canals provide a unique and peaceful experience.',
      highlights: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Kochi Fort', 'Thekkady Wildlife', 'Kovalam Beach'],
      priceRange: '₹18,000 - ₹30,000',
      priceMin: 18000,
      priceMax: 30000,
      bestTime: 'September to March',
      idealFor: 'Nature Lovers, Couples, Wellness Seekers',
      activities: ['Houseboat Cruises', 'Ayurvedic Treatments', 'Wildlife Safari', 'Tea Plantation Tours', 'Kathakali Shows'],
      themes: ['nature', 'spiritual', 'romantic'],
      rating: 4.8,
      reviews: 1567
    },
    'rajasthan': {
      name: 'Rajasthan Royal Tour',
      country: 'Rajasthan, India',
      duration: '5-6 Days',
      image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      description: 'Rajasthan, the "Land of Kings," showcases India\'s royal heritage through magnificent palaces, imposing forts, and vibrant culture. Experience the grandeur of maharajas and the beauty of the Thar Desert.',
      highlights: ['Amber Fort', 'City Palace Udaipur', 'Jaisalmer Fort', 'Mehrangarh Fort', 'Lake Pichola'],
      priceRange: '₹20,000 - ₹35,000',
      priceMin: 20000,
      priceMax: 35000,
      bestTime: 'October to March',
      idealFor: 'History Buffs, Culture Enthusiasts, Luxury Travelers',
      activities: ['Palace Tours', 'Camel Safari', 'Desert Camping', 'Folk Dance Shows', 'Heritage Walks'],
      themes: ['cultural', 'luxury', 'adventure'],
      rating: 4.7,
      reviews: 2341
    },
    'bali': {
      name: 'Bali Indonesia',
      country: 'Indonesia',
      duration: '7-10 Days',
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      description: 'Bali is a tropical paradise known for its stunning beaches, ancient temples, lush rice terraces, and vibrant culture. This Indonesian island offers the perfect blend of relaxation, adventure, and spiritual experiences.',
      highlights: ['Tanah Lot Temple', 'Ubud Rice Terraces', 'Mount Batur', 'Seminyak Beach', 'Uluwatu Temple'],
      priceRange: '₹60,000 - ₹1,00,000',
      priceMin: 60000,
      priceMax: 100000,
      bestTime: 'April to October',
      idealFor: 'Beach Lovers, Spiritual Seekers, Adventure Enthusiasts',
      activities: ['Temple Hopping', 'Volcano Trekking', 'Surfing', 'Yoga Retreats', 'Cultural Tours'],
      themes: ['beach', 'spiritual', 'adventure', 'romantic'],
      rating: 4.9,
      reviews: 3456
    },
    'singapore': {
      name: 'Singapore City',
      country: 'Singapore',
      duration: '7-8 Days',
      image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      description: 'Singapore is a modern city-state that seamlessly blends cultures, cuisines, and attractions. From futuristic gardens to historic neighborhoods, Singapore offers world-class experiences in a compact setting.',
      highlights: ['Gardens by the Bay', 'Marina Bay Sands', 'Sentosa Island', 'Chinatown', 'Universal Studios'],
      priceRange: '₹80,000 - ₹1,20,000',
      priceMin: 80000,
      priceMax: 120000,
      bestTime: 'February to April',
      idealFor: 'Families, Foodies, Urban Explorers',
      activities: ['City Tours', 'Theme Parks', 'Shopping', 'Food Tours', 'Night Safari'],
      themes: ['urban', 'cultural', 'luxury'],
      rating: 4.6,
      reviews: 2789
    },
    'paris': {
      name: 'Paris Romance',
      country: 'France',
      duration: '8-10 Days',
      image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      description: 'Paris, the "City of Light," is synonymous with romance, art, and culture. From iconic landmarks to charming cafés, Paris offers an unforgettable experience filled with history, cuisine, and timeless beauty.',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées', 'Montmartre'],
      priceRange: '₹1,50,000 - ₹2,50,000',
      priceMin: 150000,
      priceMax: 250000,
      bestTime: 'April to June, September to November',
      idealFor: 'Couples, Art Lovers, Culture Enthusiasts',
      activities: ['Museum Tours', 'Seine River Cruise', 'Wine Tasting', 'Shopping', 'Café Culture'],
      themes: ['romantic', 'cultural', 'luxury', 'urban'],
      rating: 4.8,
      reviews: 4567
    }
  };

  const data = destinationData[destinationId || ''];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log booking data to console (as requested)
    console.log('Booking Submitted:', {
      destination: data.name,
      bookingDetails: bookingData,
      timestamp: new Date().toISOString()
    });
    
    // Show success message
    alert(`Thank you ${bookingData.name}! Your booking request for ${data.name} has been submitted. We'll contact you soon at ${bookingData.email}.`);
    
    // Reset form
    setBookingData({
      name: '',
      email: '',
      startDate: '',
      endDate: ''
    });
    setShowBookingForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

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
            Back to Explore
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url('${data.image}')` }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{data.name}</h1>
            <div className="flex items-center justify-center space-x-6 text-lg">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {data.country}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {data.duration}
              </div>
              <div className="flex items-center">
                {renderStars(data.rating)}
                <span className="ml-2">{data.rating}/5 ({data.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {data.name}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{data.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <Star className="w-5 h-5 text-teal-600 mr-3" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Activities & Experiences</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.activities.map((activity, index) => (
                  <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <Camera className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Book This Trip</h3>
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CalendarDays className="w-4 h-4 inline mr-1" />
                      Travel Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={bookingData.startDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CalendarDays className="w-4 h-4 inline mr-1" />
                      Travel End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={bookingData.endDate}
                      onChange={handleInputChange}
                      required
                      min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Package Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Package Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-teal-600 mr-3" />
                    <span className="text-gray-600">Duration</span>
                  </div>
                  <span className="font-medium text-gray-900">{data.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-teal-600 mr-3" />
                    <span className="text-gray-600">Best Time</span>
                  </div>
                  <span className="font-medium text-gray-900 text-sm">{data.bestTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-teal-600 mr-3" />
                    <span className="text-gray-600">Ideal For</span>
                  </div>
                  <span className="font-medium text-gray-900 text-sm">{data.idealFor}</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Package Pricing</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">{data.priceRange}</div>
                <p className="text-gray-600 text-sm mb-6">Per person (approx.)</p>
                <button 
                  onClick={() => {
                    const bookingSection = document.querySelector('form');
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
                >
                  Book Now
                </button>
                <p className="text-gray-500 text-xs mt-3">*Prices may vary based on season and availability</p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">Our travel experts are here to help you plan the perfect trip.</p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-3" />
                  <span>hello@tripcraft.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;