import React, { useState } from 'react'

import TopList from './screens/TopList'
import TotalOrderVolume from './screens/TotalOrderVolume'
import SupplierRank from './screens/SupplierRank'
import DeliveryList from './screens/DeliveryList'
import arrayMove from 'array-move'

import DraggableComponent from './components/DraggableComponents'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [components, setComponents] = useState([
    <TopList index={1} key={1} />,
    <TotalOrderVolume index={2} key={2} />,
    <SupplierRank index={3} key={3} />,
    <DeliveryList index={4} key={4} />
  ])
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setComponents(arrayMove(components, oldIndex, newIndex))
  }
  return (
    <div className='App'>
      <DraggableComponent
        useDragHandle
        components={components}
        onSortEnd={onSortEnd}
      />
    </div>
  )
}

export default App
