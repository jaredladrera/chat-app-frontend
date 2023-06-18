import React, { useState } from 'react'
import './login.css';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      //end
    //   axios.defaults.withCredentials = true;
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(username, password);
        await axios.post('http://localhost:3001/api/user/login', {username: username, password: password})
        .then( async res => {
          console.log(res.data);
          if(res.data.success === 1) {
            localStorage.setItem('userLoggedIn',  JSON.stringify(res.data.data[0]));
             navigate('/room')
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => console.log(err));
      };

  return (
    <form onSubmit={handleSubmit} className="login-form">
    <div className="form-group">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username} 
        onChange={handleUsernameChange}
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        className="form-control"
      />
    </div>
    <button type="submit" className="btn btn-primary">Log In</button>
  </form>
  )
}

export default Login