import React, { createContext, useReducer, useContext } from 'react'

export const TOTAL_QUANTITY_TOGGLE = 'TOTAL_QUANTITY_TOGGLE'

export const StoreContext = createContext(null)
const initialState = {
  totalQuantityToggle: 'total'
}

const reducer = (state, action) => {
  switch (action.type) {
    case TOTAL_QUANTITY_TOGGLE:
      return {
        ...state,
        totalQuantityToggle: action.totalQuantityToggle
      }
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
