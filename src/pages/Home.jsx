import React, { useState, useEffect } from "react";
import { useGameContext } from "../hooks/useGameContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Lottie from "lottie-react";
import animationData from "../assets/tomato.json";
import axios from "axios";

// components
import Game from "../components/Game";
import Sidebar from "../components/Sidebar";
import CountdownTimer from '../components/CountdownTimer';

const Home = () => {
  const { game, dispatch } = useGameContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(true); // State variable for modal visibility
  const [selectedDifficulty, setSelectedDifficulty] = useState(""); // State variable for selected difficulty

  const handleCloseModal = () => setShowModal(false); // Function to close the modal

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    handleCloseModal();
  };


  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/user/info",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setScore(response.data.score);
      }
    } catch (error) {
      console.error("Error fetching user information:", error.message);
    } finally {
      setLoading(false);
    }
  };


  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/game/question",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        dispatch({ type: "SET_GAME", payload: response.data });
      }
    } catch (error) {
      console.error("Error fetching the Question:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserInfo();
      fetchQuestion();
    }
  }, [dispatch, user]);
  

  const handleAnswerSubmission = async (e) => {
    e.preventDefault();

    const correctAnswer = game.solution ? game.solution.toString() : "";

    if (correctAnswer === userAnswer) {
      // Update the score
      const updatedScore = score + 5;

      // Send the updated score to the backend
      try {
        const response = await axios.put(
          "http://localhost:3001/api/user/score",
          { score: updatedScore },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        if (response.status === 200) {
          // Score updated successfully, update the local state
          setScore(updatedScore);
          alert("Answer is correct!");
          await fetchQuestion();
          setUserAnswer("");
        }
      } catch (error) {
        console.error("Error updating score:", error.message);
      }
    } else {
      alert("Answer is incorrect!");
    }
  };

  const submitStyle = {
    marginTop: "10px",
    marginLeft: "8px",
    marginBottom: "12px",
    display: "inline-block",
    height: "45px",
  };

  const userInput = {
    width: "150px",
    backgroundColor: "#25303d",
    color: "white",
    display: "inline-block",
  };

  const inputFieldStyle = {
    marginLeft: "150px",
  };

  const handleTimerEnd = () => {
    setGameOver(true);
  };


  let initialSeconds;
  switch (selectedDifficulty) {
    case "Easy":
      initialSeconds = 60;
      break;
    case "Medium":
      initialSeconds = 40;
      break;
    case "Hard":
      initialSeconds = 20;
      break;
    default:
      initialSeconds = 0;
  }


  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Adjust the opacity as needed
    zIndex: 1000, // Ensure it's above other content
  };


return (
    <div className="container-fluid">

      <div className="modal-overlay" style={{ ...modalOverlayStyle, display: showModal ? "block" : "none" }} onClick={handleCloseModal}></div>

        <div className="modal" style={{ display: showModal ? "block" : "none" }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "300px" }}>
            <div className="modal-content rounded-5" style={{ backgroundColor: '#15202c' }}>
              <div className="modal-header" style={{ borderBottom: "none" }}>
                <h5 className="modal-title text-white py-2" style={{ marginLeft: "62px" }}>Select Difficulty</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body d-flex justify-content-center align-items-center">
                <div class="btn-group-vertical my-3" role="group" aria-label="Vertical button group">
                  <button className="btn btn-primary mb-3" onClick={() => handleDifficultySelect("Easy")}>Easy</button>
                  <button className="btn btn-warning mb-3" onClick={() => handleDifficultySelect("Medium")}>Medium</button>
                  <button className="btn btn-danger mb-1" onClick={() => handleDifficultySelect("Hard")}>Hard</button>
                </div>
              </div>
            </div>
          </div>
        </div>


      
      {gameOver && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-danger text-center alert-dismissible fade show rounded-4"  role="alert">
              <h4 className="fw-bold">Time's Up! Your final score is: {score}</h4>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-9">
          <h1 className="text-center fw-bolder">Toma Game</h1>
          <div className="workouts">
          <h4>Score <span className="badge text-bg-danger rounded-4">{score}</span></h4>
          {selectedDifficulty && !gameOver && <CountdownTimer initialSeconds={initialSeconds} onTimerEnd={handleTimerEnd} />}
            <Game game={game} />
            <form
              className="d-inline-block"
              onSubmit={handleAnswerSubmission}
              style={{ marginLeft: "150px", marginTop: "50px" }}
            >
              <div className="inputUser" style={inputFieldStyle}>
                <input
                  type="text"
                  id="userAnswer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  style={userInput}
                />
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={loading || !userAnswer.trim()}
                  style={submitStyle}
                >
                  {" "}
                  Submit Answer{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-3 mt-2">
          <Sidebar />
        </div>
      </div>
      <div
        className="row justify-content-end"
        style={{ position: "absolute", top: 380, right: 100 }}
      >
        <div className="col-md-12">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: "110%" }}
          />
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-md-6 text-center"></div>
      </div>
    </div>
  );
};

export default Home;
