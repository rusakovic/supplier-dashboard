import React, { createContext, useReducer, useContext } from 'react'

export const TOTAL_QUANTITY_TOGGLE = 'TOTAL_QUANTITY_TOGGLE'
export const SET_ORDERS = 'SET_ORDERS'
export const SET_TOTAL_ORDERS_VOLUME = 'SET_TOTAL_ORDERS_VOLUME'

export const StoreContext = createContext(null)
const initialState = {
  totalQuantityToggle: 'total',
  ordersWithTotalSum: [],
  totalOrdersVolume: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case TOTAL_QUANTITY_TOGGLE:
      return {
        ...state,
        totalQuantityToggle: action.totalQuantityToggle
      }
    case SET_ORDERS:
      return {
        ...state,
        ordersWithTotalSum: action.ordersWithTotalSum
      }
    case SET_TOTAL_ORDERS_VOLUME:
      return {
        ...state,
        totalOrdersVolume: action.totalOrdersVolume
      }
    default:
      return state
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
