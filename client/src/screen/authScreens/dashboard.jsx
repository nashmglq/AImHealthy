import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useListJournals } from "../../hooks/mainHooks";
import { motion } from "framer-motion";
const Month = React.memo(
  ({ monthIndex, journalDates, currentYear, months, daysOfWeek }) => {
    const getDaysInMonth = (year, month) =>
      new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) =>
      new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentYear, monthIndex);
    const firstDay = getFirstDayOfMonth(currentYear, monthIndex);
    const days = [];

    for (let i = 0; i < firstDay; i++)
      days.push(
        <div key={`empty-${i}`} className="aspect-square min-h-[28px]" />
      );

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(monthIndex + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const isToday = dateStr === new Date().toISOString().split("T")[0];
      const hasJournal = journalDates.includes(dateStr);

      days.push(
        <Link
          key={day}
          to={`/dashboard/${dateStr}`}
          className="aspect-square min-h-[28px] flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 hover:text-blue-500"
        >
          <div
            className={`w-6 h-6 flex items-center justify-center ${
              isToday ? "bg-blue-200 rounded-full" : ""
            }`}
          >
            <span
              className={`${
                isToday ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              {day}
            </span>
          </div>
          {hasJournal && (
            <div className="w-1.5 h-1.5 mt-1 rounded-full bg-blue-500" />
          )}
        </Link>
      );
    }

    return (
      <div className="flex flex-col h-full">
        <h3 className="text-base font-semibold text-neutral-800 text-center mb-2">
          {months[monthIndex]}
        </h3>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] font-semibold text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 flex-grow">{days}</div>
      </div>
    );
  }
);

export const Dashboard = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showAll, setShowAll] = useState(false);
  const [journalDates, setJournalDates] = useState([]);

  const { listJournals } = useListJournals();

  useEffect(() => {
    const fetchJournals = async () => {
      const { success } = await listJournals();
      if (success) setJournalDates(success.map((j) => j.date.split("T")[0]));
    };
    fetchJournals();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentMonthIndex = new Date().getMonth();
  const monthsToShow = showAll
    ? months
    : months.slice(currentMonthIndex, currentMonthIndex + 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="min-h-screen bg-white p-4 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setCurrentYear(currentYear - 1)}
              className="p-2 rounded transition-colors duration-200 hover:bg-neutral-200"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-3xl font-bold min-w-[140px] text-center">
              {currentYear}
            </h1>
            <button
              onClick={() => setCurrentYear(currentYear + 1)}
              className="p-2 rounded transition-colors duration-200 hover:bg-neutral-200"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            key={showAll ? "all" : "partial"} // key forces re-render animation when showAll changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {monthsToShow.map((_, index) => (
              <div key={index} className="w-full sm:w-auto">
                <Month
                  monthIndex={showAll ? index : currentMonthIndex + index}
                  journalDates={journalDates}
                  currentYear={currentYear}
                  months={months}
                  daysOfWeek={daysOfWeek}
                />
              </div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 bg-white text-blue-600 border border-blue-400 rounded-lg shadow-sm hover:bg-blue-50 hover:shadow-md transition-all"
            >
              {showAll ? "Hide" : "Show More"}
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </motion.div>
  );
};
