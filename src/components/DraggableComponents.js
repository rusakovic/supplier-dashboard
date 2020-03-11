import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'

const DraggableComponents = SortableContainer(({ components }) => {
  return (
    <div>
      {components.map((Component, index) => {
        return {
          ...Component,
          props: { ...Component.props, index: index }
        }
      })}
    </div>
  )
})

export default DraggableComponents
