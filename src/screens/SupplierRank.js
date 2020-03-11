import React, { useEffect, useState } from 'react'
import { SortableElement } from 'react-sortable-hoc'

import ToggleButtons from '../components/ToggleButtons'
import { useStore, TOTAL_QUANTITY_TOGGLE_SUPPLIERS } from '../store/store'
import { groupedBy } from '../utils/arrays.utils'
import ResponsiveBarComponent from '../components/ResponsiveBar'
import DragHandle from '../components/DragHandle'

const SupplierRank = () => {
  // +++++++++++++++++++++++++++++++++++++++++++++
  // STATES
  const { state } = useStore()
  const [data, setData] = useState()
  const ordersWithTotalSum = state.ordersWithTotalSum

  useEffect(() => {
    console.log('ordersWithTotalSum', ordersWithTotalSum)
    const groupedBySupplier = groupedBy(
      ordersWithTotalSum,
      'supplier',
      state.totalQuantityToggleSuppliers,
      'bar'
    )
    console.log('groupedBySupplier', groupedBySupplier)
    setData(groupedBySupplier)
  }, [ordersWithTotalSum, state.totalQuantityToggleSuppliers])

  return (
    <div>
      <DragHandle />
      <div>
        <h2>SupplierRank</h2>
        <ToggleButtons actionType={TOTAL_QUANTITY_TOGGLE_SUPPLIERS} />
        <ResponsiveBarComponent data={data} />
      </div>
    </div>
  )
}

export default SortableElement(SupplierRank)
