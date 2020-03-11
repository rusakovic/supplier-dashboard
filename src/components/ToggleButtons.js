import React from 'react'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { useStore } from '../store/store'

import '../styles/general.styles.css'

const ToggleButtons = ({ actionType }) => {
  const { dispatch } = useStore()

  const [toggle, setToggle] = React.useState('total')

  //toogle the state according to selected button
  const handleAlignment = (event, selectedToggle) => {
    if (selectedToggle !== null) {
      setToggle(selectedToggle)
      dispatch({
        type: actionType,
        totalQuantityToggle: selectedToggle
      })
    }
  }

  return (
    <div className='margin-T-2'>
      <ToggleButtonGroup value={toggle} exclusive onChange={handleAlignment}>
        <ToggleButton value='total'>volume (‎€)</ToggleButton>
        <ToggleButton value='quantity'>quantity</ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default ToggleButtons
