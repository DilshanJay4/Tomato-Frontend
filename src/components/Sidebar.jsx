import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import imgTomato from '../assets/tomato.png';

const Sidebar = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { logout } = useLogout()
    const { user } = useAuthContext()
  

    const handleClick = () => {
      logout()
    }


    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/user/info",
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          setUserInfo(response.data);
        } catch (error) {
            console.error(error);
        }
      };
  
      if (user && user.token) {
        fetchUserInfo();
      }
    }, [user]);



  const imageStyle = { width: '30px', height: '30px', marginRight: '10px' };
  return (
    <div className="sidebar shadow rounded-5 d-flex flex-column flex-shrink-0 p-3 mr-5 mt-5" style={{ width: '380px', backgroundColor: '#15202c'}}>
      <NavLink to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
        <span className="fs-4 text-light"> Game </span>
        <img src={imgTomato} alt="" width="38" height="38" className="rounded-circle me-2 mx-3" />
      </NavLink>
      <hr />
      <ul className="nav nav-pills rounded-4 flex-column mb-auto px-4">
        <li className="nav-item ">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"/></svg>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/profile" className="nav-link" activeClassName="active">
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"/></svg>
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/leaderboard" className="nav-link" activeClassName="active">
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"/></svg>
            Leaderboard
          </NavLink>
        </li>
      </ul>
      <hr />
        {userInfo && (
            <div className='container mx-2'>
              <img src={userInfo.img} alt="Profile" className="rounded-circle" style={imageStyle} />
              <span> <strong className='text-light'>{user.email}</strong> </span>
              <button className='btn btn-outline-danger mx-3 rounded-4' onClick={handleClick}>Log out</button>
            </div>
        )}
    </div>
  );
}

export default Sidebar;
