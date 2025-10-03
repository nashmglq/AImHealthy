import React from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';

export const DetailView = ({ selectedDate, onBack }) => {
  const dateObj = new Date(selectedDate);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-200">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Calendar className="text-blue-500 mr-2 sm:mr-3" size={32} />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Date Details</h1>
          </div>
          
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg mb-3 sm:mb-4">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{selectedDate}</p>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4 px-4">{formattedDate}</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-gray-700 text-center">
              You selected this date. This is where you can add events, notes, or appointments!
            </p>
          </div>
          
          <button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <ArrowLeft size={18} />
            Back to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};
