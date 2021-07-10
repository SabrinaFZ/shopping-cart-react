import { useContext } from 'react'
import AppContext from '../../context/context'

function Cart () {
  const { cart, setCart, addToCart, removeFromCart } = useContext(AppContext)

  const getTotal = () => {
    let total = 0

    cart.forEach(elem => {
      total += elem.numSelected * elem.price
    })

    return total
  }

  const checkOut = () => {
    if (window.confirm('Would you like to pay ?')) {
      setCart([])
    }
  }

  return (
    <div className='cart'>
      <header className='hide-mobile'>
        Cart
      </header>
      <div className='cart-list'>
        {
          cart.map(product => (
            <div key={product.id} className='cart-list__item'>
              <div className='cart-list__item__image'>
                <img src={product.image_url} alt={`${product.productName} img`} />
              </div>
              <div className='cart-list__item__info'>
                <p>{product.productName}</p>
                <p>
                  <span className='cart-list__item__button' onClick={() => addToCart(product)}>
                    +
                  </span>
                  <span>{product.numSelected}</span>
                  <span className='cart-list__item__button' onClick={() => removeFromCart(product)}>
                    -
                  </span>
                </p>
              </div>
              <div className='cart-list__item__price'>
                <span>{product.price * product.numSelected}$</span>
              </div>
            </div>
          ))
        }
      </div>
      {getTotal() > 0 && (
        <div className='cart__checkout'>
          <button className='cart__checkout__button btn-warning' onClick={checkOut}>
            Checkout
          </button>
          <span>{getTotal()}$</span>
        </div>)}
    </div>
  )
}

export default Cart
