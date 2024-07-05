import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {
const [cartView , setcartView] = useState(false)
let data = useCart();
const navitage = useNavigate();

const handleLogout = ()=>{
  localStorage.removeItem("authToken")
  navitage("/")
}
  return (
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
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                : ""}
            </ul>
            {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn text-white mx-1" style={{backgroundColor: "#063e03", border: "2px solid white"}} to="/login">LOGIN</Link>
              <Link className="btn text-white mx-1" style={{backgroundColor: "#063e03", border: "2px solid white"}} to="/Createuser">SIGNUP</Link>
            </div>
            :
            <div>
            <div className='btn text-white mx-2' style={{backgroundColor: "#063e03", border: "2px solid white",}} onClick={()=>{setcartView(true)}}> MY CART {" "}
            <Badge pill bg='danger'> {data.length} </Badge>
            </div>
            {cartView? <Modal onClose={()=>{setcartView(false)}}><Cart/></Modal> : null}
            <div className='btn text-white mx-2' style={{backgroundColor: "#063e03", border: "2px solid white"}} onClick={handleLogout}> LOG OUT
            </div>
            </div>}
          </div>
        </div>
      </nav>


    </div>
  )
}
