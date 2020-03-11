import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { SortableElement } from 'react-sortable-hoc'

import { useStore } from '../store/store'
import TreeItemComponent from '../components/TreeItem'
import DragHandle from '../components/DragHandle'

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
    <div>
      <DragHandle />
      <div>
        <h2>Delivery List</h2>
        {data.length !== 0 && <TreeItemComponent data={data} />}
      </div>
    </div>
  )
}

export default SortableElement(DeliveryList)
