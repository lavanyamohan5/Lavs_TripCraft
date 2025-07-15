import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchResults from './pages/SearchResults';
import ExplorePage from './pages/ExplorePage';
import PackageDetailsPage from './pages/PackageDetailsPage';
import UserProfile from './pages/UserProfile';
import DestinationDetail from './components/DestinationDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/explore/:destinationId" element={<DestinationDetail />} />
            <Route path="/package/:packageId" element={<PackageDetailsPage />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;