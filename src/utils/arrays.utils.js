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

// grouping and summing orders by Product IDs for further sorting
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
  // console.log('groupedBySupplier', groupedBySupplier)

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
