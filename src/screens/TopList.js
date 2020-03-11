import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SortableElement } from 'react-sortable-hoc'

import { orders } from '../data/orders'
import ToggleButtons from '../components/ToggleButtons'
import { useStore, SET_ORDERS, TOTAL_QUANTITY_TOGGLE } from '../store/store'
import {
  createOrdersWithTotalSum,
  groupByArray,
  sortByValue
} from '../utils/arrays.utils'
import DragHandle from '../components/DragHandle'

import '../styles/card.styles.css'
import '../styles/general.styles.css'

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
    <div className='handler'>
      <DragHandle />
      <div className='card-shadow card-container'>
        <h2 className='margin-T-2'>TOP 3 Purchased products</h2>
        <ToggleButtons actionType={TOTAL_QUANTITY_TOGGLE} />
        <div className='margin-TB-5 align-center'>
          {sortByArrayOutput.map((order, index) => {
            return (
              <h5 key={uuidv4()}>
                {index + 1}. {order.productName.toUpperCase()}
              </h5>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SortableElement(TopList)
