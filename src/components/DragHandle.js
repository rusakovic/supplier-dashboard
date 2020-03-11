import React from 'react'
import { sortableHandle } from 'react-sortable-hoc'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'

import '../styles/DragHandle.components.css'

const DragHandle = sortableHandle(() => (
  <DragIndicatorIcon className='drag-handle' fontSize='large' />
))

export default DragHandle
