import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';
import { authAPI } from '../api';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const toast = React.useRef(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: null,
    gender: null,
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
    { label: 'Prefer not to say', value: 'Prefer not to say' }
  ];
  
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
  
  const handleDateChange = (e) => {
    setFormData(prev => ({
      ...prev,
      dateOfBirth: e.value
    }));
    
    // Clear error
    if (errors.dateOfBirth) {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: ''
      }));
    }
  };
  
  const handleGenderChange = (e) => {
    setFormData(prev => ({
      ...prev,
      gender: e.value
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber.replace(/[^0-9]/g, ''))) {
      newErrors.phoneNumber = 'Phone number is invalid';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    
    // Remove confirmPassword from data sent to server
    const { confirmPassword, ...submissionData } = formData;
    
    try {
      const response = await authAPI.register(submissionData);
      
      toast.current.show({
        severity: 'success',
        summary: 'Registration Successful',
        detail: 'Your account has been created successfully!',
        life: 3000
      });
      
      // Save token to localStorage - fetch API returns the response body directly
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Redirect to dashboard after successful registration
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      
      toast.current.show({
        severity: 'error',
        summary: 'Registration Failed',
        detail: errorMsg,
        life: 5000
      });
    } finally {
      setLoading(false);
    }
  };
  
  const passwordHeader = <h6>Password Requirements</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Password must be at least 6 characters and include:</p>
  <ul className="pl-2 ml-2 mt-0 leading-relaxed">
        <li>At least one lowercase letter</li>
        <li>At least one uppercase letter</li>
        <li>At least one number</li>
        <li>At least one special character</li>
      </ul>
    </React.Fragment>
  );
  
  return (
    <div className="flex justify-center items-center min-h-screen" 
         style={{ 
           backgroundImage: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
           padding: '2rem 1rem'
         }}>
      <Toast ref={toast} position="top-center" />
      
      <div className="bg-white p-4 shadow rounded w-full lg:w-2/3 md:w-4/5 mx-auto">
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2">
            <i className="pi pi-heart-fill text-5xl text-primary" style={{ color: '#FF5C8D' }}></i>
            <h2 className="text-3xl font-medium text-gray-900 mb-2">Mental Health Care</h2>
          </div>
          <span className="text-gray-600 font-medium">Create your account to get started</span>
        </div>
        
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-5 flex flex-col items-center justify-center md:pr-3 mb-4 md:mb-0">
            <div className="mb-4 hidden md:block" style={{ maxWidth: '90%' }}>
              <Image src="https://img.freepik.com/free-vector/mental-health-awareness-concept_23-2148514643.jpg" alt="Mental Health Care" width="100%" className="rounded" />
            </div>
            <div className="text-center hidden md:block">
              <h3 className="text-xl text-primary font-medium mb-2">Take care of your mind</h3>
              <p className="text-gray-600 leading-relaxed">Join our community and start your journey to mental wellness today.</p>
            </div>
          </div>
          
          <div className="w-full md:w-7">
            <form onSubmit={handleSubmit} className="p-fluid">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="fullName" className="block font-medium mb-2">Full Name *</label>
                  <span className="p-input-icon-left w-full">
                    <i className="pi pi-user" />
                    <InputText
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={classNames({ 'p-invalid': errors.fullName })}
                      placeholder="Enter your full name"
                    />
                  </span>
                  {errors.fullName && <small className="p-error">{errors.fullName}</small>}
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="email" className="block font-medium mb-2">Email Address *</label>
                  <span className="p-input-icon-left w-full">
                    <i className="pi pi-envelope" />
                    <InputText
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={classNames({ 'p-invalid': errors.email })}
                      placeholder="Enter your email address"
                      autoComplete="username"
                    />
                  </span>
                  {errors.email && <small className="p-error">{errors.email}</small>}
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="phoneNumber" className="block font-medium mb-2">Phone Number (Optional)</label>
                  <span className="p-input-icon-left w-full">
                    <i className="pi pi-phone" />
                    <InputText
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={classNames({ 'p-invalid': errors.phoneNumber })}
                      placeholder="Enter your phone number"
                    />
                  </span>
                  {errors.phoneNumber && <small className="p-error">{errors.phoneNumber}</small>}
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="dateOfBirth" className="block font-medium mb-2">Date of Birth *</label>
                  <Calendar
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleDateChange}
                    className={classNames({ 'p-invalid': errors.dateOfBirth })}
                    placeholder="Select your date of birth"
                    showIcon
                    maxDate={new Date()}
                  />
                  {errors.dateOfBirth && <small className="p-error">{errors.dateOfBirth}</small>}
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="gender" className="block font-medium mb-2">Gender (Optional)</label>
                  <Dropdown
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    options={genderOptions}
                    onChange={handleGenderChange}
                    placeholder="Select your gender"
                    className={classNames({ 'p-invalid': errors.gender })}
                  />
                  {errors.gender && <small className="p-error">{errors.gender}</small>}
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="password" className="block font-medium mb-2">Password *</label>
                  <Password
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    toggleMask
                    className={classNames({ 'p-invalid': errors.password })}
                    header={passwordHeader}
                    footer={passwordFooter}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                  />
                  {errors.password && <small className="p-error">{errors.password}</small>}
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="confirmPassword" className="block font-medium mb-2">Confirm Password *</label>
                  <Password
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    toggleMask
                    feedback={false}
                    className={classNames({ 'p-invalid': errors.confirmPassword })}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && <small className="p-error">{errors.confirmPassword}</small>}
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <Button
                    type="submit"
                    label={loading ? 'Creating Account...' : 'Create Account'}
                    icon="pi pi-user-plus"
                    className="w-full"
                    style={{ background: '#7B66FF' }}
                    loading={loading}
                  />
                </div>
              </div>
              
              <div className="text-center mt-4">
                <span className="text-gray-600 font-medium">Already have an account? </span>
                <Link to="/login" className="font-medium no-underline" style={{ color: '#7B66FF' }}>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
