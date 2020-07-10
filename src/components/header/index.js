import React from 'react';
import { Link } from "react-router-dom";
import { FiPlus } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/courseIcon.png'

function Header(props) {
  return (
    <div className="header-container">
      <header>
        <img src={logoImg} alt='Logo' />
        <span>{props.pageName}</span>
        <Link className='button' to={`${props.btnNav}`} >  <FiPlus size={25} color='#fff' /> {props.btnText}</Link>
      </header>
    </div>
  )
}

export default Header;
