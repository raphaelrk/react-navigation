import * as React from 'react';
import { NativeModules } from 'react-native';

import StackViewLayout from './StackViewLayout';
import Transitioner from '../Transitioner';
import NavigationActions from '../../NavigationActions';
import TransitionConfigs from './StackViewTransitionConfigs';

const NativeAnimatedModule =
  NativeModules && NativeModules.NativeAnimatedModule;

class StackView extends React.Component {
  static defaultProps = {
    navigationConfig: {
      mode: 'card',
    },
  };

  render() {
    return (
      <Transitioner
        render={this._render}
        configureTransition={this._configureTransition}
        navigation={this.props.navigation}
        sceneDescriptors={this.props.sceneDescriptors}
        onTransitionStart={this.props.onTransitionStart}
        onTransitionEnd={(lastTransition, transition) => {
          const { onTransitionEnd, navigation } = this.props;
          navigation.dispatch(NavigationActions.completeTransition());
          onTransitionEnd && onTransitionEnd(lastTransition, transition);
        }}
      />
    );
  }

  _configureTransition = (transitionProps, prevTransitionProps) => {
    return {
      ...TransitionConfigs.getTransitionConfig(
        this.props.navigationConfig.transitionConfig,
        transitionProps,
        prevTransitionProps,
        this.props.navigationConfig.mode === 'modal'
      ).transitionSpec,
      useNativeDriver: !!NativeAnimatedModule,
    };
  };

  _render = props => {
    const { screenProps, navigationConfig } = this.props;
    return (
      <StackViewLayout
        {...navigationConfig}
        screenProps={screenProps}
        sceneDescriptors={this.props.sceneDescriptors}
        {...props}
      />
    );
  };
}

export default StackView;
