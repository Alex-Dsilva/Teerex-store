import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Cart.css'

const Cart = () => {

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, setCart] = useState(cartItems || [])

  const handleQuantityChange = (qty, i) => {
    const newQuantity = parseInt(qty);
    if (newQuantity > cart[i].quantity) {
      alert('Cannot order more than the stock quantity')
    } else {
      const items = [...cart];
      items[i].qty = newQuantity
      setCart(items)
      localStorage.setItem('cart', JSON.stringify(items));
    }
  };

  const deleteCartItem = (index) => {
    const items = [...cart];
    items.splice(index, 1);
    setCart(items)
    localStorage.setItem('cart', JSON.stringify(items));
  }

  return (
    <div className='Cart-comp'>
      <h1>Shopping Cart</h1>
      <div className='cart-cards-container' >
        {cart.length ? (
          cart.map((details, i) => {
            return <div key={i} className="cart-card" >
              <div className="cart-card-details">
                <img className='cart-card-image' src={details.imageURL} alt={details.name} />
                <div>
                  <h3 >{details.name}</h3>
                  <p>{`Rs ${details.price}`}</p>
                </div>
              </div>
              <div className="cart-card-quantity">
                <span className='cart-card-quantity-label'>Qty:</span>
                <input
                  className='cart-card-quantity-input'
                  type="number"
                  min={1}
                  max={details.quantity + 1}
                  placeholder={`${details.qty}`}
                  onChange={(e) => {
                    handleQuantityChange(e.target.value, i)
                    e.target.value = cart[i].quantity
                  }}
                />
              </div>
              <button className='cart-card-delete' onClick={() => deleteCartItem(i)}>Delete</button>
            </div>
          })
        ) : (
          <div id="Cart-empty">
            <img src="https://img.freepik.com/free-vector/hand-shopping-cart-with-different-groceries-products-person-buying-food-from-supermarket-online-store-flat-vector-illustration-shopping-concept-banner-website-design-landing-page_74855-24727.jpg?w=740&t=st=1679251418~exp=1679252018~hmac=2ab2fb3c98dfa911fdcb367d405af896a8c450ad061356a7c36eaa762bdc2e70" alt="Empty Cart" />
            <Link to='/'><h4 >Your cart is Empty Go to Products</h4></Link>
          </div>
        )

        }
      </div>
      <hr />
      <div id='cart-total'>
        <h3>Total amount </h3>
        <p>Rs {cart.reduce((a, b) => a + b.price * b.qty, 0)}</p>
      </div>
    </div>
  )
}

export default Cart