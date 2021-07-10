import axios from 'axios'

const GroceryService = {
  getGrocery: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/grocery`)

      return response.data
    } catch (e) {
      throw new Error(e)
    }
  },
  updateGrocery: async (productId, data = {}) => {
    try {
      if (!productId) {
        throw new Error('No product Id provided')
      }

      if (Object.keys(data).length === 0) {
        throw new Error('No data provided')
      }

      await axios.patch(`${process.env.REACT_APP_API_HOST}/grocery/${productId}`, data)
    } catch (e) {
      throw new Error(e)
    }
  },
  getFavorites: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/grocery?favorite=1`)

      return response.data
    } catch (e) {
      throw new Error(e)
    }
  }
}

export default GroceryService
