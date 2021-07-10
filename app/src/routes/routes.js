import { Switch, Route, Redirect } from 'react-router-dom'
import ProductsList from '../views/products/products-list/products-list.view'
import Cart from '../views/cart/cart.view'
import Favorites from '../views/products/favorites/favorites.view'
import DetectDevice from '../utils/detect-device/detect-device'

function Routes () {
  return (
    <Switch>
      <Route path='/products'>
        <ProductsList />
      </Route>
      <Route path='/cart'>
        {DetectDevice.isMobileOrTablet() ? (<Cart />) : (<Redirect to='/products' />)}
      </Route>
      <Route path='/favorites'>
        <Favorites />
      </Route>
      <Route exact path='/'>
        <Redirect to='/products' />
      </Route>
      <Route>
        <Redirect to='/products' />
      </Route>
    </Switch>
  )
}

export default Routes
