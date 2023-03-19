import { Routes, Route } from 'react-router-dom'
import Cart from './Cart'
import Products from './Products'

const AllRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  )
}

export default AllRoute