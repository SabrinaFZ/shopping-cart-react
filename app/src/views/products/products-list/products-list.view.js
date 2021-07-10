import { useEffect, useContext, useReducer } from 'react'
import AppContext from '../../../context/context'
import ProductList from '../../../components/product-list/product-list.component'
import Failure from '../../../components/failure/failure.component'
import Loading from '../../../components/loading/loading.component'
import GroceryService from '../../../services/grocery/grocery.service'
import Reducer from '../../../utils/reducers/reducer'

function ProductsList () {
  const [state, dispatch] = useReducer(Reducer.successOrFailure, { failure: false, loading: true })

  const { products, setProducts } = useContext(AppContext)

  useEffect(() => {
    const getGrocery = async () => {
      try {
        const products = await GroceryService.getGrocery()
        dispatch({ type: 'success' })
        setProducts(products)
      } catch (e) {
        dispatch({ type: 'failure' })
      }
    }
    getGrocery()
  }, [setProducts])

  return (
    <>
      {state.loading && (
        <Loading />
      )}
      {!state.loading && state.failure && (
        <Failure />
      )}
      {!state.loading && !state.failure && (<ProductList products={products} />)}
    </>
  )
}

export default ProductsList
