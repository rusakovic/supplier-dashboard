import React from 'react'

import TopList from './screens/TopList'
import TotalOrderVolume from './screens/TotalOrderVolume'
import SupplierRank from './screens/SupplierRank'
import DeliveryList from './screens/DeliveryList'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className='App'>
      <TopList />
      <TotalOrderVolume />
      <SupplierRank />
      <DeliveryList />
    </div>
  )
}

export default App
