import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { SortableElement } from 'react-sortable-hoc'

import { useStore } from '../store/store'
import TreeItemComponent from '../components/TreeItem'
import DragHandle from '../components/DragHandle'

import '../styles/card.styles.css'
import '../styles/general.styles.css'

const DeliveryList = () => {
  const { state } = useStore()
  const ordersWithTotalSum = state.ordersWithTotalSum

  const [data, setData] = useState([])

  useEffect(() => {
    const groupByParametr = _.groupBy(ordersWithTotalSum, 'orderedOn')
    console.log('groupByParametr', groupByParametr)
    const groupBySupplier = _(groupByParametr)
      .map((obj, key) => {
        //group products
        const group = _(obj)
          .groupBy('supplier')
          .map((obj, key) => {
            console.log('obj.productId', obj)
            return {
              id: key,
              name: key,
              children: [
                {
                  id: obj[0].productId,
                  name: obj[0].productName
                }
              ]
            }
          })
          .value()
        console.log('group', group)
        // group by supplier
        return {
          id: key,
          name: key,
          children: group
        }
      })
      .value()
    console.log('groupBySupplier', groupBySupplier)

    // combine to Root object
    const toObject = {
      id: 'root',
      name: 'Orders by day',
      children: groupBySupplier
    }
    console.log('toObject', toObject)
    setData(toObject)
  }, [ordersWithTotalSum])

  return (
    <div className='handler'>
      <DragHandle />
      <div className='card-shadow card-container'>
        <h2 className='margin-T-2'>Delivery List</h2>
        <div style={{ height: '100%', minHeight: '250px' }}>
          {data.length !== 0 && <TreeItemComponent data={data} />}
        </div>
      </div>
    </div>
  )
}

export default SortableElement(DeliveryList)
