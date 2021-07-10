import React from 'react'
import { shallow } from 'enzyme/build'
import ProductList from '../../../../components/product-list/product-list.component'
import GroceryMock from '../../../mocks/grocery/grocery.mock'

describe('Product List', () => {
  let wrapper = null
  const products = GroceryMock.getGrocery()

  beforeEach(() => {
    wrapper = shallow(
      <ProductList products={products} />
    )
  })

  it('Should render Product List component', () => {
    expect(wrapper.find('.product-list').length).toBe(1)
  })

  it('Should render Product List items', () => {
    expect(wrapper.find('.product-list__item').length).toBe(products.length)
  })
})
