import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';
import { authAPI } from '../api';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = React.useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await authAPI.login(formData);
      
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.current.show({
        severity: 'success',
        summary: 'Login Successful',
        detail: 'Welcome back!',
        life: 3000
      });
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
      
      toast.current.show({
        severity: 'error',
        summary: 'Login Failed',
        detail: errorMsg,
        life: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // In a real implementation, this would redirect to Google OAuth
    toast.current.show({
      severity: 'info',
      summary: 'Google Login',
      detail: 'Google login functionality would be implemented here',
      life: 3000
    });
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen" 
         style={{ 
           backgroundImage: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
           padding: '2rem 1rem'
         }}>
      <Toast ref={toast} position="top-center" />
      
      <div className="surface-card p-4 shadow-4 border-round w-full lg:w-6 md:w-8 mx-auto">
        <div className="text-center mb-5">
          <div className="flex align-items-center justify-content-center gap-2">
            <i className="pi pi-heart-fill text-5xl" style={{ color: '#FF5C8D' }}></i>
            <h2 className="text-3xl font-medium text-900 mb-2">Mental Health Care</h2>
          </div>
          <span className="text-600 font-medium">Sign in to continue your journey</span>
        </div>
        
        <div className="flex flex-column md:flex-row">
          <div className="w-full md:w-6 flex align-items-center justify-content-center md:pr-3 mb-4 md:mb-0">
            <div className="text-center hidden md:block">
              <Image src="https://img.freepik.com/free-vector/psychotherapy-session-psychologist-patient-talking-couch-psychology-mental-therapy-with-doctor-professional-help_284092-1120.jpg" 
                     alt="Mental Health Care" 
                     width="100%" 
                     className="border-round mb-3" />
              <h3 className="text-xl font-medium mb-2" style={{ color: '#7B66FF' }}>Welcome Back</h3>
              <p className="text-600 line-height-3">Your mental well-being is our priority.</p>
            </div>
          </div>
          
          <div className="w-full md:w-6">
            <form onSubmit={handleSubmit} className="p-fluid">
              <div className="field mb-4">
                <label htmlFor="email" className="block font-medium mb-2">Email</label>
                <span className="p-input-icon-left w-full">
                  <i className="pi pi-envelope" />
                  <InputText
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={classNames({ 'p-invalid': errors.email })}
                    placeholder="Enter your email"
                    autoComplete="username"
                  />
                </span>
                {errors.email && <small className="p-error">{errors.email}</small>}
              </div>
              
              <div className="field mb-3">
                <label htmlFor="password" className="block font-medium mb-2">Password</label>
                <span className="p-input-icon-left w-full">
                  <i className="pi pi-lock" />
                  <Password
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    toggleMask
                    className={classNames({ 'p-invalid': errors.password })}
                    feedback={false}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    inputClassName="w-full pl-3"
                  />
                </span>
                {errors.password && <small className="p-error">{errors.password}</small>}
              </div>
              
              <div className="flex justify-content-end align-items-center mb-4">
                <Link to="/forgot-password" className="font-medium no-underline" style={{ color: '#7B66FF' }}>
                  Forgot Password?
                </Link>
              </div>
              
              <Button
                type="submit"
                label={loading ? 'Logging in...' : 'Login'}
                icon="pi pi-sign-in"
                className="mb-4"
                style={{ background: '#7B66FF' }}
                loading={loading}
              />
              
              <Divider align="center">
                <span className="text-600 font-medium">OR</span>
              </Divider>
              
              <Button
                type="button"
                label="Sign in with Google"
                icon="pi pi-google"
                className="p-button-outlined mb-4"
                onClick={handleGoogleLogin}
              />
              
              <div className="text-center mt-3">
                <span className="text-600 font-medium">Don't have an account? </span>
                <Link to="/register" className="font-medium no-underline" style={{ color: '#7B66FF' }}>
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
