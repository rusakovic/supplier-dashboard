import React from 'react'
import { sortableHandle } from 'react-sortable-hoc'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'

const DragHandle = sortableHandle(() => <DragIndicatorIcon fontSize='large' />)

export default DragHandle
