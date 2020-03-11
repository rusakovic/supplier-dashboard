import _ from 'lodash'

// we should add field Total = quantity * price from our data
// transform quantity to integer by adding '+'
export const createOrdersWithTotalSum = orders => {
  const ordersWithSum = orders.map(order => {
    return {
      ...order,
      total: +(order.quantity * order.price),
      quantity: +order.quantity
    }
  })
  return ordersWithSum
}

// grouping and summing orders by groupOrdersBy for further sorting
export const groupByArray = (orders, groupOrdersBy) => {
  const grouped = _.groupBy(orders, groupOrdersBy)

  // console.log('grouped', grouped)
  const totalAndQuantityByKey = _(grouped)
    .map((obj, key) => ({
      productId: key,
      total: _(obj).sumBy('total'),
      quantity: _(obj).sumBy('quantity'),
      productName: obj[0].productName
    }))
    .value()

  // console.log('totalAndQuantityByKey', totalAndQuantityByKey)
  return totalAndQuantityByKey
}

// Sort by 'total' or 'quantity' and show desc order of 'numberToDisplay' quantity
export const sortByValue = (orders, sortBy, numberToDisplay) => {
  const sortedArray = _(orders)
    .orderBy([sortBy], ['desc'])
    .value()
    .slice(0, numberToDisplay)
  // console.log('sortedArray', sortedArray)
  return sortedArray
}

// transform data for filters dropdown
// for example
// const Countries = [
// { label: 'Albania', value: 355 },
// { label: 'Argentina', value: 54 },
// ]
export const transformDataForDropdowns = (ordersWithTotalSum, groupName) => {
  const groupedBySupplier = _.groupBy(ordersWithTotalSum, groupName)

  const groupLabelAndValue = _(groupedBySupplier)
    .map((obj, key) => ({
      label: key,
      value: key
    }))
    .value()
  return groupLabelAndValue
}

// extract value of filters from {label: "food", value: "food"} => ["food"]
// return empty [] if filters not selected
export const transformedSelectedFilters = selectedFilters => {
  return (
    selectedFilters?.map(filter => {
      return filter.value
    }) ?? []
  )
}

// groupBy and summurize Volume (in Eur) or Quantity
export const groupedBy = (array, groupBy, sumBy, graphType) => {
  const groupByParametr = _.groupBy(array, groupBy)

  if (graphType === 'line') {
    const transformedWithTotal = _(groupByParametr)
      .map((obj, key) => ({
        // x - orderedOn, y - total
        x: key,
        y: _(_(obj).sumBy(sumBy)).round(2)
      }))
      .value()
    console.log('transformedWithTotal', transformedWithTotal)
    return transformedWithTotal
  } else if (graphType === 'bar') {
    const transformedWithTotal = _(groupByParametr)
      .map((obj, key) => ({
        supplier: key,
        [sumBy]: _(_(obj).sumBy(sumBy)).round(2)
      }))
      .value()
    return transformedWithTotal
  }
}
