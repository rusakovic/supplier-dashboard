import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { orders } from '../data/orders'
import ToggleButtons from '../components/ToggleButtons'

const TopList = () => {
  const [ordersWithTotalSum, setOrdersWithTotalSum] = useState(orders)
  const [groupedByArrayOutput, setGroupedByArrayOutput] = useState([])
  const [sortByArrayOutput, setSortByArrayOutput] = useState([])

  // we should add field Total = quantity * price from our data
  // transform quantity to integer by adding '+'
  useEffect(() => {
    const createOrdersWithTotalSum = ordersWithTotalSum.map(order => {
      return {
        ...order,
        total: +(order.quantity * order.price),
        quantity: +order.quantity
      }
    })
    console.log('createOrdersWithTotalSum', createOrdersWithTotalSum)
    setOrdersWithTotalSum(createOrdersWithTotalSum)
  }, [])

  // grouping and summing orders by Product IDs for further sorting
  const groupByArray = (orders, groupOrdersBy) => {
    const grouped = _.groupBy(orders, groupOrdersBy)

    console.log('grouped', grouped)
    const totalAndQuantityByKey = _(grouped)
      .map((obj, key) => ({
        productId: key,
        total: _(obj).sumBy('total'),
        quantity: _(obj).sumBy('quantity'),
        productName: obj[0].productName
      }))
      .value()

    console.log('totalAndQuantityByKey', totalAndQuantityByKey)
    setGroupedByArrayOutput(totalAndQuantityByKey)
  }

  // we should resort our data by comaing orders by their IDs
  useEffect(() => {
    groupByArray(ordersWithTotalSum, 'productId')
  }, [ordersWithTotalSum])

  // Sort by 'total' or 'quantity' and show desc order of 'numberToDisplay' quantity
  const sortByValue = (orders, sortBy, numberToDisplay) => {
    const sortedArray = _(orders)
      .orderBy([sortBy], ['desc'])
      .value()
      .slice(0, numberToDisplay)
    console.log('sortedArray', sortedArray)
    return sortedArray
  }

  return (
    <div>
      <ToggleButtons />
      <h2>TOP 3 Purchased products</h2>
      {sortByValue(groupedByArrayOutput, 'total', 3).map(order => {
        return <h5 key={uuidv4()}>{order.productName}</h5>
      })}
    </div>
  )
}

export default TopList
