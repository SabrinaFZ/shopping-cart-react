import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faHeart } from '@fortawesome/free-solid-svg-icons'

function Nav () {
  const location = useLocation()

  const getTitle = () => {
    if (location.pathname === '/' || location.pathname === '/products') {
      return 'New Product'
    }
    if (location.pathname === '/cart') {
      return 'Cart'
    }
    if (location.pathname === '/favorites') {
      return 'Favorites'
    }
  }

  const getLink = () => {
    if (location.pathname === '/' || location.pathname === '/products') {
      return '/cart'
    }
    if (location.pathname === '/cart') {
      return '/products'
    }

    return '/products'
  }

  return (
    <nav className='nav'>
      <Link to={getLink()} className='nav__prev'>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>
      <span className='nav__title'>
        {getTitle()}
      </span>
      <Link to='/favorites' className='nav__fav'>
        <FontAwesomeIcon icon={faHeart} />
      </Link>
    </nav>
  )
}

export default Nav
