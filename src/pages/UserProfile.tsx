import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Star, Edit3, Save, X, Camera, LogOut, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  profileImage: string;
}

interface Booking {
  id: string;
  destination: string;
  bookingDate: string;
  travelDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: string;
  numberOfPeople: number;
  userEmail: string;
  userName: string;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  
  const [userData, setUserData] = useState<UserData>({
    name: user?.name || 'Lavanya Mohan',
    email: user?.email || 'lavanya@tripcraft.com',
    phone: '+91 98765 43210',
    location: 'Chennai, Tamil Nadu',
    joinDate: 'January 2024',
    profileImage: user?.photoURL || 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
  });

  const [editData, setEditData] = useState<UserData>(userData);

  // Load user bookings from Firestore
  useEffect(() => {
    const loadBookings = async () => {
      if (!user?.email) {
        setIsLoadingBookings(false);
        return;
      }

      try {
        const bookingsRef = collection(db, 'bookings');
        const q = query(
          bookingsRef, 
          where('userEmail', '==', user.email),
          orderBy('bookingDate', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const userBookings: Booking[] = [];
        
        querySnapshot.forEach((doc) => {
          userBookings.push({
            id: doc.id,
            ...doc.data()
          } as Booking);
        });
        
        setBookings(userBookings);
      } catch (error) {
        console.error('Error loading bookings:', error);
        // Fallback to demo bookings if Firestore fails
        setBookings([
          {
            id: '1',
            destination: 'Goa Beach Paradise',
            bookingDate: '2024-12-15',
            travelDate: '2025-03-15',
            status: 'confirmed',
            price: '₹15,000',
            numberOfPeople: 2,
            userEmail: user?.email || '',
            userName: user?.name || ''
          },
          {
            id: '2',
            destination: 'Ooty Hill Station',
            bookingDate: '2024-11-20',
            travelDate: '2024-12-10',
            status: 'confirmed',
            price: '₹12,000',
            numberOfPeople: 2,
            userEmail: user?.email || '',
            userName: user?.name || ''
          }
        ]);
      } finally {
        setIsLoadingBookings(false);
      }
    };

    loadBookings();
  }, [user]);

  const handleSaveProfile = () => {
    setUserData(editData);
    setIsEditing(false);
    console.log('Profile updated:', editData);
  };

  const handleCancelEdit = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-teal-600 hover:text-teal-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to TripCraft
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Welcome Message */}
              <div className="text-center mb-6 p-4 bg-teal-50 rounded-xl">
                <h2 className="text-lg font-semibold text-teal-800">Welcome back!</h2>
                <p className="text-sm text-teal-600">You're successfully logged in</p>
              </div>

              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-teal-100"
                  />
                  <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={editData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">{userData.name}</h1>
                      <p className="text-gray-600">Travel Enthusiast</p>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-3" />
                        <span className="text-sm">{userData.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-3" />
                        <span className="text-sm">{userData.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-3" />
                        <span className="text-sm">{userData.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-3" />
                        <span className="text-sm">Joined {userData.joinDate}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">{bookings.length}</div>
                  <div className="text-xs text-gray-600">Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div className="text-xs text-gray-600">Confirmed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Bookings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Package className="w-6 h-6 mr-2" />
                My Bookings
              </h2>
              
              {isLoadingBookings ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading your bookings...</p>
                </div>
              ) : bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 text-lg">{booking.destination}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>Booked: {formatDate(booking.bookingDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>Travel: {formatDate(booking.travelDate)}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            <span>{booking.numberOfPeople} {booking.numberOfPeople === 1 ? 'Person' : 'People'}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold text-teal-600">{booking.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                  <p className="mb-6">Start planning your next adventure!</p>
                  <button 
                    onClick={() => navigate('/')}
                    className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Explore Packages
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/')}
                  className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center mb-2">
                    <Package className="w-5 h-5 text-teal-600 mr-2" />
                    <span className="font-semibold">Browse Packages</span>
                  </div>
                  <p className="text-sm text-gray-600">Discover new destinations and plan your next trip</p>
                </button>
                
                <button 
                  onClick={() => navigate('/#contact')}
                  className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center mb-2">
                    <Mail className="w-5 h-5 text-teal-600 mr-2" />
                    <span className="font-semibold">Contact Support</span>
                  </div>
                  <p className="text-sm text-gray-600">Get help with your bookings or travel questions</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;