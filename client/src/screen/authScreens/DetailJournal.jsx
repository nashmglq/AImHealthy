import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDetailJournal, useCreateJournal } from '../../hooks/mainHooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DetailView = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const { detailJournal } = useDetailJournal();
  const { createJournal, loading } = useCreateJournal();
  const [journalText, setJournalText] = useState('');

  useEffect(() => {
    if (!date) return;
    const fetchJournal = async () => {
      const { success } = await detailJournal(date);
      if (success) setJournalText(success.content || '');
    };
    fetchJournal();
  }, [date]);

  useEffect(() => {
    if (!date) return;
    const handler = setTimeout(() => {
      if (journalText.trim()) handleSave();
    }, 1500);

    return () => clearTimeout(handler);
  }, [journalText]);

  const handleSave = async () => {
    if (!date || !journalText.trim()) return;
    const { success, error } = await createJournal({ date, content: journalText });
    if (success) toast.success('Journal saved!', { position: 'top-right', autoClose: 1500 });
    else toast.error(error || 'Failed to save', { position: 'top-right', autoClose: 2000 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 p-4 md:p-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-3xl shadow-lg p-6 md:p-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full flex items-center justify-center shadow-md transition-all duration-200"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3 bg-white bg-opacity-20 px-4 py-2 rounded-full shadow-md">
              <Calendar size={24} className="text-white" />
              <span className="text-white font-medium">{date}</span>
            </div>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full shadow-md transition-all duration-200 flex items-center justify-center disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
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
              backgroundPosition: '0 8px',
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
      </div>
    </div>
  );
};
