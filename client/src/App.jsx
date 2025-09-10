import React, { useState, useEffect } from 'react'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  useNavigate,
  useLocation,
  Link
} from 'react-router-dom'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import { Menu } from 'primereact/menu';

import LoginForm from './pages/LoginForm.jsx'
import RegistrationForm from './pages/RegistrationForm.jsx'
import { ThoughtCard, MoodTracker, QuoteDisplay } from './components'

// PrimeReact CSS
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// Protected route component
const ProtectedRoute = ({ element, path }) => {
  const isLoggedIn = localStorage.getItem('token') !== null;
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return element;
};

// Layout component with navigation
const AppLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => navigate('/dashboard')
    },
    {
      label: 'Journal',
      icon: 'pi pi-book',
      command: () => navigate('/journal')
    },
    {
      label: 'Resources',
      icon: 'pi pi-info-circle',
      command: () => navigate('/resources')
    },
    {
      label: 'Community',
      icon: 'pi pi-users',
      command: () => navigate('/community')
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => navigate('/settings')
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-power-off',
      command: handleLogout
    }
  ];
  
  const navbarItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => navigate('/dashboard')
    },
    {
      label: 'Services',
      icon: 'pi pi-heart',
      items: [
        {
          label: 'Mood Tracking',
          icon: 'pi pi-chart-line',
          command: () => navigate('/mood-tracking')
        },
        {
          label: 'Journaling',
          icon: 'pi pi-pencil',
          command: () => navigate('/journal')
        },
        {
          label: 'Meditation',
          icon: 'pi pi-moon',
          command: () => navigate('/meditation')
        }
      ]
    },
    {
      label: 'Resources',
      icon: 'pi pi-book',
      command: () => navigate('/resources')
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope',
      command: () => navigate('/contact')
    }
  ];
  
  const navbarEnd = () => {
    return (
      <div className="flex align-items-center gap-2">
        {user ? (
          <>
            <Button 
              icon="pi pi-bell" 
              className="p-button-rounded p-button-text p-button-plain" 
            />
            <Avatar 
              label={user.fullName?.charAt(0) || "U"} 
              style={{ backgroundColor: '#7B66FF', color: '#ffffff' }} 
              shape="circle"
              onClick={() => setSidebarVisible(true)}
              className="cursor-pointer"
            />
          </>
        ) : (
          <Button 
            label="Login" 
            icon="pi pi-sign-in" 
            onClick={() => navigate('/login')} 
          />
        )}
      </div>
    );
  };
  
  // Don't show the header on login/register pages
  const hideNavigation = ['/login', '/register'].includes(location.pathname);
  
  return (
    <>
      {!hideNavigation && (
        <header className="shadow-2">
          <Menubar model={navbarItems} end={navbarEnd} className="border-none" />
        </header>
      )}
      
      <Sidebar 
        visible={sidebarVisible} 
        position="right" 
        onHide={() => setSidebarVisible(false)}
        className="w-full md:w-20rem"
      >
        <div className="flex flex-column align-items-center p-4 border-bottom-1 border-300">
          <Avatar 
            label={user?.fullName?.charAt(0) || "U"} 
            style={{ backgroundColor: '#7B66FF', color: '#ffffff' }} 
            shape="circle"
            size="large"
            className="mb-2"
          />
          <h3 className="m-0">{user?.fullName || "User"}</h3>
          <p className="text-sm text-600 mt-1">{user?.email}</p>
        </div>
        
        <Menu model={menuItems} className="w-full border-none" />
      </Sidebar>
      
      <main className="flex-grow-1">
        {children}
      </main>
      
      {!hideNavigation && (
        <footer className="bg-gray-800 text-white p-4 mt-auto">
          <div className="grid">
            <div className="col-12 md:col-4">
              <h3 className="text-xl mb-3">Mental Health Care</h3>
              <p className="line-height-3">
                Providing tools and resources for your mental wellbeing journey.
              </p>
            </div>
            <div className="col-12 md:col-4">
              <h3 className="text-xl mb-3">Quick Links</h3>
              <ul className="list-none p-0 m-0">
                <li className="mb-2"><Link to="/about" className="text-white hover:text-primary">About Us</Link></li>
                <li className="mb-2"><Link to="/services" className="text-white hover:text-primary">Services</Link></li>
                <li className="mb-2"><Link to="/resources" className="text-white hover:text-primary">Resources</Link></li>
                <li className="mb-2"><Link to="/contact" className="text-white hover:text-primary">Contact Us</Link></li>
              </ul>
            </div>
            <div className="col-12 md:col-4">
              <h3 className="text-xl mb-3">Emergency Contact</h3>
              <p className="line-height-3">
                If you're experiencing a mental health crisis, please call:
              </p>
              <p className="text-xl font-bold">988 - Crisis Lifeline</p>
            </div>
          </div>
          <div className="border-top-1 border-gray-700 mt-3 pt-3 text-center">
            <p className="text-sm">© 2025 Mental Health Care. All rights reserved.</p>
          </div>
        </footer>
      )}
    </>
  );
};

// Dashboard Component
const Dashboard = () => {
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

// Journal Page
const Journal = () => (
  <div className="p-4">
    <h1 className="text-3xl mb-4" style={{ color: '#7B66FF' }}>Journal</h1>
    <p>This is the journal page (placeholder)</p>
  </div>
);

// Resources Page
const Resources = () => (
  <div className="p-4">
    <h1 className="text-3xl mb-4" style={{ color: '#7B66FF' }}>Resources</h1>
    <p>This is the resources page (placeholder)</p>
  </div>
);

// Community Page
const Community = () => (
  <div className="p-4">
    <h1 className="text-3xl mb-4" style={{ color: '#7B66FF' }}>Community</h1>
    <p>This is the community page (placeholder)</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute 
              element={
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              }
            />
          } 
        />
        
        <Route 
          path="/journal" 
          element={
            <ProtectedRoute 
              element={
                <AppLayout>
                  <Journal />
                </AppLayout>
              }
            />
          } 
        />
        
        <Route 
          path="/resources" 
          element={
            <ProtectedRoute 
              element={
                <AppLayout>
                  <Resources />
                </AppLayout>
              }
            />
          } 
        />
        
        <Route 
          path="/community" 
          element={
            <ProtectedRoute 
              element={
                <AppLayout>
                  <Community />
                </AppLayout>
              }
            />
          } 
        />
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App