import React from 'react';
import { Link } from "react-router-dom";
import { FiPlus, FiArrowLeft } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/courseIcon.png'

function Header(props) {
  return (
    <div className="header-container">
      <header>
        <Link to='/'>
          <img src={logoImg} alt='Logo' />
        </Link>
        <span>{props.pageName}</span>
        <Link
          className='button'
          to={`${props.btnNav}`}>
          {props.iconName == 'back' ? <FiArrowLeft size={25} color='#fff' /> : <FiPlus size={25} color='#fff' />}
          {props.btnText}
        </Link>
      </header>
    </div>
  )
}

export default Header;
