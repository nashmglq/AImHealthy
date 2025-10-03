import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  useGenerateInsights,
  useGetLatestInsight,
  useGetAllInsights,
} from "../../hooks/aiHooks";
import { Clock, List } from "lucide-react";

dayjs.extend(relativeTime);

export const Insights = () => {
  const [days, setDays] = useState(7);
  const [latestInsight, setLatestInsight] = useState(null);
  const [allInsights, setAllInsights] = useState([]);

  const { generateInsights, loading: generating } = useGenerateInsights();
  const { getLatestInsight, loading: loadingLatest } = useGetLatestInsight();
  const { getAllInsights, loading: loadingAll } = useGetAllInsights();

  const fetchLatest = async () => {
    const { success } = await getLatestInsight();
    if (success) setLatestInsight(success);
  };

  const fetchAll = async () => {
    const { success } = await getAllInsights();
    if (success) setAllInsights(success);
  };

  useEffect(() => {
    fetchLatest();
    fetchAll();
  }, []);

  const handleGenerate = async () => {
    const { success } = await generateInsights({ days });
    if (success) {
      setLatestInsight(success);
      fetchAll();
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-light text-gray-800 flex items-center gap-3">
                <Clock size={24} className="text-blue-500" />
                Latest Insight
              </h2>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {generating ? "Generating..." : "Generate"}
              </button>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-2xl p-8 min-h-[400px]">
              {loadingLatest ? (
                <p className="text-gray-400">Loading...</p>
              ) : latestInsight ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-blue-400 text-sm mb-4">
                    {dayjs(latestInsight.createdAt).fromNow()}
                  </p>
                  <div className="prose prose-blue max-w-none">
                    <ReactMarkdown>{latestInsight.content}</ReactMarkdown>
                  </div>
                </motion.div>
              ) : (
                <p className="text-gray-400">No insights available.</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-light text-gray-800 flex items-center gap-3">
              <List size={24} className="text-blue-500" />
              History
            </h2>
            
            <div className="bg-white border border-gray-100 rounded-2xl p-6 max-h-[600px] overflow-y-auto">
              {loadingAll ? (
                <p className="text-gray-400">Loading...</p>
              ) : allInsights.length ? (
                <div className="space-y-4">
                  {allInsights.map((insight) => (
                    <motion.div
                      key={insight.id}
                      className="border-b border-gray-100 pb-4 last:border-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="text-blue-400 text-sm mb-2">
                        {dayjs(insight.createdAt).fromNow()}
                      </p>
                      <div className="prose prose-sm prose-blue max-w-none text-gray-700">
                        <ReactMarkdown>{insight.content}</ReactMarkdown>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No history yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};