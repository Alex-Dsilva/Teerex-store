import React from 'react'
import './Navbar.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const cartCount = JSON.parse(localStorage.getItem('cart')) || [];

  return (
    <nav className="navbar">
      <h1 className="navbar-title">My Online Store</h1>
      <div className='left-navbar'>
        <Link to='/'><h4 id='path'>Products</h4></Link>
        <div className="navbar-cart">
          <Link to='/Cart'>
            <button className="navbar-cart-button">
              <AiOutlineShoppingCart />
              {cartCount.length > 0 && <span className="navbar-cart-count">{cartCount.length}</span>}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar