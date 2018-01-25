import React from 'react';

import getChildEventSubscriber from '../getChildEventSubscriber';
import addNavigationHelpers from '../addNavigationHelpers';

function createNavigator(NavigatorView, router, navigationConfig) {
  class Navigator extends React.Component {
    static router = router;
    static navigationOptions = null;

    render() {
      const { navigation, screenProps } = this.props;
      const { dispatch, state, addListener } = navigation;
      const { routes, index, isTransitioning } = state;

      const sceneDescriptors = routes.map(route => {
        const getComponent = () =>
          router.getComponentForRouteName(route.routeName);

        const childNavigation = addNavigationHelpers({
          dispatch,
          state: route,
          addListener: getChildEventSubscriber(addListener, route.key),
        });
        const options = router.getScreenOptions(childNavigation, screenProps);
        return {
          getComponent,
          options,
          state: route,
          navigation: childNavigation,
        };
      });

      return (
        <NavigatorView
          navigation={navigation}
          navigationConfig={navigationConfig}
          sceneDescriptors={sceneDescriptors}
          index={index}
          isTransitioning={isTransitioning}
        />
      );
    }
  }
  return Navigator;
}

export default createNavigator;
