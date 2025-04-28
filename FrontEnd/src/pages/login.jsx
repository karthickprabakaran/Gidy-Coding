import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import Navbar from '../components/Navbar';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem('token', response.data.token);
        setSuccess('Logged in successfully! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen flex-col justify-center items-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              New here?{' '}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => navigate('/signup')}
              >
                Create an account
              </button>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center">{success}</div>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;