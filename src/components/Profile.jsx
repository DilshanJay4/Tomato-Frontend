import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from "lottie-react";
import animationData from "../assets/tomato.json";
import imgFlash from "../assets/flash.png";
import imgDiamond from "../assets/diamond.png";
import imgGmail from "../assets/gmail.png";
import { useAuthContext } from "../hooks/useAuthContext";


// components
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();


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
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (user && user.token) {
      fetchUserInfo();
    }
  }, [user]);



  const cardStyle = { width: '35rem', minHeight: '30rem', position: 'relative', backgroundColor: '#15202c' };
  const imageStyle = { width: '100px', height: '100px', marginRight: '10px' };
  const imageCardStyle = { width: '15px', height: '15px', marginRight: '10px' };
  return (

    <div className="container-fluid">
    <div className="row">
      <div className="col-md-9">
        <h1 className="text-center fw-bold">Player Profile</h1>
        <div className="workouts">

        <div className="container d-flex justify-content-center mt-5">

            {isLoading && <div className="text-center">Loading...</div>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {userInfo && (

              <div className="card shadow-lg rounded-5" style={cardStyle}>
                <div className="card-body py-3">

                        <div className="py-3 bg-transparent text-light text-center">
                          <img src={userInfo.img} alt="Profile" className="rounded-circle" style={imageStyle} />
                          <h3 className="mt-4" > {userInfo.firstName} {userInfo.lastName} </h3>
                        </div>

                        <div className="bodyCard p-5 ml-5 text-light text-center" style={{marginLeft: "80px"}}>
                          <div className="d-flex"><h5 className="mx-4 text-dark-emphasis"> Email </h5> <h6 className="rounded-4 p-2 ml-5" style={{backgroundColor: "#25303d"}}> <img src={imgGmail} alt="" style={imageCardStyle}/> {userInfo.email} </h6></div>
                          <div className="d-flex mt-1"><h5 className="mx-4 text-dark-emphasis">Matches</h5> <h6 className="rounded-4 p-2 ml-5" style={{backgroundColor: "#25303d"}}><img src={imgFlash} alt="" style={imageCardStyle}/>543635</h6></div>
                          <div className="d-flex mt-1"><h5 className="mx-4 text-dark-emphasis">Score</h5> <h6 className="rounded-4 p-2 ml-5" style={{backgroundColor: "#25303d"}}><img src={imgDiamond} alt="" style={imageCardStyle}/> {userInfo.score} </h6></div>
                        </div>

                </div>
              </div>

            )}
            </div>
 
        </div>
      </div>
      <div className="col-md-3 mt-2">
        <Sidebar />
      </div>
    </div>
    <div className="row justify-content-end" style={{ position: 'absolute', top: 380, right: 100 }}>
        <div className="col-md-12">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: "110%" }}
          />
        </div>
      </div>
  </div>
  )
}

export default Profile;
