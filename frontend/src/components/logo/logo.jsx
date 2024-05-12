import React from 'react';
import './logo.css';
import logo from '../assests/logo.png';
import { NavLink,Link ,useHistory} from 'react-router-dom';

const Logo = () => {


  return (
    <div className="logo-container">
      <div className="slogan-text">Plus qu'un réseau, une communauté de gamers !</div>
      <div className="logo-image-container">
        <img src={logo} alt="GIF Logo" height={200} />
      </div>
      <div >
        <Link  className="button-container1" to={"/register"} >Create Account</Link>
        <Link className="button-container" to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default Logo;