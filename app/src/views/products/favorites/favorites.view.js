import { useEffect, useContext, useReducer } from 'react'
import GroceryService from '../../../services/grocery/grocery.service'
import ProductList from '../../../components/product-list/product-list.component'
import Loading from '../../../components/loading/loading.component'
import Failure from '../../../components/failure/failure.component'
import AppContext from '../../../context/context'
import Reducer from '../../../utils/reducers/reducer'

function Favorites () {
  const [state, dispatch] = useReducer(Reducer.successOrFailure, { failure: false, loading: true })

  const { favorites, setFavorites } = useContext(AppContext)

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favorites = await GroceryService.getFavorites()
        setFavorites(favorites)
        dispatch({ type: 'success' })
      } catch {
        dispatch({ type: 'failure' })
      }
    }
    getFavorites()
  }, [setFavorites])

  return (
    <>
      {state.loading && (
        <Loading />
      )}
      {!state.loading && state.failure && (
        <Failure />
      )}
      {!state.loading && !state.failure && (<ProductList products={favorites} />)}
    </>
  )
}

export default Favorites
