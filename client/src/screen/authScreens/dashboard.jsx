import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DetailView } from "./DetailJournal"

export const Dashboard = () => {
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleDateClick = (year, month, day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(formattedDate);
  };

  const renderMonth = (monthIndex) => {
    const daysInMonth = getDaysInMonth(currentYear, monthIndex);
    const firstDay = getFirstDayOfMonth(currentYear, monthIndex);
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="aspect-square min-h-[28px] sm:min-h-[32px] md:min-h-[36px]" />);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(currentYear, monthIndex, day)}
          className={`aspect-square min-h-[28px] sm:min-h-[32px] md:min-h-[36px] flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-blue-500 hover:text-white hover:scale-110 hover:shadow-lg ${
            isToday ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500' : 'text-gray-700 hover:shadow-blue-200'
          }`}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <h3 className="text-base sm:text-lg font-semibold text-blue-600 text-center mb-2 sm:mb-3 flex-shrink-0">
          {months[monthIndex]}
        </h3>
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2 flex-shrink-0">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-[10px] sm:text-xs font-semibold text-gray-500">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 flex-grow">{days}</div>
      </div>
    );
  };

  if (selectedDate) {
    return <DetailView selectedDate={selectedDate} onBack={() => setSelectedDate(null)} />;
  }

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button onClick={() => setCurrentYear(currentYear - 1)} className="p-2 sm:p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200">
            <ChevronLeft size={20} className="text-gray-700 sm:w-6 sm:h-6" />
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 min-w-[140px] sm:min-w-[180px] text-center">{currentYear}</h1>
          <button onClick={() => setCurrentYear(currentYear + 1)} className="p-2 sm:p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200">
            <ChevronRight size={20} className="text-gray-700 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 auto-rows-fr">
          {months.map((_, index) => <div key={index} className="flex">{renderMonth(index)}</div>)}
        </div>
      </div>
    </div>
  );
};
