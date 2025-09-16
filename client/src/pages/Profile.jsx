import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressBar } from 'primereact/progressbar';
import { Chart } from 'primereact/chart';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { motion } from 'framer-motion';
import { 
  User, Edit, CheckCircle, Calendar, BarChart2, Book, 
  Heart, Award, Users, Search, PenTool, TrendingUp,
  Clock, BookOpen, Star, MessageSquare, CheckCircle2
} from 'lucide-react';

const Profile = () => {
  const toast = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);
  
  const [profile, setProfile] = useState({
    avatar: '/default-avatar.png',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Mental health advocate and wellness enthusiast. Passionate about helping others find balance and peace in their daily lives.',
    joinDate: 'September 5, 2025',
    level: 3,
    points: 1250,
    pointsToNextLevel: 2000,
    moodHistory: [
      { date: 'Sep 7', mood: 'Happy', score: 80 },
      { date: 'Sep 8', mood: 'Calm', score: 70 },
      { date: 'Sep 9', mood: 'Anxious', score: 45 },
      { date: 'Sep 10', mood: 'Stressed', score: 30 },
      { date: 'Sep 11', mood: 'Motivated', score: 85 },
      { date: 'Sep 12', mood: 'Relaxed', score: 75 },
      { date: 'Sep 13', mood: 'Energetic', score: 90 }
    ],
    achievements: [
      { name: 'First Entry', description: 'Created your first journal entry', completed: true, icon: 'pi pi-book', color: '#8cd9b3' },
      { name: 'Week Streak', description: 'Used the app for 7 consecutive days', completed: true, icon: 'pi pi-calendar', color: '#a2d6f9' },
      { name: 'Resource Explorer', description: 'Saved 5 helpful resources', completed: true, icon: 'pi pi-star', color: '#ffd8b2' },
      { name: 'Reflection Master', description: 'Completed 10 journal entries', completed: true, icon: 'pi pi-pencil', color: '#d9b3ff' },
      { name: 'Community Contributor', description: 'Made your first community post', completed: false, icon: 'pi pi-users', color: '#b3c9ff' }
    ],
    recentActivities: [
      { type: 'journal', title: 'Added a new journal entry', date: '2 hours ago', icon: 'pi pi-book' },
      { type: 'mood', title: 'Tracked your mood as Energetic', date: 'Today', icon: 'pi pi-heart-fill' },
      { type: 'resource', title: 'Saved a new resource on meditation', date: 'Yesterday', icon: 'pi pi-bookmark' },
      { type: 'community', title: 'Commented on "Coping with stress"', date: '3 days ago', icon: 'pi pi-comments' }
    ],
    recommendedResources: [
      { title: 'Mindfulness Practices for Anxiety', type: 'Article', rating: 4.8 },
      { title: 'Sleep Improvement Techniques', type: 'Video', rating: 4.5 },
      { title: 'Understanding Emotional Patterns', type: 'Podcast', rating: 4.7 }
    ]
  });

  const [editedProfile, setEditedProfile] = useState({...profile});
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Load profile data from localStorage or API
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setEditedProfile(parsedProfile);
    }
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAnimateIn(true);
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  // Chart data for mood history
  const chartData = {
    labels: profile.moodHistory.map(item => item.date),
    datasets: [
      {
        label: 'Mood Score',
        data: profile.moodHistory.map(item => item.score),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Mood Score'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 0.3,
        to: 0.4,
        loop: true
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({...profile});
    setPreviewImage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({...profile});
    setPreviewImage(null);
  };

  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleSave = () => {
    const updatedProfile = {
      ...editedProfile,
      avatar: previewImage || editedProfile.avatar
    };
    
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setIsEditing(false);
    setPreviewImage(null);
    
    // Show success notification
    setNotification({ show: true, message: 'Profile updated successfully!' });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onUpload = (event) => {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      toast.current.show({
        severity: 'info',
        summary: 'Photo Selected',
        detail: 'Your new profile photo has been selected.',
        life: 3000
      });
    }
  };

  const currentAvatar = isEditing && previewImage ? previewImage : profile.avatar;
  
  // Timeline customization
  const timelineCustomizedMarker = (item) => {
    return (
      <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: getActivityColor(item.type) }}>
        <i className={item.icon}></i>
      </span>
    );
  };
  
  const getActivityColor = (type) => {
    switch(type) {
      case 'journal': return '#8cd9b3';
      case 'mood': return '#ff9eb5';
      case 'resource': return '#a2d6f9';
      case 'community': return '#d9b3ff';
      default: return '#a2d6f9';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast component for notifications */}
      <Toast ref={toast} />
      
      {/* Notification */}
      {notification.show && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
        >
          <CheckCircle className="mr-2 h-5 w-5" />
          {notification.message}
        </motion.div>
      )}
      
      {/* Loading screen with animation */}
      {loadingProgress < 100 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-white text-3xl font-bold mb-2">Loading Your Profile</h2>
            <p className="text-blue-100 mb-8">Preparing your wellness dashboard...</p>
            <ProgressBar 
              value={loadingProgress} 
              showValue={false} 
              style={{height: '10px', width: '300px'}}
              className="mb-4" 
            />
            <motion.p 
              className="text-white text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {loadingProgress}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
      
      {/* Main content with animations */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: animateIn ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 pt-8 pb-32 px-4 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="flex justify-between items-center mb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
            >
              <h1 className="text-white text-4xl font-bold flex items-center">
                <User className="mr-3 h-8 w-8" />
                My Wellness Dashboard
              </h1>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white bg-white bg-opacity-20 px-4 py-2 rounded-lg flex items-center mr-2 backdrop-blur-sm shadow-md">
                  <Star className="mr-2 h-5 w-5 text-yellow-300 fill-yellow-300" />
                  <span className="font-medium">Level {profile.level}</span>
                </span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-white bg-opacity-10 rounded-lg p-4 mb-4 backdrop-blur-sm shadow-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center">
                <div className="mr-4 text-white">
                  <span className="block text-sm font-medium">Progress to Level {profile.level + 1}</span>
                  <span className="block font-bold text-lg">{profile.points}/{profile.pointsToNextLevel} Points</span>
                </div>
                <div className="flex-1">
                  <ProgressBar 
                    value={(profile.points/profile.pointsToNextLevel) * 100} 
                    showValue={false}
                    style={{ height: '10px' }}
                    className="bg-white bg-opacity-30"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>


        <div className="max-w-7xl mx-auto px-4 -mt-24 pb-8">
          <Card className="mb-6 shadow-lg overflow-hidden" style={{ borderRadius: '12px' }}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              <div className="md:col-span-4 p-6 bg-gray-50">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4 group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={currentAvatar}
                        alt="Profile Avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA0NkM1Ni42Mjc0IDQ2IDYyIDQwLjYyNzQgNjIgMzRDNjIgMjcuMzcyNiA1Ni42Mjc0IDIyIDUwIDIyQzQzLjM3MjYgMjIgMzggMjcuMzcyNiAzOCAzNEMzOCA0MC42Mjc0IDQzLjM3MjYgNDYgNTAgNDZaIiBmaWxsPSIjOUI5Q0E4Ii8+CjxwYXRoIGQ9Ik03MCA2NEM3MCA1Ni4yNjggNjMuNzMyIDUwIDU2IDUwSDQ0QzM2LjI2OCA1MCAzMCA1Ni4yNjggMzAgNjRWNzZINzBWNjRaIiBmaWxsPSIjOUI5Q0E4Ii8+Cjwvc3ZnPg==';
                        }}
                      />
                    </div>
                    {isEditing && (
                      <div className="absolute bottom-0 right-0">
                        <FileUpload
                          mode="basic"
                          name="avatar"
                          accept="image/*"
                          maxFileSize={1000000}
                          onUpload={onUpload}
                          auto
                          chooseLabel=""
                          chooseOptions={{ icon: 'pi pi-camera', className: 'p-button-rounded p-button-info p-button-sm' }}
                        />
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mt-2">{profile.name}</h2>
                  <p className="text-gray-500 mb-1">{profile.email}</p>
                  <p className="text-sm text-gray-500 mb-4">Member since {profile.joinDate}</p>
                  
                  {!isEditing && (
                    <Button 
                      label="Edit Profile" 
                      icon="pi pi-user-edit" 
                      onClick={handleEdit} 
                      className="p-button-rounded p-button-info"
                    />
                  )}
                  
                  <div className="mt-8 w-full">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <BarChart2 className="h-4 w-4 mr-2 text-blue-500" />
                      Activity Stats
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-xl font-bold text-blue-600">7</div>
                        <div className="text-xs text-gray-600">Days Active</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-xl font-bold text-purple-600">12</div>
                        <div className="text-xs text-gray-600">Journals</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-xl font-bold text-green-600">5</div>
                        <div className="text-xs text-gray-600">Resources</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 w-full">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {profile.recentActivities.map((item, index) => (
                        <div key={index} className="flex p-2 border-l-2 ml-2" style={{ borderLeftColor: getActivityColor(item.type) }}>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" 
                               style={{ backgroundColor: getActivityColor(item.type) + '30' }}>
                            <i className={item.icon} style={{ color: getActivityColor(item.type) }}></i>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">{item.title}</span>
                            <p className="text-gray-500 text-xs">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-8 p-6">
                <div className="mb-6 border-b border-gray-200">
                  <div className="flex">
                    <button 
                      className={`px-4 py-2 font-medium ${activeTab === 0 
                        ? 'border-b-2 border-blue-500 text-blue-500' 
                        : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab(0)}
                    >
                      Overview
                    </button>
                    <button 
                      className={`px-4 py-2 font-medium ${activeTab === 1 
                        ? 'border-b-2 border-blue-500 text-blue-500' 
                        : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab(1)}
                    >
                      Achievements
                    </button>
                    <button 
                      className={`px-4 py-2 font-medium ${activeTab === 2 
                        ? 'border-b-2 border-blue-500 text-blue-500' 
                        : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab(2)}
                    >
                      Mood History
                    </button>
                  </div>
                </div>
                
                {activeTab === 0 && (
                  !isEditing ? (
                    <div>
                      <Card className="mb-4">
                        <div className="flex items-center mb-4">
                          <i className="pi pi-user text-xl text-blue-500 mr-2"></i>
                          <h3 className="text-xl font-semibold text-gray-800">About Me</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-2">{profile.bio}</p>
                      </Card>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                            <i className="pi pi-chart-bar text-blue-500 mr-2"></i>
                            Mood Overview
                          </h3>
                          <Button 
                            label="Track Today" 
                            icon="pi pi-plus" 
                            className="p-button-sm p-button-outlined p-button-info"
                          />
                        </div>
                        
                        <div className="bg-white border rounded-lg p-4" style={{ height: '260px' }}>
                          <Chart type="line" data={chartData} options={chartOptions} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800">Recommended Resources</h3>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">New</span>
                          </div>
                          <div className="space-y-3">
                            {profile.recommendedResources.map((resource, i) => (
                              <div key={i} className="flex justify-between p-2 hover:bg-gray-50 rounded-md">
                                <div>
                                  <p className="font-medium text-gray-800">{resource.title}</p>
                                  <span className="text-xs text-gray-500">{resource.type}</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-sm text-yellow-500 mr-1">{resource.rating}</span>
                                  <i className="pi pi-star-fill text-yellow-500 text-sm"></i>
                                </div>
                              </div>
                            ))}
                          </div>
                          <hr className="my-3" />
                          <Button 
                            label="Explore More" 
                            className="p-button-text p-button-info w-full"
                            icon="pi pi-external-link"
                          />
                        </Card>
                        
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800">Journal Summary</h3>
                            <Button 
                              icon="pi pi-pencil" 
                              className="p-button-rounded p-button-text p-button-sm"
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="flex justify-between mb-1">
                                <span className="text-blue-800 font-medium">Weekly Stats</span>
                                <span className="text-xs text-blue-600">Last 7 days</span>
                              </div>
                              <div className="grid grid-cols-2 gap-3 text-center mt-3">
                                <div>
                                  <p className="text-2xl font-bold text-blue-700">3</p>
                                  <p className="text-xs text-blue-600">Entries</p>
                                </div>
                                <div>
                                  <p className="text-2xl font-bold text-green-600">75%</p>
                                  <p className="text-xs text-green-600">Positive</p>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              Most frequent emotions: <span className="font-medium">Grateful, Calm, Hopeful</span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Top theme: <span className="font-medium">Personal Growth</span>
                            </p>
                          </div>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <i className="pi pi-user-edit mr-2 text-blue-500"></i>
                        Edit Your Profile
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Full Name
                          </label>
                          <InputText
                            id="name"
                            name="name"
                            value={editedProfile.name}
                            onChange={handleInputChange}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email Address
                          </label>
                          <InputText
                            id="email"
                            name="email"
                            value={editedProfile.email}
                            onChange={handleInputChange}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">
                          Bio
                        </label>
                        <InputTextarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={editedProfile.bio}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          label="Save Changes"
                          icon="pi pi-check"
                          onClick={handleSave}
                          className="p-button-success"
                        />
                        <Button
                          label="Cancel"
                          icon="pi pi-times"
                          onClick={handleCancel}
                          className="p-button-secondary"
                        />
                      </div>
                    </div>
                  )
                )}
                
                {activeTab === 1 && (
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                        <i className="pi pi-trophy text-yellow-500 mr-2"></i>
                        Your Achievements
                      </h3>
                      <div className="bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        {profile.achievements.filter(a => a.completed).length}/{profile.achievements.length} Completed
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profile.achievements.map((achievement, index) => (
                        <div 
                          key={index} 
                          className={`border rounded-lg p-4 flex items-center transition-all duration-300 ${
                            achievement.completed 
                              ? 'shadow-md border-l-4 hover:shadow-lg' 
                              : 'opacity-70 hover:opacity-100'
                          }`}
                          style={{ borderLeftColor: achievement.completed ? achievement.color : 'transparent' }}
                        >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" 
                            style={{ 
                              backgroundColor: achievement.completed ? `${achievement.color}30` : '#f3f4f6',
                              color: achievement.completed ? achievement.color : '#9ca3af'
                            }}
                          >
                            <i className={`${achievement.icon} text-xl`}></i>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 flex items-center">
                              {achievement.name}
                              {achievement.completed && (
                                <i className="pi pi-check-circle ml-2 text-green-500 text-sm"></i>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                      <Button 
                        label="View All Achievements" 
                        icon="pi pi-list" 
                        className="p-button-outlined p-button-secondary"
                      />
                    </div>
                  </div>
                )}
                
                {activeTab === 2 && (
                  <div>
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                          <i className="pi pi-heart-fill text-pink-500 mr-2"></i>
                          Mood Insights
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            icon="pi pi-calendar"
                            className="p-button-text p-button-sm"
                          />
                          <Button
                            icon="pi pi-sliders-h"
                            className="p-button-text p-button-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-white border rounded-lg p-4" style={{ height: '300px' }}>
                        <Chart type="line" data={chartData} options={chartOptions} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                        <div className="text-center p-3">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Weekly Mood Average</h3>
                          <div className="text-4xl font-bold text-blue-600 mb-1">78%</div>
                          <p className="text-sm text-blue-800">7% better than last week</p>
                          
                          <div className="mt-3 flex justify-center gap-2">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              <i className="pi pi-arrow-up mr-1"></i>
                              Improving
                            </span>
                          </div>
                        </div>
                      </Card>
                      
                      <Card>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Tips Based on Your Mood</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <i className="pi pi-check-circle text-green-500 mr-2 mt-0.5"></i>
                            <span className="text-sm text-gray-700">Continue your mindfulness practice during morning hours</span>
                          </li>
                          <li className="flex items-start">
                            <i className="pi pi-check-circle text-green-500 mr-2 mt-0.5"></i>
                            <span className="text-sm text-gray-700">Consider reducing screen time before bed</span>
                          </li>
                          <li className="flex items-start">
                            <i className="pi pi-check-circle text-green-500 mr-2 mt-0.5"></i>
                            <span className="text-sm text-gray-700">Your mood improves after journaling - keep it up!</span>
                          </li>
                        </ul>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="inline-block p-3 rounded-full mb-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                  <i className="pi pi-book text-2xl text-blue-500"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Journal</h3>
                <p className="text-sm text-gray-600 mb-4">Record your thoughts and track your emotional journey</p>
                <Button label="Write Now" icon="pi pi-pencil" className="p-button-outlined p-button-info" />
              </div>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="inline-block p-3 rounded-full mb-4" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                  <i className="pi pi-users text-2xl text-purple-500"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Community</h3>
                <p className="text-sm text-gray-600 mb-4">Connect with others and share your experiences</p>
                <Button label="Explore" icon="pi pi-comments" className="p-button-outlined p-button-secondary" />
              </div>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="inline-block p-3 rounded-full mb-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                  <i className="pi pi-heart text-2xl text-green-500"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Resources</h3>
                <p className="text-sm text-gray-600 mb-4">Explore helpful articles, videos and exercises</p>
                <Button label="Browse" icon="pi pi-search" className="p-button-outlined p-button-success" />
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
