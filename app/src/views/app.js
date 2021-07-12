import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import GroceryService from '../services/grocery/grocery.service'
import Nav from '../components/nav/nav.component'
import Routes from '../routes/routes'
import AppContext from '../context/context'
import Products from './products/products'
import Cart from './cart/cart.view'
import DetectDevice from '../utils/detect-device/detect-device'

function App () {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(DetectDevice.isMobileOrTablet())

  useEffect(() => {
    const detectDevice = () => {
      setIsMobileOrTablet(DetectDevice.isMobileOrTablet())
    }

    window.addEventListener('resize', detectDevice)

    return () => {
      window.removeEventListener('resize', detectDevice)
    }
  }, [])

  const addToCart = product => {
    const productInCart = findProductInCart(product)

    if (productInCart) {
      updateCart(productInCart, productInCart.stock - 1, productInCart.numSelected + 1)
    } else {
      cart.push({ ...product, stock: product.stock - 1, numSelected: 1 })
      setCart(cart)
    }

    const productInFavorites = findProductInFavorites(product)

    if (productInFavorites) {
      updateFavorites(product, product.stock - 1)
    }

    updateProducts(product, product.stock - 1)
  }

  const removeFromCart = product => {
    const productInCart = findProductInCart(product)

    if (productInCart) {
      if (productInCart.numSelected === 1) {
        setCart(cart => cart.filter(elem => elem.id !== productInCart.id))
      } else {
        updateCart(productInCart, productInCart.stock + 1, productInCart.numSelected - 1)
      }
    }

    const productInFavorites = findProductInFavorites(product)

    if (productInFavorites) {
      updateFavorites(product, product.stock + 1)
    }

    updateProducts(product, product.stock + 1)
  }

  const findProductInCart = product => {
    return cart.find(item => item.id === product.id)
  }

  const findProductInFavorites = product => {
    return favorites.find(item => item.id === product.id)
  }

  const updateCart = (product, numStock, numSelected) => {
    setCart(cart => {
      return cart.map(elem => {
        if (elem.id === product.id) {
          return {
            ...elem,
            stock: numStock,
            numSelected
          }
        }

        return elem
      })
    })
  }

  const updateProducts = async (product, numStock) => {
    setProducts(products => {
      return products.map(elem => {
        if (elem.id === product.id) {
          return {
            ...elem,
            stock: numStock
          }
        }
        return elem
      })
    })

    try {
      await GroceryService.updateGrocery(product.id, { stock: numStock })
    } catch (e) {
      console.log(e)
    }
  }

  const updateFavorites = (product, numStock) => {
    setFavorites(products => {
      return products.map(elem => {
        if (elem.id === product.id) {
          return {
            ...elem,
            stock: numStock
          }
        }
        return elem
      })
    })
  }

  const getContextValues = () => {
    return {
      products,
      cart,
      favorites,
      addToCart,
      removeFromCart,
      setProducts,
      setFavorites,
      setCart
    }
  }

  return (
    <div className='app'>
      <AppContext.Provider value={getContextValues()}>
        <Router>
          {!isMobileOrTablet && (
            <div className='desktop'>
              <Products />
              <Cart />
            </div>)}
          {isMobileOrTablet && (
            <div className='mobile'>
              <Nav />
              <Routes />
            </div>)}
        </Router>
      </AppContext.Provider>
    </div>
  )
}

export default App
