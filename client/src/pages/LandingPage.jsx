import React from 'react';
import MoodTracker from '../components/MoodTracker';
import ThoughtCard from '../components/ThoughtCard';
import QuoteDisplay from '../components/QuoteDisplay';

const LandingPage = () => {
  return (
    <div className="p-4" style={{ 
      backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
      minHeight: 'calc(100vh - 64px)'
    }}>
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#7B66FF' }}>Welcome to Mental Health Care</h1>
        <p className="text-xl text-600">Your journey to wellness starts here</p>
      </div>
      
      <div className="grid">
        <div className="col-12 lg:col-8">
          <div className="grid">
            <div className="col-12">
              <div className="surface-card p-4 shadow-2 border-round">
                <h2 className="text-2xl font-semibold mb-3" style={{ color: '#7B66FF' }}>Your Daily Check-in</h2>
                <MoodTracker />
              </div>
            </div>
            <div className="col-12 md:col-6">
              <ThoughtCard 
                thought="Take a deep breath. You're doing great and each step forward is progress."
                author="Mental Health Care Team"
                onShare={() => alert('Share functionality would go here')}
                onSave={() => alert('Save functionality would go here')}
              />
            </div>
            <div className="col-12 md:col-6">
              <ThoughtCard 
                thought="Self-care is not selfish. You cannot serve from an empty vessel."
                author="Eleanor Brown"
                onShare={() => alert('Share functionality would go here')}
                onSave={() => alert('Save functionality would go here')}
              />
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="surface-card p-4 shadow-2 border-round mb-4">
            <h2 className="text-xl font-semibold mb-3" style={{ color: '#7B66FF' }}>Daily Inspiration</h2>
            <QuoteDisplay />
          </div>
          
          <div className="surface-card p-4 shadow-2 border-round">
            <h2 className="text-xl font-semibold mb-3" style={{ color: '#7B66FF' }}>Upcoming Sessions</h2>
            <ul className="list-none p-0 m-0">
              <li className="flex align-items-center p-3 border-bottom-1 border-300">
                <span className="mr-3">📅</span>
                <div>
                  <span className="block font-medium">Meditation Session</span>
                  <span className="text-600 text-sm">Tomorrow, 10:00 AM</span>
                </div>
              </li>
              <li className="flex align-items-center p-3 border-bottom-1 border-300">
                <span className="mr-3">👥</span>
                <div>
                  <span className="block font-medium">Group Therapy</span>
                  <span className="text-600 text-sm">Wed, Sep 12, 3:00 PM</span>
                </div>
              </li>
              <li className="flex align-items-center p-3">
                <span className="mr-3">🧘‍♀️</span>
                <div>
                  <span className="block font-medium">Yoga for Anxiety</span>
                  <span className="text-600 text-sm">Fri, Sep 14, 5:00 PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
