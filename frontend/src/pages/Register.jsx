import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../index.css'; 
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <>
      <div className="register-container">
        {/* Floating Background Shapes */}
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>

        <div className="register-card">
          {/* Header Section */}
          <div className="register-header">
            <div className="register-icon">👨‍🍳</div>
            <h2 className="register-title">Create Account</h2>
            <p className="register-subtitle">
              Join our culinary community and start building your personal recipe collection
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="register-input"
                required
              />
              <span className="input-icon">👤</span>
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="register-input"
                required
              />
              <span className="input-icon">📧</span>
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="register-input"
                required
              />
              <span className="input-icon">🔒</span>
            </div>

            <button type="submit" className="register-submit-btn">
              <span>✨</span>
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="register-footer">
            <p className="register-footer-text">
              Already have an account?
            </p>
            <button
              onClick={() => navigate('/login')}
              className="login-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 'inherit'
              }}
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </>
  );
}