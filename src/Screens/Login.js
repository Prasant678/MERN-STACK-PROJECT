import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))
    const Response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await Response.json()
    console.log(json);

    if (!json.success) {
      alert("Invalid EmailAddress or Password")
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
      alert("Login Successfully")
    }
  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <>
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#063e03"}}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic" to="/">FLAVOUR FOOD</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-1">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">HOME</Link>
              </li>
            </ul>
          </div>
        </div>      
      </nav>
      </div>
      <div>
        <div className='container' style={{ padding: "10rem"}}>
          <form onSubmit={handleSubmit} style={{border: "2px solid white", borderRadius: "20px", padding: "25px"}}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" style={{fontSize : "35px",fontStyle: "italic"}}>Email address</label>
              <input type="email" className="form-control" style={{color: "white", border: "2px solid white", borderRadius: "20px"}} name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" />
              <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label" style={{fontSize : "35px",fontStyle: "italic"}}>Password</label>
              <input type="password" className="form-control" style={{color: "white", border: "2px solid white", borderRadius: "20px"}} name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
            </div>
            <button type="submit" className="m-3 btn" style={{border: "2px solid white", backgroundColor: "#086261"}}>LOG IN</button>
            <Link to="/CreateUser" className='m-3 btn btn-danger' style={{border: "2px solid white"}}>REGISTOR</Link>
          </form>
        </div>
      </div>
      <div>
        < Footer/>
      </div>
    </>
  )
}