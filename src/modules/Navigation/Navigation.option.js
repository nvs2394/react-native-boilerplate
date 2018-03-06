// @flow
import React from 'react'
import { TabBarBottom } from 'react-navigation'
import type { NavigationScreenConfigProps } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import { COLORS } from '../../themes'

const stackOptions = {
  headerStyle: {
    backgroundColor: '#292D36'
  },
  headerTintColor: COLORS.white,
  headerTitleStyle: {
    // fontWeight: 'bold'
  }
}
const tabOptions = {
  navigationOptions: ({
    navigation
  }: NavigationScreenConfigProps) => ({
    tabBarIcon: ({ focused, tintColor }: Object) => {
      const { routeName } = navigation.state
      const outline = focused ? '' : '-outline'
      const iconNames = {
        Home: `ios-home${outline}`,
        Goal: `ios-list-box${outline}`
      }

      return (
        <Ionicons
          name={iconNames[routeName]}
          size={25}
          color={tintColor}
        />
      )
    }
  }),
  tabBarOptions: {
    // activeTintColor: 'yellow',
    inactiveTintColor: COLORS.gray,
    activeBackgroundColor: COLORS.base,
    inactiveBackgroundColor: COLORS.base,
    labelStyle: {
      fontSize: 14
    },
    style: {
      backgroundColor: COLORS.base
    }
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false
}

export { stackOptions, tabOptions }
