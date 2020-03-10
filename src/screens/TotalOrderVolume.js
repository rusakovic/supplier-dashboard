import React, { useEffect, useState } from 'react'
import { useStore, SET_TOTAL_ORDERS_VOLUME } from '../store/store'
import _ from 'lodash'
import Select from 'react-select'

import {
  transformDataForDropdowns,
  transformedSelectedFilters
} from '../utils/arrays.utils'
import ResponsiveLineComponent from '../components/ResponsiveLine'

const TotalOrderVolume = () => {
  // +++++++++++++++++++++++++++++++++++++++++++++
  // STATES
  const { state, dispatch } = useStore()
  const ordersWithTotalSum = state.ordersWithTotalSum
  const [suppliersForFiltering, setSuppliersForFiltering] = useState([])
  const [categoryForFiltering, setCategoryForFiltering] = useState([])
  const [subCategoryForFiltering, setSubCategoryForFiltering] = useState([])
  const [selectedFilters, setSelectedFilters] = useState({
    suppliers: [],
    productCategory1: [],
    productCategory2: []
  })
  const [filteredOrdersOutput, setFilteredOrdersOutput] = useState(
    ordersWithTotalSum
  )

  // +++++++++++++++++++++++++++++++++++++++++++++
  // transform orders data for graph presentation
  useEffect(() => {
    // if filters not selected we should reset initial data to 'ordersWithTotalSum',
    // else - show filtered data
    if (
      selectedFilters.suppliers.length === 0 &&
      selectedFilters.productCategory1.length === 0 &&
      selectedFilters.productCategory2.length === 0
    ) {
      setFilteredOrdersOutput(ordersWithTotalSum)
    }

    // group data by Date
    const groupedByOrderedOn = _.groupBy(filteredOrdersOutput, 'orderedOn')
    // x - orderedOn, y - total
    const orderedOnAndTotal = _(groupedByOrderedOn)
      .map((obj, key) => ({
        x: key,
        y: _(_(obj).sumBy('total')).round(2)
      }))
      .value()

    // +++++++++++++++++++++++++++++++++++++++++++++
    // transform data according to ResponsiveLine component
    // https://nivo.rocks/line/ -> tab 'data'
    let formatedArrayForGraph = []
    formatedArrayForGraph.push({
      id: 'orders',
      data: orderedOnAndTotal
    })

    // set data to global store
    dispatch({
      type: SET_TOTAL_ORDERS_VOLUME,
      totalOrdersVolume: formatedArrayForGraph
    })
  }, [filteredOrdersOutput, dispatch, ordersWithTotalSum])

  // +++++++++++++++++++++++++++++++++++++++++++++
  // transform data for filters dropdown
  useEffect(() => {
    // SUPLLIERS
    const suppliers = transformDataForDropdowns(
      filteredOrdersOutput,
      'supplier'
    )
    setSuppliersForFiltering(suppliers)

    // CATEGORY
    const category = transformDataForDropdowns(
      filteredOrdersOutput,
      'productCategory1'
    )
    setCategoryForFiltering(category)

    // SUBCATEGORY
    const subCategory = transformDataForDropdowns(
      filteredOrdersOutput,
      'productCategory2'
    )
    setSubCategoryForFiltering(subCategory)
  }, [ordersWithTotalSum, filteredOrdersOutput])

  // +++++++++++++++++++++++++++++++++++++++++++++
  // filtering data for graph with filters
  useEffect(() => {
    const filreredOrdersWithTotalSum = ordersWithTotalSum.filter(
      ({ supplier, productCategory1, productCategory2 }) => {
        const isSupplierFiltered = !!selectedFilters.suppliers.length
          ? selectedFilters.suppliers.includes(supplier)
          : true
        const isCategoryFiltered = selectedFilters.productCategory1.length
          ? selectedFilters.productCategory1.includes(productCategory1)
          : true
        const isSubCategoryFiltered = selectedFilters.productCategory2.length
          ? selectedFilters.productCategory2.includes(productCategory2)
          : true
        return (
          // return true if filter is empty
          isSupplierFiltered && isCategoryFiltered && isSubCategoryFiltered
        )
      }
    )
    setFilteredOrdersOutput(filreredOrdersWithTotalSum)
  }, [selectedFilters, ordersWithTotalSum])

  // +++++++++++++++++++++++++++++++++++++++++++++
  // HANDLERS FOR DROPDOWN MENUS
  // handler when Supplier is chosen
  const supplierFilterOnChangeHandler = selectedSuppliers => {
    // return empty [] if filters not selected
    const transformedSelectedSuppliers = transformedSelectedFilters(
      selectedSuppliers
    )

    setSelectedFilters(prevState => {
      return {
        ...prevState,
        suppliers: transformedSelectedSuppliers
      }
    })
  }

  // handler when Category is chosen
  const categoryFilterOnChangeHandler = selectedCategories => {
    // return empty [] if filters not selected
    const transformedSelectedCategories = transformedSelectedFilters(
      selectedCategories
    )

    setSelectedFilters(prevState => {
      return {
        ...prevState,
        productCategory1: transformedSelectedCategories
      }
    })
  }

  // handler when subCategory is chosen
  const subCategoryFilterOnChangeHandler = selectedSubCategories => {
    // return empty [] if filters not selected
    const transformedSelectedSubCategories = transformedSelectedFilters(
      selectedSubCategories
    )

    setSelectedFilters(prevState => {
      return {
        ...prevState,
        productCategory2: transformedSelectedSubCategories
      }
    })
  }

  return (
    <div>
      <h2>TotalOrderVolume</h2>
      <Select
        placeholder='Select supplier'
        options={suppliersForFiltering}
        isMulti
        onChange={e => supplierFilterOnChangeHandler(e)}
      />
      <Select
        placeholder='Select category'
        options={categoryForFiltering}
        isMulti
        onChange={e => categoryFilterOnChangeHandler(e)}
      />
      <Select
        placeholder='Select subcategory'
        options={subCategoryForFiltering}
        isMulti
        onChange={e => subCategoryFilterOnChangeHandler(e)}
      />

      <ResponsiveLineComponent data={state.totalOrdersVolume} />
    </div>
  )
}

export default TotalOrderVolume
