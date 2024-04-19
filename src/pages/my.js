import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from "lottie-react";
import animationData from "../assets/tomato.json";
import goldCup from "../assets/gold.png";
import silverCup from "../assets/silver.png";
import bronzeCup from "../assets/bronze.png";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Sidebar from "../components/Sidebar";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();


  const cardStyle = { width: '48rem', minHeight: '30rem', position: 'relative', backgroundColor: '#15202c' };
  const imageStyle = { width: '30px', height: '30px', marginRight: '10px' };
  const imagCupStyle = { width: '30px', height: '25px', marginRight: '10px' };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/user/allinfo",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        // Sort users based on score
        const sortedUsers = response.data.sort((a, b) => b.score - a.score);
        setUsers(sortedUsers);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.token) {
      fetchUsers();
    }
  }, [user]); 
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <h1 className="text-center fw-bolder">Leaderboard</h1>
          <div className="workouts">

            <div className="container d-flex justify-content-center mt-5">
              <div className="card shadow rounded-4" style={cardStyle}>
                <div className="card-body py-3">

                  <h3 className="text-light pt-1 pl-2">Players</h3>

                <table className="table table-dark table-hover w-100">
                    <thead>

                      <tr className="py-3">
                        <th className="py-5 bg-transparent text-dark-emphasis" scope="col">Rank</th>
                        <th className="py-5 bg-transparent text-dark-emphasis" scope="col">Player</th>
                        <th className="py-5 bg-transparent text-dark-emphasis" scope="col">Wins</th>
                        <th className="py-5 bg-transparent text-dark-emphasis" scope="col">Score</th>
                      </tr>

                    </thead>
                    <tbody>

                          {users.map((user, index) => (
                            <tr key={user._id}>
                              <th className="py-3 bg-transparent text-light" scope="row">{index + 1}</th>
                              <td className="py-3 bg-transparent text-light">
                                {index === 0 && <img src={goldCup} alt="Gold Cup" style={imagCupStyle} />} 
                                {index === 1 && <img src={silverCup} alt="Silver Cup" style={imagCupStyle} />} 
                                {index === 2 && <img src={bronzeCup} alt="Bronze Cup" style={imagCupStyle} />} 
                                <img src={user.img} alt="Profile" className="rounded-circle" style={imageStyle} />
                                {user.firstName}
                              </td>
                              <td className="py-3 bg-transparent text-light">skdgk</td>
                              <td className="py-3 bg-transparent text-light">{user.score}</td>
                            </tr>
                          ))}
                      
                    </tbody>
                  </table>
                 
                </div>
              </div>
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

export default Leaderboard;



{/* <tr>
<th className="py-3 bg-transparent text-light" scope="row">1 <img src={goldCup} alt="goldcup" style={imagCupStyle} /> </th>
<td className="py-3 bg-transparent text-light">
  <img src='https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg' alt="Profile" className="rounded-circle" style={imageStyle} />
  Mark Knopfler
</td>
<td className="py-3 bg-transparent text-light">Otto</td>
<td className="py-3 bg-transparent text-light">@mdo</td>
</tr> */}

