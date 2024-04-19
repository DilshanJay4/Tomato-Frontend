const Game = ({game}) => {
  // Check if game is null, if so, render null or a loading indicator
  if (!game) {
    return null; // or return loading indicator
  }
  
  return (
    <div className="container d-flex justify-content-center mt-4">
      <div className="card shadow border border-danger border-4 border-opacity-25 rounded-4" style={{ width: '44rem' }}>
        <div className="card-body p-2">
          <img src={game.question} alt="Game question" />
          <h3>{game.solution}</h3>
        </div>
      </div>
    </div>
  )
}

export default Game;
