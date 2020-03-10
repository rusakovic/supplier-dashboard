import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { orders } from '../data/orders'
import ToggleButtons from '../components/ToggleButtons'
import { useStore, SET_ORDERS, TOTAL_QUANTITY_TOGGLE } from '../store/store'
import {
  createOrdersWithTotalSum,
  groupByArray,
  sortByValue
} from '../utils/arrays.utils'

const TopList = () => {
  const { state, dispatch } = useStore()

  const [groupedByArrayOutput, setGroupedByArrayOutput] = useState([])
  const [sortByArrayOutput, setSortByArrayOutput] = useState([])

  // we should add field Total = quantity * price from our data
  useEffect(() => {
    const createdOrders = createOrdersWithTotalSum(orders)
    dispatch({ type: SET_ORDERS, ordersWithTotalSum: createdOrders })
  }, [dispatch])

  // we should resort our data by comaing orders by their IDs
  useEffect(() => {
    const totalAndQuantityByKey = groupByArray(
      state.ordersWithTotalSum,
      'productId'
    )
    setGroupedByArrayOutput(totalAndQuantityByKey)
  }, [state.ordersWithTotalSum])

  // should show only 3 TOP results
  useEffect(() => {
    const sortedByValue = sortByValue(
      groupedByArrayOutput,
      state.totalQuantityToggle,
      3
    )
    setSortByArrayOutput(sortedByValue)
  }, [state.totalQuantityToggle, groupedByArrayOutput])

  return (
    <div>
      <h2>TOP 3 Purchased products</h2>
      <ToggleButtons actionType={TOTAL_QUANTITY_TOGGLE} />
      {sortByArrayOutput.map(order => {
        return <h5 key={uuidv4()}>{order.productName}</h5>
      })}
    </div>
  )
}

export default TopList
