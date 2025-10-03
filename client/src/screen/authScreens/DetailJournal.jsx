import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDetailJournal } from '../../hooks/mainHooks';

export const DetailView = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const { detailJournal, loading } = useDetailJournal();
  const [journalText, setJournalText] = useState('');

  useEffect(() => {
    if (!date) return;
    const fetchJournal = async () => {
      const { success } = await detailJournal(date);
      if (success) setJournalText(success.content || '');
    };
    fetchJournal();
  }, [date]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-3xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all duration-200"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2 text-white">
              <Calendar size={24} />
              <span className="text-sm md:text-base font-medium">{date}</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">My Wellness Journal</h1>
        </div>

        <div className="bg-white rounded-b-3xl shadow-2xl overflow-hidden relative">
          <div className="absolute left-8 top-24 flex flex-col gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-gray-300 shadow-inner"></div>
            ))}
          </div>

          <div
            className="relative p-8 md:p-12 min-h-[600px]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                transparent,
                transparent 31px,
                #e5e7eb 31px,
                #e5e7eb 32px
              )`,
              backgroundPosition: '0 8px'
            }}
          >
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Start writing your thoughts here..."
              className="w-full h-full min-h-[500px] bg-transparent border-none outline-none resize-none text-gray-800 text-lg leading-8 placeholder-gray-400 pl-8 font-serif"
              style={{ lineHeight: '32px' }}
            />
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg">
              Save Entry
            </button>
            <button
              onClick={() => setJournalText('')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              Clear
            </button>
          </div>
          <div className="text-sm text-gray-500">{journalText.length} characters</div>
        </div>
      </div>
    </div>
  );
};
