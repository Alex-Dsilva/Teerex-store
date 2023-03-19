import React from 'react'
import './Card.css'

const Card = ({ details }) => {

  const handleAddToCart = (detail) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingCartItem = cart.find((item) => item.id === detail.id);
    if (existingCartItem) {
      alert('This product is already in the cart!');
      return;
    }
    cart.push({ ...detail, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <div className='card-comp'>
      <div className="card-image-container">
        <img className='card-image' src={details.imageURL} alt={details.name} />
        <h3 className="card-title">{details.name}</h3>
      </div>
      <div className='card-flex'>
        <h3 className="card-price">{`Rs ${details.price}`}</h3>
        <button className='addtocart-btn' onClick={() => handleAddToCart(details)}>Add To Cart</button>
      </div>

    </div>
  )
}

export default Card