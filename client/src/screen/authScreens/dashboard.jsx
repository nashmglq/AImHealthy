import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

export const Dashboard = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showAll, setShowAll] = useState(false);

  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderMonth = (monthIndex) => {
    const daysInMonth = getDaysInMonth(currentYear, monthIndex);
    const firstDay = getFirstDayOfMonth(currentYear, monthIndex);
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="aspect-square min-h-[28px]" />);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(monthIndex + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      days.push(
        <Link
          key={day}
          to={`/dashboard/${dateStr}`}
          className={`aspect-square min-h-[28px] flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-200 hover:bg-blue-500 hover:text-white hover:scale-110 ${
            isToday ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500' : 'text-gray-700'
          }`}
        >
          {day}
        </Link>
      );
    }

    return (
      <div className="bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        <h3 className="text-base font-semibold text-blue-600 text-center mb-2">{months[monthIndex]}</h3>
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {daysOfWeek.map(day => <div key={day} className="text-center text-[10px] font-semibold text-gray-500">{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-0.5 flex-grow">{days}</div>
      </div>
    );
  };

  const currentMonthIndex = new Date().getMonth();
  const monthsToShow = showAll ? months : months.slice(currentMonthIndex, currentMonthIndex + 3);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <button onClick={() => setCurrentYear(currentYear - 1)} className="p-2 bg-white rounded-full shadow-md border border-gray-200">
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-blue-600 min-w-[140px] text-center">{currentYear}</h1>
          <button onClick={() => setCurrentYear(currentYear + 1)} className="p-2 bg-white rounded-full shadow-md border border-gray-200">
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {monthsToShow.map((_, index) => (
            <div key={index} className="w-full sm:w-auto">{renderMonth(showAll ? index : currentMonthIndex + index)}</div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors duration-200"
          >
            {showAll ? "Hide" : "Show More"}
          </button>
        </div>
      </div>

      <Outlet />
    </div>
  );
};
