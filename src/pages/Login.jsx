import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/tomato.json'; 
import animation from '../assets/data3.json';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return ( 

    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      {/* Left Lottie Animation */}
      <h1 className="text-center text-light" style={{ position: 'absolute', top: 100, left: 700 }}>Toma Game</h1>
      
      <div className="row justify-content-start">
        <div className="col-md-12">
          <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: '350px' }} />
        </div>
      </div>

      {/* Middle Card */}
    
      <div className="card shadow border border-primary border-5 border-opacity-25 rounded-4" style={{ width: '40rem',backgroundColor: '#15202c' }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center py-2 text-light">Login</h2>
          <form className="login" onSubmit={handleSubmit} style={{backgroundColor: '#15202c' }}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-light">Email address:</label>
              <input
                type="email"
                className="form-control border-0 text-light shadow"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{backgroundColor: '#25303d' }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-light">Password:</label>
              <input
                type="password"
                className="form-control border-0 text-light shadow"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{backgroundColor: '#25303d' }}
              />
            </div>
            <button type="submit" className="btn btn-primary d-block" disabled={isLoading}>Login</button>

              <p className='pt-2 d-inline-block text-light'>Don't have an account? </p>   <Link to="/signup" className='mx-2'>Signup</Link>

            {error && <div className="error mt-3">{error}</div>}
          </form>
        </div>
      </div>

      {/* Right Lottie Animation */}
      <div className="row justify-content-end">
        <div className="col-md-10">
          <Lottie animationData={animation} loop={true} autoplay={true} style={{ width: '350px' }} />
        </div>
      </div>
    </div>
  );
};

export default Login;
