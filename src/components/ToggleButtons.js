import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0)
  }
}))

const ToggleButtons = () => {
  const [alignment, setAlignment] = React.useState('left')

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  const classes = useStyles()

  return (
    <Grid item sm={12} md={6}>
      <div className={classes.toggleContainer}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label='text alignment'
        >
          <ToggleButton value='left' aria-label='left aligned'>
            volume
          </ToggleButton>
          <ToggleButton value='center' aria-label='centered'>
            quantity
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Grid>
  )
}

export default ToggleButtons
