import { NavLink } from 'react-router-dom'
import Routes from '../../routes/routes'

function Products () {
  return (
    <div className='product'>
      <header className='hide-mobile'>
        <NavLink to='/products'>Product List</NavLink> | <NavLink to='/favorites'>Favorites</NavLink>
      </header>
      <Routes />
    </div>
  )
}

export default Products
