import React from 'react'

import Grid from '@material-ui/core/Grid'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { useStore } from '../store/store'

const ToggleButtons = ({ actionType }) => {
  const { dispatch } = useStore()

  const [toggle, setToggle] = React.useState('total')

  //toogle the state according to selected button
  const handleAlignment = (event, selectedToggle) => {
    console.log('newAlignment', selectedToggle)
    if (selectedToggle !== null) {
      setToggle(selectedToggle)
      dispatch({
        type: actionType,
        totalQuantityToggle: selectedToggle
      })
    }
  }

  return (
    <Grid item sm={12} md={6}>
      <ToggleButtonGroup value={toggle} exclusive onChange={handleAlignment}>
        <ToggleButton value='total'>volume (‎€)</ToggleButton>
        <ToggleButton value='quantity'>quantity</ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  )
}

export default ToggleButtons
