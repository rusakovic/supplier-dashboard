import React, { useEffect } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useStore, SET_TOTAL_ORDERS_VOLUME } from '../store/store'
import _ from 'lodash'
import { groupByArray } from '../utils/arrays.utils'

const TotalOrderVolume = () => {
  const { state, dispatch } = useStore()
  const ordersWithTotalSum = state.ordersWithTotalSum
  useEffect(() => {
    const groupedByOrderedOn = _.groupBy(ordersWithTotalSum, 'orderedOn')
    console.log('result', groupedByOrderedOn)

    // x - orderedOn, y - total
    const orderedOnAndTotal = _(groupedByOrderedOn)
      .map((obj, key) => ({
        x: key,
        y: _(obj).sumBy('total')
      }))
      .value()
    console.log('orderedOnAndTotal', orderedOnAndTotal)
    let formatedArrayForGraph = []
    formatedArrayForGraph.push({
      id: 'orders',
      color: 'hsl(340, 70%, 50%)',
      data: orderedOnAndTotal
    })
    console.log('formatedArrayForGraph', formatedArrayForGraph)
    dispatch({
      type: SET_TOTAL_ORDERS_VOLUME,
      totalOrdersVolume: formatedArrayForGraph
    })
  }, [ordersWithTotalSum])

  return (
    <div style={{ height: 500 }}>
      <h2>TotalOrderVolume</h2>
      <ResponsiveLine
        data={state.totalOrdersVolume}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel='y'
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  )
}

export default TotalOrderVolume
