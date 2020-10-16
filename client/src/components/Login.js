import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../api/axiosWithAuth';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory();

  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const handleChanges = (e) => {
    const newFormData = {
      ...form, [e.target.name]: e.target.value
    }
    setForm(newFormData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('http://localhost:5000/api/login', form)
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        history.push('/bubbles')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <h2>Welcome to the Bubble App!</h2>
      <p>Login Here</p>
     
      <form onSubmit={handleSubmit}>
        <input type='text' name='username' placeholder='username' value={form.username} onChange={handleChanges} />
        <input type='password' name='password' placeholder='password' value={form.password} onChange={handleChanges} />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
