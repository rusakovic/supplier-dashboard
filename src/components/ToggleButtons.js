import React from 'react'

import Grid from '@material-ui/core/Grid'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { useStore, TOTAL_QUANTITY_TOGGLE } from '../store/store'

const ToggleButtons = () => {
  const { state, dispatch } = useStore()

  const [toggle, setToggle] = React.useState('total')

  const handleAlignment = (event, selectedToggle) => {
    console.log('newAlignment', selectedToggle)
    if (toggle !== null) {
      setToggle(selectedToggle)
      dispatch({
        type: TOTAL_QUANTITY_TOGGLE,
        totalQuantityToggle: selectedToggle
      })
    }
  }

  return (
    <Grid item sm={12} md={6}>
      <ToggleButtonGroup
        value={toggle}
        exclusive
        onChange={handleAlignment}
        aria-label='text alignment'
      >
        <ToggleButton value='total' aria-label='left aligned'>
          volume
        </ToggleButton>
        <ToggleButton value='quantity' aria-label='centered'>
          quantity
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  )
}

export default ToggleButtons