// @flow
import { compose, setStatic, withHandlers, lifecycle } from 'recompose'

import I18n from '../../i18n'
import { withApp } from '../../hoc'
import { getNavState } from '../Navigation/Navigation.util'

import HomeView from './Home.view'

const navigationOptions = ({ navigation }) => ({
  tabBarLabel: I18n.t('home.screen.title'),
  headerTitle: getNavState('title', navigation) || I18n.t('home.screen.title')
})
const handlers = {
  TOGGLE_LANGUAGE: ({ setLanguage, navigation }) => lang => () => {
    I18n.defaultLocale = lang
    I18n.locale = lang
    setLanguage(lang)
    navigation.setParams({
      title: I18n.t('home.screen.title')
    })
  }
}

export default compose(
  setStatic('navigationOptions', navigationOptions),
  withApp(),
  withHandlers(handlers),
  lifecycle({
    componentWillMount() {
      const { language } = this.props
      // reset language state from storage
      I18n.defaultLocale = language
      I18n.locale = language
    }
  })
)(HomeView)
