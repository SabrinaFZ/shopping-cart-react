import { useContext } from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../context/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import GroceryService from '../.././services/grocery/grocery.service'

function ProductList ({ products }) {
  const { addToCart, setProducts, setFavorites } = useContext(AppContext)

  const toggleFavorite = async product => {
    setProducts(products => products.map(elem => {
      if (elem.id === product.id) {
        return {
          ...elem,
          favorite: elem.favorite ? 0 : '1'
        }
      }

      return elem
    }))

    setFavorites(favorites => favorites.filter(favorite => favorite.id !== product.id))

    try {
      await GroceryService.updateGrocery(product.id, { favorite: product.favorite ? 0 : '1' })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='product-list'>
      {
        products.map(product => (
          <div key={product.id} className='product-list__item'>
            <button className='product-list__item__favorite' onClick={() => toggleFavorite(product)}>
              {product.favorite === '1' ? <FontAwesomeIcon icon={faHeart} className='product-list__item__favorite--active' /> : <FontAwesomeIcon icon={faHeartRegular} />}
            </button>
            <div className='product-list__item__image'>
              <img src={product.image_url} alt={`${product.productName} img`} />
            </div>
            <div className='product-list__item__info'>
              <div>
                <p className='product-list__item__name'>{product.productName}</p>
                <p className='product-list__item__description hide-mobile'>{product.productDescription}</p>
              </div>
              <div>
                <p>{product.price}$</p>
              </div>
            </div>
            <div className='product-list__item__stock hide-mobile'>
              <span>{product.stock} left</span>
            </div>
            <button className='product-list__item__button btn-default' onClick={() => addToCart(product)} disabled={product.stock === 0}>
              + add
            </button>
          </div>
        ))
      }
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired
}

export default ProductList
