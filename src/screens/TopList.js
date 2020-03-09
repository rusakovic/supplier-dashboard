import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { orders } from '../data/orders'
import ToggleButtons from '../components/ToggleButtons'
import { useStore } from '../store/store'
import {
  createOrdersWithTotalSum,
  groupByArray,
  sortByValue
} from '../utils/arrays.utils'

const TopList = () => {
  const { state } = useStore()

  const [ordersWithTotalSum, setOrdersWithTotalSum] = useState(orders)
  const [groupedByArrayOutput, setGroupedByArrayOutput] = useState([])
  const [sortByArrayOutput, setSortByArrayOutput] = useState([])

  // we should add field Total = quantity * price from our data
  useEffect(() => {
    const createdOrders = createOrdersWithTotalSum(ordersWithTotalSum)
    console.log('createOrdersWithTotalSum', createdOrders)
    setOrdersWithTotalSum(createdOrders)
  }, [orders])

  // we should resort our data by comaing orders by their IDs
  useEffect(() => {
    const totalAndQuantityByKey = groupByArray(ordersWithTotalSum, 'productId')
    setGroupedByArrayOutput(totalAndQuantityByKey)
  }, [ordersWithTotalSum])

  useEffect(() => {
    const sortedByValue = sortByValue(
      groupedByArrayOutput,
      state.totalQuantityToggle,
      3
    )
    setSortByArrayOutput(sortedByValue)
  }, [sortByValue, state.totalQuantityToggle, groupedByArrayOutput])

  return (
    <div>
      <h2>TOP 3 Purchased products</h2>
      <ToggleButtons />
      {sortByArrayOutput.map(order => {
        return <h5 key={uuidv4()}>{order.productName}</h5>
      })}
    </div>
  )
}

export default TopList
