import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Chip } from 'primereact/chip';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { motion } from 'framer-motion';
import {
  Search,
  Star,
  Brain,
  Heart,
  Coffee,
  Moon,
  Users,
  BookOpen,
  Clock,
  Compass,
  BrainCircuit,
  Timer,
  Laugh,
  Focus,
  Zap,
  Sparkles,
  Smile,
  PhoneCall,
  Smartphone,
  Laptop,
  Flame,
  Sunrise,
  Instagram,
  Twitter,
  Facebook,
  ExternalLink,
  Mail,
  MessageSquare
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 }
};

function MentalHealthTips() {
  const toast = useRef(null);

  // Search, filter, and data
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredTips, setFilteredTips] = useState([]);
  const [savedTips, setSavedTips] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);

  const categories = [
    { name: 'all', label: 'All' },
    { name: 'focus', label: 'Focus' },
    { name: 'sleep', label: 'Sleep' },
    { name: 'study', label: 'Study' },
    { name: 'stress', label: 'Stress' },
    { name: 'wellness', label: 'Wellness' },
    { name: 'social', label: 'Social' }
  ];

  const iconColor = 'var(--primary-color)';

  const allTips = [
    {
      id: 1,
      icon: <Brain size={40} color={iconColor} />,
      title: 'Mindful Minute',
      description: 'Pause for a minute. Breathe deeply and notice your surroundings to reset your focus.',
      categories: ['focus', 'wellness'],
      difficulty: 'easy'
    },
    {
      id: 2,
      icon: <Heart size={40} color={iconColor} />,
      title: 'Self-Compassion',
      description: 'Talk to yourself like you would to a good friend. Be kind and patient.',
      categories: ['wellness'],
      difficulty: 'easy'
    },
    {
      id: 3,
      icon: <Coffee size={40} color={iconColor} />,
      title: 'Caffeine Balance',
      description: 'Limit caffeine after mid-afternoon to improve sleep and reduce anxiety.',
      categories: ['wellness'],
      difficulty: 'easy'
    },
    {
      id: 4,
      icon: <Moon size={40} color={iconColor} />,
      title: 'Sleep Hygiene',
      description: 'Aim for 7–9 hours. Keep a consistent sleep schedule, even on weekends.',
      categories: ['sleep', 'wellness'],
      difficulty: 'medium'
    },
    {
      id: 5,
      icon: <Users size={40} color={iconColor} />,
      title: 'Stay Connected',
      description: 'Reach out to friends or family regularly; social support buffers stress.',
      categories: ['social', 'wellness'],
      difficulty: 'medium'
    },
    {
      id: 6,
      icon: <BookOpen size={40} color={iconColor} />,
      title: 'Mindful Learning',
      description: 'Study with intention and take short breaks to retain more.',
      categories: ['study', 'stress'],
      difficulty: 'hard'
    },
    {
      id: 7,
      icon: <Clock size={40} color={iconColor} />,
      title: 'Time Boxing',
      description: 'Break big tasks into 25-minute sprints (Pomodoro) with 5-minute breaks.',
      categories: ['study', 'stress'],
      difficulty: 'hard'
    },
    {
      id: 8,
      icon: <Compass size={40} color={iconColor} />,
      title: 'Purpose Check',
      description: 'Connect your studies to personal goals to stay motivated.',
      categories: ['study', 'wellness'],
      difficulty: 'hard'
    },
    {
      id: 9,
      icon: <BrainCircuit size={40} color={iconColor} />,
      title: 'Cognitive Breaks',
      description: 'Short mental breaks reduce fatigue and improve retention.',
      categories: ['study', 'stress'],
      difficulty: 'easy'
    },
    {
      id: 10,
      icon: <Timer size={40} color={iconColor} />,
      title: 'Morning Routine',
      description: 'Start with 10 minutes of planning, journaling, or meditation.',
      categories: ['wellness', 'sleep'],
      difficulty: 'medium'
    },
    {
      id: 11,
      icon: <Laugh size={40} color={iconColor} />,
      title: 'Laugh Daily',
      description: 'Humor reduces stress. Watch or read something that makes you laugh.',
      categories: ['wellness', 'social'],
      difficulty: 'easy'
    },
    {
      id: 12,
      icon: <Focus size={40} color={iconColor} />,
      title: 'Digital Detox',
      description: 'Schedule screen breaks to reduce overload and improve focus.',
      categories: ['wellness', 'stress'],
      difficulty: 'hard'
    }
  ];

  const quickTips = [
    { icon: <Zap size={22} color={iconColor} />, title: '4-7-8 Breathing', description: 'Inhale 4s, hold 7s, exhale 8s. Repeat 4 times.' },
    { icon: <Sparkles size={22} color={iconColor} />, title: '5 Senses', description: 'Name 5 see, 4 feel, 3 hear, 2 smell, 1 taste.' },
    { icon: <Smile size={22} color={iconColor} />, title: 'Smile Practice', description: 'Hold a genuine smile for 30 seconds and notice the shift.' }
  ];

  const resources = [
    { title: 'Campus Counseling', description: 'Free, confidential support for all students.', actionLabel: 'Schedule', icon: <PhoneCall size={18} />, link: '#counseling' },
    { title: 'Crisis Hotlines', description: '24/7 support when you need someone to talk to.', actionLabel: 'Save Contacts', icon: <Smartphone size={18} />, link: '#hotlines' },
    { title: 'Wellness Apps', description: 'Tools for meditation, sleep, and anxiety management.', actionLabel: 'Recommended Apps', icon: <Smartphone size={18} />, link: '#apps' },
    { title: 'Mental Health Workshops', description: 'Free online and in-person workshops on key topics.', actionLabel: 'View Schedule', icon: <Laptop size={18} />, link: '#workshops' }
  ];

  const stories = [
    { name: 'Aisha M.', program: 'Computer Science', quote: 'Mindfulness helped me manage exam stress and feel in control.', image: 'https://randomuser.me/api/portraits/women/32.jpg' },
    { name: 'James L.', program: 'Business Administration', quote: 'Counseling services supported me through a tough time.', image: 'https://randomuser.me/api/portraits/men/54.jpg' },
    { name: 'Sofia R.', program: 'Psychology', quote: 'A self-care routine transformed my college experience.', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Raj P.', program: 'Engineering', quote: 'Prioritizing sleep during exams improved my grades.', image: 'https://randomuser.me/api/portraits/men/22.jpg' }
  ];

  const dailyChallenges = [
    'Take a 15-minute nature walk today.',
    'Write down three things you are grateful for.',
    'Try a new 5-minute meditation.',
    'Message a friend you have not talked to recently.',
    'Drink 8 glasses of water today.',
    'Tidy your study space for 10 minutes.',
    "Say 'no' to one optional commitment."
  ];

  const [dailyChallenge, setDailyChallenge] = useState('');
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * dailyChallenges.length);
    setDailyChallenge(dailyChallenges[randomIndex]);
  }, []);

  useEffect(() => {
    let results = allTips.filter((tip) => tip && tip.title && tip.description && Array.isArray(tip.categories));

    if (activeCategory !== 'all') {
      results = results.filter((tip) => tip.categories.includes(activeCategory));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter((tip) => tip.title.toLowerCase().includes(q) || tip.description.toLowerCase().includes(q));
    }

    setFilteredTips(results);
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    setFilteredTips(allTips);
    const saved = localStorage.getItem('savedMentalHealthTips');
    if (saved) setSavedTips(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('savedMentalHealthTips', JSON.stringify(savedTips));
  }, [savedTips]);

  const handleSaveTip = (tipId) => {
    if (savedTips.includes(tipId)) {
      setSavedTips((prev) => prev.filter((id) => id !== tipId));
      toast.current?.show({ severity: 'info', summary: 'Tip Removed', detail: 'Removed from saved tips', life: 2500 });
    } else {
      setSavedTips((prev) => [...prev, tipId]);
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 800);
      toast.current?.show({ severity: 'success', summary: 'Tip Saved', detail: 'Added to saved tips', life: 2500 });
    }
  };

  const difficultySeverity = (d) => (d === 'easy' ? 'success' : d === 'medium' ? 'warning' : 'danger');

  const storyTemplate = (story) => (
    <motion.div className="p-3" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Card>
        <div className="flex flex-column md:flex-row align-items-start md:align-items-center gap-3">
          <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <img src={story.image} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80'; }} />
          </div>
          <div>
            <p className="text-600" style={{ fontStyle: 'italic' }}>
              “{story.quote}”
            </p>
            <div className="mt-2">
              <div className="font-bold text-900">{story.name}</div>
              <div className="text-600" style={{ fontSize: 12 }}>{story.program}</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.observe-me').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="surface-ground p-4">
      <Toast ref={toast} />

      {/* Hero */}
      <motion.section className="py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="text-center">
          <motion.h1 className="font-bold text-900" style={{ fontSize: 36 }} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            Take care of your mind,
            <br />
            <span style={{ color: 'var(--primary-color)' }}>succeed in your studies.</span>
          </motion.h1>
          <motion.p className="text-700" style={{ maxWidth: 720, margin: '0 auto' }} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            Mental wellness is the foundation of academic success. Explore tips, resources, and strategies to keep balance.
          </motion.p>
        </div>
      </motion.section>

      {/* Quick Tips */}
      <section className="surface-section p-4 border-round">
        <div className="text-center mb-4">
          <h2 className="font-bold text-900" style={{ fontSize: 24 }}>Need Relief Right Now?</h2>
          <p className="text-700">These quick techniques take less than 60 seconds and can help reduce stress.</p>
        </div>
        <div className="flex flex-column gap-3" style={{ maxWidth: 720, margin: '0 auto' }}>
          {quickTips.map((tip, i) => (
            <motion.div key={i} className="surface-50 border-1 surface-border p-3 border-round" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex flex-column align-items-center text-center" style={{ minHeight: 120 }}>
                <div className="mb-2">{tip.icon}</div>
                <div className="font-semibold text-900" style={{ fontSize: 18 }}>{tip.title}</div>
                <div className="text-700" style={{ maxWidth: 480 }}>{tip.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tips Search & Filter */}
      <section id="tips-section" className="p-4 surface-section border-round mt-5">
        <div className="text-center mb-4 observe-me">
          <h2 className="font-bold text-900" style={{ fontSize: 24 }}>Tips for Mental Wellness</h2>
          <p className="text-700" style={{ maxWidth: 720, margin: '0 auto' }}>
            Simple strategies to maintain your mental health while navigating academic challenges.
          </p>

          {/* Search */}
          <div className="mt-3" style={{ maxWidth: 640, margin: '0 auto' }}>
            <span className="p-input-icon-left w-full">
              <i className="pi pi-search" />
              <InputText value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full" />
            </span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-content-center align-items-center gap-2 mt-3">
            {categories.map((category) => (
              <motion.div key={category.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Chip
                  label={category.label}
                  className="cursor-pointer"
                  onClick={() => setActiveCategory(category.name)}
                  style={{
                    background: activeCategory === category.name ? 'var(--primary-color)' : 'var(--surface-200)',
                    color: activeCategory === category.name ? 'var(--primary-color-text)' : 'var(--text-color)'
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips grid (2 per row) */}
        {filteredTips.length > 0 ? (
          <motion.div className="grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {filteredTips.map((tip) => (
              <motion.div key={tip.id} className="col-12 md:col-6" variants={itemVariants} whileHover={{ y: -4 }}>
                <div style={{ height: '100%' }} className="flex flex-column">
                  <Card style={{ height: '100%' }}>
                    <div className="flex justify-content-between align-items-start mb-3">
                      <div>{tip.icon}</div>
                      <Tag value={tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)} severity={difficultySeverity(tip.difficulty)} />
                    </div>
                    <div className="font-bold text-900" style={{ fontSize: 18, marginBottom: 8 }}>{tip.title}</div>
                    <div className="text-700" style={{ marginBottom: 12 }}>{tip.description}</div>
                    <div className="flex justify-content-between align-items-center" style={{ marginTop: 'auto' }}>
                      <div className="flex flex-wrap gap-2">
                        {tip.categories.map((c) => (
                          <Tag key={`${tip.id}-${c}`} value={c} severity="info" />
                        ))}
                      </div>
                      <Button onClick={() => handleSaveTip(tip.id)} rounded text severity="secondary" aria-label="save">
                        <Star size={16} color={savedTips.includes(tip.id) ? 'var(--primary-color)' : 'var(--text-color-secondary)'} fill={savedTips.includes(tip.id) ? 'var(--primary-color)' : 'none'} />
                      </Button>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="text-center">
            <div className="flex flex-column align-items-center">
              <Search size={36} color="var(--text-color-secondary)" />
              <div className="font-medium text-900" style={{ marginTop: 8 }}>No tips found</div>
              <div className="text-700">Try a different search term or category.</div>
              <Button label="Reset filters" className="mt-3" outlined onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} />
            </div>
          </Card>
        )}

        {/* Saved tips */}
        {savedTips.length > 0 && (
          <motion.div className="surface-section border-round p-3 mt-5" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex align-items-center mb-3">
              <div className="text-900 font-bold" style={{ fontSize: 20 }}>Your Saved Tips</div>
              <Tag value={String(savedTips.length)} className="ml-2" severity="info" />
            </div>
            <div className="grid">
              {allTips.filter((t) => savedTips.includes(t.id)).map((t) => (
                <div key={`saved-${t.id}`} className="col-12">
                  <div className="flex align-items-center justify-content-between border-bottom-1 surface-border pb-2">
                    <div className="flex align-items-center gap-2">
                      <div>{t.icon}</div>
                      <div>
                        <div className="font-medium text-900">{t.title}</div>
                        <div className="text-700" style={{ fontSize: 12 }}>{t.description}</div>
                      </div>
                    </div>
                    <Button rounded text onClick={() => handleSaveTip(t.id)}>
                      <Star size={16} color={'var(--primary-color)'} fill={'var(--primary-color)'} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-content-end mt-3">
              <Button label="Clear all saved tips" icon="pi pi-trash" text severity="danger" onClick={() => { setSavedTips([]); localStorage.removeItem('savedMentalHealthTips'); toast.current?.show({ severity: 'info', summary: 'All Cleared', detail: 'Removed saved tips', life: 2500 }); }} />
            </div>
          </motion.div>
        )}
      </section>

      {/* Resources */}
      <section className="surface-section border-round p-4 mt-5">
        <div className="text-center mb-4 observe-me">
          <h2 className="font-bold text-900" style={{ fontSize: 24 }}>Helpful Resources</h2>
          <p className="text-700">You're not alone. Connect with these resources for additional support.</p>
        </div>
        <div className="grid">
          {resources.map((resource, i) => (
            <motion.div key={i} className="col-12 md:col-6" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card>
                <div className="flex flex-column" style={{ height: '100%' }}>
                  <div className="flex-1">
                    <div className="flex align-items-center mb-2 gap-2">
                      <div className="p-2 border-round surface-100">{resource.icon}</div>
                      <div className="font-bold text-900" style={{ fontSize: 18 }}>{resource.title}</div>
                    </div>
                    <div className="text-700">{resource.description}</div>
                  </div>
                  <div className="mt-3">
                    <Button label={resource.actionLabel} icon="pi pi-external-link" outlined onClick={() => (window.location.href = resource.link)} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Student Stories */}
      <section className="surface-section border-round p-4 mt-5">
        <div className="text-center mb-4 observe-me">
          <h2 className="font-bold text-900" style={{ fontSize: 24 }}>Student Stories</h2>
          <p className="text-700">Real experiences from students who prioritized their mental health.</p>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Carousel value={stories} itemTemplate={storyTemplate} numVisible={1} numScroll={1} style={{ maxWidth: 720, margin: '0 auto' }} />
        </motion.div>
        <div className="text-center mt-4">
          <Button label="Share Your Story" icon="pi pi-comments" outlined onClick={() => toast.current?.show({ severity: 'info', summary: 'Coming Soon', detail: 'This feature will be available soon!', life: 2500 })} />
        </div>
      </section>

      {/* Self-assessment */}
      <section className="surface-section border-round p-4 mt-5">
        <div className="text-center mb-3 observe-me">
          <h2 className="font-bold text-900" style={{ fontSize: 24 }}>Wellness Self-Check</h2>
          <p className="text-700">Take a moment to reflect on your current mental well-being.</p>
        </div>
        <motion.div className="border-round" style={{ background: 'linear-gradient(90deg, var(--primary-color), var(--primary-600))', color: 'var(--primary-color-text)' }} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="p-4">
            <div className="flex flex-column md:flex-row align-items-center gap-3">
              <div className="mr-0 md:mr-3">
                <Sunrise size={64} color={'#FDE047'} />
              </div>
              <div>
                <div className="font-bold" style={{ fontSize: 20, marginBottom: 6 }}>How are you feeling today?</div>
                <div className="text-100" style={{ marginBottom: 12 }}>Regular self-assessment helps you stay aware of your mental health needs and recognize when to seek support.</div>
                <Button label="Take the Assessment" icon="pi pi-chart-bar" outlined onClick={() => toast.current?.show({ severity: 'info', summary: 'Coming Soon', detail: 'Self-assessment arrives in the next update!', life: 2500 })} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Call To Action */}
      <section className="p-4 border-round mt-5" style={{ background: 'linear-gradient(90deg, var(--primary-600), var(--primary-400))', color: 'var(--primary-color-text)' }}>
        <div className="text-center">
          <motion.h2 className="font-bold" style={{ fontSize: 24 }} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Don't wait to reach out for help
          </motion.h2>
          <motion.p className="mt-2" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Your mental health matters. Support is available whenever you need it.
          </motion.p>
          <div className="mt-3">
            <Button label="Connect with a Counselor" icon="pi pi-heart" outlined />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="surface-900 text-0 p-4 mt-5">
        <div className="grid">
          <div className="col-12 md:col-4">
            <div className="font-bold mb-2">Student Mental Health</div>
            <div className="text-300 mb-2">Resources and support for students navigating academic stress and life challenges.</div>
            <div className="flex gap-3">
              <a href="#" className="text-0">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-0">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-0">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="font-bold mb-2">Quick Links</div>
            <ul className="p-0 m-0" style={{ listStyle: 'none' }}>
              <li className="mb-2"><a href="#" className="text-300"><ExternalLink size={14} />&nbsp;Campus Counseling Center</a></li>
              <li className="mb-2"><a href="#" className="text-300"><ExternalLink size={14} />&nbsp;Crisis Support Resources</a></li>
              <li className="mb-2"><a href="#" className="text-300"><ExternalLink size={14} />&nbsp;Wellness Workshops</a></li>
            </ul>
          </div>
          <div className="col-12 md:col-4">
            <div className="font-bold mb-2">Contact Us</div>
            <ul className="p-0 m-0" style={{ listStyle: 'none' }}>
              <li className="mb-2 flex align-items-center"><PhoneCall size={16} color={'var(--primary-400)'} />&nbsp;<span>24/7 Crisis Line: (555) 123-4567</span></li>
              <li className="mb-2 flex align-items-center"><Mail size={16} color={'var(--primary-400)'} />&nbsp;<span>counseling@university.edu</span></li>
              <li className="mb-2 flex align-items-center"><MessageSquare size={16} color={'var(--primary-400)'} />&nbsp;<span>Live chat weekdays 9AM–5PM</span></li>
            </ul>
          </div>
        </div>
        <div className="border-top-1 surface-border mt-3 pt-3 text-center text-300" style={{ fontSize: 12 }}>
          © {new Date().getFullYear()} Student Mental Health Initiative. All rights reserved.
        </div>
      </footer>

      {/* Simple fade-in animation (non-Tailwind) */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn .6s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default MentalHealthTips;
