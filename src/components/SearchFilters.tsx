import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, DollarSign, X, MapPin } from 'lucide-react';

interface SearchFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  totalPackages: number;
  filteredCount: number;
}

export interface FilterState {
  searchTerm: string;
  maxPrice: number;
  theme: string;
  category: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onFiltersChange, 
  totalPackages, 
  filteredCount 
}) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    maxPrice: 250000, // Max price in rupees
    theme: 'all',
    category: 'all'
  });
  
  const [isExpanded, setIsExpanded] = useState(false);

  const themes = [
    { value: 'all', label: 'All Themes' },
    { value: 'beach', label: 'Beach & Coastal' },
    { value: 'adventure', label: 'Adventure & Trekking' },
    { value: 'romantic', label: 'Romantic & Honeymoon' },
    { value: 'cultural', label: 'Cultural & Heritage' },
    { value: 'nature', label: 'Nature & Wildlife' },
    { value: 'spiritual', label: 'Spiritual & Wellness' },
    { value: 'urban', label: 'City & Urban' },
    { value: 'luxury', label: 'Luxury & Premium' }
  ];

  const categories = [
    { value: 'all', label: 'Show All', icon: '🌍' },
    { value: 'weekend', label: 'Weekend Getaways', icon: '🏖️' },
    { value: 'domestic', label: 'Hill Stations', icon: '🏔️' },
    { value: 'international', label: 'International Trips', icon: '✈️' }
  ];

  const priceRanges = [
    { value: 15000, label: '₹15K' },
    { value: 30000, label: '₹30K' },
    { value: 60000, label: '₹60K' },
    { value: 120000, label: '₹1.2L' },
    { value: 250000, label: '₹2.5L+' }
  ];

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filters.searchTerm.trim()) {
      // Navigate to search results page instead of filtering on same page
      navigate(`/search/${encodeURIComponent(filters.searchTerm.trim())}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleSearchClick = () => {
    if (filters.searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(filters.searchTerm.trim())}`);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, theme: e.target.value }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      maxPrice: 250000,
      theme: 'all',
      category: 'all'
    });
  };

  const hasActiveFilters = filters.searchTerm !== '' || filters.maxPrice < 250000 || filters.theme !== 'all' || filters.category !== 'all';

  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${(price / 1000)}K`;
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl mb-8 overflow-hidden">
      {/* Search Bar - Always Visible */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search a destination..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={handleSearchClick}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            {filters.searchTerm && (
              <button
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, searchTerm: '' }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
              isExpanded 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {[filters.searchTerm !== '', filters.maxPrice < 250000, filters.theme !== 'all', filters.category !== 'all'].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Filter Buttons - Always Visible */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filters.category === category.value
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="p-6 bg-gray-50">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Price Range Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Maximum Budget: {formatPrice(filters.maxPrice)}
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={filters.maxPrice}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  {priceRanges.map((range, index) => (
                    <span key={index}>{range.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Theme Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Trip Theme
              </label>
              <select
                value={filters.theme}
                onChange={handleThemeChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
              >
                {themes.map((theme) => (
                  <option key={theme.value} value={theme.value}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearFilters}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-4 h-4 mr-1" />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="px-6 py-3 bg-teal-50 border-t border-gray-100">
        <p className="text-sm text-teal-700">
          Showing <span className="font-semibold">{filteredCount}</span> of{' '}
          <span className="font-semibold">{totalPackages}</span> packages
          {hasActiveFilters && (
            <span className="ml-2 text-teal-600">
              (filtered)
            </span>
          )}
          {filters.searchTerm && (
            <span className="ml-2 text-teal-800">
              - Click search to find "{filters.searchTerm}"
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SearchFilters;