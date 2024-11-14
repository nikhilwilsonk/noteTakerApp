import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

const Login = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await instance.loginPopup();
      navigate('/');
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login with Azure AD
        </button>
      </div>
    </div>
  );
};

export default Login;