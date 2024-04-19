import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    try {
      const response = await axios.delete(`http://localhost:3001/api/workouts/${workout._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })

      if (response.status === 200) {
        dispatch({ type: 'DELETE_WORKOUT', payload: response.data })
      }
    } catch (error) {
      console.error('Error deleting workout:', error)
    }
  }

  return (
    <div className="workout-details shadow rounded-4">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      

      <h1 className="new">
        
        
      </h1>
      
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails;
