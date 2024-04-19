import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import firebaseApp from '../firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Signup = () => {
  const navigate = useNavigate(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImageToFirebase(image);
      const success = await signup(firstName, lastName, email, password, imageUrl);

      if (success) {
        navigate('/login');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
  };

  // Function to upload image to Firebase Storage
  const uploadImageToFirebase = async (imageFile) => {
    const storage = getStorage(firebaseApp);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    await uploadBytesResumable(storageRef, imageFile);
    return getDownloadURL(storageRef);
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      
      <div className="card shadow border border-danger border-4 border-opacity-25 rounded-4" style={{ width: '40rem',backgroundColor: '#15202c' }}>
        <div className="card-body p-5">
          <h2 className="card-title text-center text-light py-2">Register</h2>
          <form className="signup" onSubmit={handleSubmit} style={{backgroundColor: '#15202c' }}>
            <div className="mb-4">
              <label htmlFor="firstName" className="form-label text-light">First Name:</label>
              <input
                type="text"
                className="form-control border-success text-light"
                id="firstName"
                placeholder="Enter first name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                style={{backgroundColor: '#25303d' }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="form-label text-light">Last Name:</label>
              <input
                type="text"
                className="form-control border-success text-light"
                id="lastName"
                placeholder="Enter last name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                style={{backgroundColor: '#25303d' }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-light">Email address:</label>
              <input
                type="email"
                className="form-control border-success text-light"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{backgroundColor: '#25303d' }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-light">Password:</label>
              <input
                type="password"
                className="form-control border-success text-light"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{backgroundColor: '#25303d' }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="form-label text-light">Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                className="form-control border-success text-light"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                style={{backgroundColor: '#25303d' }}
              />
            </div>
            <button type="submit" className="btn btn-danger" disabled={isLoading}>Register</button>
            {error && <div className="error mt-3">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
