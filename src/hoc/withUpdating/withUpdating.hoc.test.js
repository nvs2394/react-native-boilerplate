import React from 'react'
import { View } from 'react-native'
import { shallow } from 'enzyme'
import { isFunction } from 'ramda-adjunct'

import { snapTest } from '../../utils/test.util'

import withUpdatingConfig, {
  simulatePending,
  withUpdating
} from './withUpdating.hoc'

jest.mock('recompose', () => {
  const origin = require.requireActual('recompose')
  return {
    ...origin,
    withState: stateName => `withState-${stateName}`,
    withProps: getProps => {
      const newProps = getProps({ createGoal: jest.fn() })
      const propKeys = Object.keys(newProps).toString()
      return `withProps-[${propKeys}]`
    },
    compose: (...args) => args
  }
})

describe('withUpdating', () => {
  const Component = withUpdating(View)
  const wrapper = shallow(<Component />)
  snapTest(wrapper, [
    {
      props: { updating: true },
      description: 'updating state'
    },
    {
      props: { updating: false },
      description: 'normal state'
    }
  ])
})

describe('withUpdatingConfig', () => {
  test('should return expected list of HOCs', () => {
    const actual = withUpdatingConfig(['createGoal'])
    const expected = [
      'withState-updating',
      'withProps-[createGoal]',
      withUpdating
    ]
    expect(actual).toEqual(expected)
  })
})

describe('simulatePending', () => {
  const updates = ['getArticleList']
  const props = {
    setUpdating: jest.fn(),
    getArticleList: jest.fn(() => Promise.resolve([]))
  }
  test('should call setUpdating before each update on SUCESS', async () => {
    const actual = simulatePending(updates)(props)
    expect(isFunction(actual.getArticleList)).toBe(true)
    await actual.getArticleList()
    expect(props.setUpdating).toBeCalled()
  })
  test('should call setUpdating before each update on FAIL', async () => {
    const actual = simulatePending(updates)({
      ...props,
      getArticleList: jest.fn(() => Promise.reject(new Error('FAIL')))
    })
    await actual.getArticleList()
    expect(props.setUpdating).toBeCalled()
  })
})
