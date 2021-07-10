const Reducers = {
  successOrFailure: (state, action) => {
    switch (action.type) {
      case 'success':
        return { ...state, loading: false }
      case 'failure':
        return { failure: true, loading: false }
      default:
        return state
    }
  }
}

export default Reducers
