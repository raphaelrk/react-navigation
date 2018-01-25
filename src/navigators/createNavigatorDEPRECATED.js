import React from 'react';

export default function createNavigatorDEPRECATED(
  router,
  routeConfigs,
  navigatorConfig,
  navigatorType
) {
  return NavigationView => {
    class Navigator extends React.Component {
      static router = router;

      static routeConfigs = routeConfigs;
      static navigatorConfig = navigatorConfig;
      static navigatorType = navigatorType;
      static navigationOptions = null;

      render() {
        return <NavigationView {...this.props} router={router} />;
      }
    }

    return Navigator;
  };
}
