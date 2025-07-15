import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Clock, Star } from 'lucide-react';

interface Package {
  id: string;
  title: string;
  country: string;
  duration: string;
  image: string;
  description: string;
  priceMin: number;
  priceMax: number;
  themes: string[];
  category: string;
  rating: number;
  reviews: number;
}

const SearchResults: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const navigate = useNavigate();

  const allPackages: Package[] = [
    {
      id: 'ooty',
      title: "Ooty Hill Station",
      country: "Tamil Nadu, India",
      duration: "2-3 Days",
      image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "Scenic hill station with tea gardens and cool climate",
      priceMin: 8000,
      priceMax: 15000,
      themes: ['nature', 'romantic', 'adventure'],
      category: 'weekend',
      rating: 4.8,
      reviews: 1247
    },
    {
      id: 'goa',
      title: "Goa Beach Paradise",
      country: "Goa, India", 
      duration: "2-3 Days",
      image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "Sun, sand, and vibrant nightlife by the Arabian Sea",
      priceMin: 10000,
      priceMax: 20000,
      themes: ['beach', 'adventure', 'romantic'],
      category: 'weekend',
      rating: 4.6,
      reviews: 2156
    },
    {
      id: 'pondicherry',
      title: "Pondicherry French Quarter",
      country: "Puducherry, India",
      duration: "2-3 Days", 
      image: "https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "French colonial charm with beautiful beaches",
      priceMin: 7000,
      priceMax: 14000,
      themes: ['cultural', 'beach', 'romantic'],
      category: 'weekend',
      rating: 4.7,
      reviews: 892
    },
    {
      id: 'manali',
      title: "Manali Adventure",
      country: "Himachal Pradesh, India",
      duration: "4-6 Days",
      image: "https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "Snow-capped mountains and thrilling activities",
      priceMin: 15000,
      priceMax: 25000,
      themes: ['adventure', 'nature', 'romantic'],
      category: 'domestic',
      rating: 4.9,
      reviews: 1834
    },
    {
      id: 'kerala',
      title: "Kerala Backwaters",
      country: "Kerala, India",
      duration: "4-6 Days",
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "Serene backwaters and lush green landscapes",
      priceMin: 18000,
      priceMax: 30000,
      themes: ['nature', 'spiritual', 'romantic'],
      category: 'domestic',
      rating: 4.8,
      reviews: 1567
    },
    {
      id: 'rajasthan',
      title: "Rajasthan Royal Tour",
      country: "Rajasthan, India",
      duration: "5-6 Days",
      image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "Palaces, forts, and desert landscapes",
      priceMin: 20000,
      priceMax: 35000,
      themes: ['cultural', 'luxury', 'adventure'],
      category: 'domestic',
      rating: 4.7,
      reviews: 2341
    },
    {
      id: 'bali',
      title: "Bali Indonesia",
      country: "Indonesia",
      duration: "7-10 Days",
      image: "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "Tropical paradise with temples and rice terraces",
      priceMin: 60000,
      priceMax: 100000,
      themes: ['beach', 'spiritual', 'adventure', 'romantic'],
      category: 'international',
      rating: 4.9,
      reviews: 3456
    },
    {
      id: 'singapore',
      title: "Singapore City",
      country: "Singapore", 
      duration: "7-8 Days",
      image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "Modern cityscape with gardens and cultural diversity",
      priceMin: 80000,
      priceMax: 120000,
      themes: ['urban', 'cultural', 'luxury'],
      category: 'international',
      rating: 4.6,
      reviews: 2789
    },
    {
      id: 'paris',
      title: "Paris Romance",
      country: "France",
      duration: "8-10 Days",
      image: "https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "City of light with iconic landmarks and cuisine",
      priceMin: 150000,
      priceMax: 250000,
      themes: ['romantic', 'cultural', 'luxury', 'urban'],
      category: 'international',
      rating: 4.8,
      reviews: 4567
    }
  ];

  // Filter packages based on search query
  const filteredPackages = allPackages.filter(pkg => {
    if (!query) return false;
    const searchLower = query.toLowerCase();
    return (
      pkg.title.toLowerCase().includes(searchLower) ||
      pkg.country.toLowerCase().includes(searchLower) ||
      pkg.description.toLowerCase().includes(searchLower) ||
      pkg.themes.some(theme => theme.toLowerCase().includes(searchLower))
    );
  });

  const formatPriceRange = (min: number, max: number) => {
    const formatPrice = (price: number) => {
      if (price >= 100000) {
        return `₹${(price / 100000).toFixed(1)}L`;
      }
      return `₹${(price / 1000)}K`;
    };
    return `${formatPrice(min)} - ${formatPrice(max)}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleExplorePackage = (packageId: string) => {
    navigate(`/explore/${packageId}`);
  };

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

      {/* Search Results Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-teal-600 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Search Results
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            {query ? `Results for "${query}"` : 'No search query provided'}
          </p>
          {filteredPackages.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Found {filteredPackages.length} matching destination{filteredPackages.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Results */}
        {filteredPackages.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url('${pkg.image}')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {formatPriceRange(pkg.priceMin, pkg.priceMax)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{pkg.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {pkg.country}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {renderStars(pkg.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      {pkg.rating}/5 ({pkg.reviews} reviews)
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  
                  {/* Theme Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.themes.slice(0, 3).map((theme, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => handleExplorePackage(pkg.id)}
                    className="w-full bg-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
                  >
                    Explore Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <Search className="w-24 h-24 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              {query ? 'No destinations found' : 'No search query'}
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {query 
                ? `We couldn't find any destinations matching "${query}". Try searching for popular destinations like Goa, Manali, or Kerala.`
                : 'Please enter a search term to find destinations.'
              }
            </p>
            <button 
              onClick={() => navigate('/')}
              className="bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
            >
              Browse All Packages
            </button>
            </div>
        )}

        {/* Suggestions */}
        {filteredPackages.length === 0 && query && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Destinations</h3>
            <p className="text-gray-600 mb-6">Try searching for these popular destinations:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Goa', 'Manali', 'Kerala', 'Ooty', 'Rajasthan', 'Bali', 'Singapore', 'Paris'].map((destination) => (
                <button
                  key={destination}
                  onClick={() => navigate(`/search/${destination.toLowerCase()}`)}
                  className="p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors text-center"
                >
                  {destination}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;