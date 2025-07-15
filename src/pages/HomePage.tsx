import React, { useState } from 'react';
import Hero from '../components/Hero';
import DateRangePicker from '../components/DateRangePicker';
import PackageSuggestions from '../components/PackageSuggestions';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutFounder from '../components/AboutFounder';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

const HomePage: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    duration: number;
  }>({
    startDate: null,
    endDate: null,
    duration: 0
  });

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    let duration = 0;
    if (startDate && endDate) {
      duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    
    setSelectedDates({
      startDate,
      endDate,
      duration
    });
  };

  return (
    <>
      <Navigation />
      <Hero />
      <DateRangePicker onDateChange={handleDateChange} selectedDates={selectedDates} />
      <PackageSuggestions duration={selectedDates.duration} />
      <WhyChooseUs />
      <AboutFounder />
      <Footer />
    </>
  );
};

export default HomePage;