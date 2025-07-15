import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DateRangePickerProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  selectedDates: {
    startDate: Date | null;
    endDate: Date | null;
    duration: number;
  };
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange, selectedDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isSelectingRange, setIsSelectingRange] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (date: Date) => {
    const { startDate, endDate } = selectedDates;
    
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      onDateChange(date, null);
      setIsSelectingRange(true);
    } else if (startDate && !endDate) {
      // Complete the range
      if (date < startDate) {
        onDateChange(date, startDate);
      } else {
        onDateChange(startDate, date);
      }
      setIsSelectingRange(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (date: Date) => {
    const { startDate, endDate } = selectedDates;
    if (!startDate) return false;
    
    const dateTime = date.getTime();
    const startTime = startDate.getTime();
    const endTime = endDate?.getTime();
    
    if (endTime) {
      return dateTime >= startTime && dateTime <= endTime;
    }
    
    return dateTime === startTime;
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const disabled = isDateDisabled(date);
      const selected = isDateSelected(date);
      const weekend = isWeekend(date);

      let className = 'p-2 text-center cursor-pointer rounded-lg transition-colors ';
      
      if (disabled) {
        className += 'text-gray-300 cursor-not-allowed';
      } else if (selected) {
        className += 'bg-teal-600 text-white';
      } else if (weekend) {
        className += 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      } else {
        className += 'hover:bg-gray-100';
      }

      days.push(
        <div
          key={day}
          className={className}
          onClick={() => !disabled && handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="date-picker" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            When are you traveling?
          </h2>
          <p className="text-lg text-gray-600">
            Select your departure and return dates to get personalized recommendations
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Select Dates
                </h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-medium min-w-[140px] text-center">
                    {monthNames[currentMonth]} {currentYear}
                  </span>
                  <button 
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {daysOfWeek.map(day => (
                  <div key={day} className="py-2 font-medium text-gray-600">
                    {day}
                  </div>
                ))}
                {renderCalendar()}
              </div>
            </div>
            
            {/* Selected Dates Display */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Trip Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Departure:</span>
                    <span className="font-medium text-teal-600">
                      {formatDate(selectedDates.startDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Return:</span>
                    <span className="font-medium text-teal-600">
                      {formatDate(selectedDates.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Duration:</span>
                    <span className="font-bold text-teal-600">
                      {selectedDates.duration} days
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                disabled={!selectedDates.startDate || !selectedDates.endDate}
                onClick={() => {
                  const packagesSection = document.getElementById('packages');
                  if (packagesSection) {
                    packagesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Find Perfect Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DateRangePicker;