import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Heart, Users, Coffee, Brain } from 'lucide-react';

const MentalHealthTips = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const tips = [
    {
      id: 1,
      title: 'Practice Mindfulness',
      description: 'Take 5 minutes each day for deep breathing and meditation.',
      icon: <Brain className="w-6 h-6 text-purple-600" />,
    },
    {
      id: 2,
      title: 'Stay Connected',
      description: 'Regularly connect with friends and family for emotional support.',
      icon: <Users className="w-6 h-6 text-purple-600" />,
    },
    {
      id: 3,
      title: 'Self-Care Routine',
      description: 'Maintain a healthy sleep schedule and engage in activities you enjoy.',
      icon: <Heart className="w-6 h-6 text-purple-600" />,
    },
    {
      id: 4,
      title: 'Study Breaks',
      description: 'Take regular breaks during study sessions to prevent burnout.',
      icon: <Coffee className="w-6 h-6 text-purple-600" />,
    },
  ];

  const filteredTips = tips.filter(tip =>
    tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            Student Mental Health Tips & Tricks
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover practical strategies to maintain your mental well-being while navigating student life.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search for tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-500 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {filteredTips.map((tip) => (
            <motion.div
              key={tip.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600">
                    {tip.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resources Section */}
        <div className="bg-purple-100 rounded-xl p-8 mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <Book className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-purple-800">
              Additional Resources
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Counseling Services
              </h3>
              <p className="text-gray-600">
                Access free counseling services available on campus for additional support.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Wellness Workshops
              </h3>
              <p className="text-gray-600">
                Join our weekly workshops focused on stress management and mental wellness.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Need immediate support? Don't hesitate to reach out.
          </p>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Contact Support Team
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MentalHealthTips;
