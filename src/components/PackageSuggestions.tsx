import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Search } from 'lucide-react';
import SearchFilters, { FilterState } from './SearchFilters';

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
}

interface PackageSuggestionsProps {
  duration: number;
}

const PackageSuggestions: React.FC<PackageSuggestionsProps> = ({ duration }) => {
  const navigate = useNavigate();
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);

  const packages: Record<string, Package[]> = {
    weekend: [
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
        category: 'weekend'
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
        category: 'weekend'
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
        category: 'weekend'
      }
    ],
    domestic: [
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
        category: 'domestic'
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
        category: 'domestic'
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
        category: 'domestic'
      }
    ],
    international: [
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
        category: 'international'
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
        category: 'international'
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
        category: 'international'
      }
    ]
  };

  const getPackageCategory = () => {
    if (duration >= 1 && duration <= 3) {
      return {
        packages: packages.weekend,
        title: 'Weekend Escapes',
        subtitle: 'Perfect short trips for a quick refreshing break'
      };
    } else if (duration >= 4 && duration <= 6) {
      return {
        packages: packages.domestic,
        title: 'Domestic Trips',
        subtitle: 'Immersive experiences with time to truly explore'
      };
    } else if (duration >= 7) {
      return {
        packages: packages.international,
        title: 'International Trips',
        subtitle: 'Epic journeys to distant lands and cultures'
      };
    } else {
      return {
        packages: [...packages.weekend, ...packages.domestic, ...packages.international],
        title: 'Recommended Packages',
        subtitle: 'Select your travel dates to see personalized recommendations'
      };
    }
  };

  const { packages: currentPackages, title, subtitle } = getPackageCategory();

  const handleFiltersChange = (filters: FilterState) => {
    let filtered = [...currentPackages];

    // Filter by search term (enhanced search)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(pkg => 
        pkg.title.toLowerCase().includes(searchLower) ||
        pkg.country.toLowerCase().includes(searchLower) ||
        pkg.description.toLowerCase().includes(searchLower) ||
        pkg.themes.some(theme => theme.toLowerCase().includes(searchLower))
      );
    }

    // Filter by price range
    filtered = filtered.filter(pkg => pkg.priceMin <= filters.maxPrice);

    // Filter by theme
    if (filters.theme !== 'all') {
      filtered = filtered.filter(pkg => pkg.themes.includes(filters.theme));
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(pkg => pkg.category === filters.category);
    }

    setFilteredPackages(filtered);
  };

  // Initialize filtered packages
  useEffect(() => {
    setFilteredPackages(currentPackages);
  }, [currentPackages]);

  const handleExplorePackage = (packageId: string) => {
    navigate(`/explore/${packageId}`);
  };

  const formatPriceRange = (min: number, max: number) => {
    const formatPrice = (price: number) => {
      if (price >= 100000) {
        return `₹${(price / 100000).toFixed(1)}L`;
      }
      return `₹${(price / 1000)}K`;
    };
    return `${formatPrice(min)} - ${formatPrice(max)}`;
  };

  const PackageCard: React.FC<{ package: Package }> = ({ package: pkg }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
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
  );

  return (
    <section id="packages" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
        
        {/* Search and Filter Interface */}
        <SearchFilters 
          onFiltersChange={handleFiltersChange}
          totalPackages={currentPackages.length}
          filteredCount={filteredPackages.length}
        />
        
        {/* Package Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <PackageCard key={index} package={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No packages found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackageSuggestions;