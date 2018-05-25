// navigator/components/AppNavigator
// @ts-nocheck
import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Modal, Tabs, Reducer } from 'react-native-router-flux';
import {
  FontAwesome,
  // @ts-ignore - bad mappings
} from '@expo/vector-icons';

import Theme, { Colors, TabIconSize } from './Theme';

// Component views used in navigation
import MainContainer from './main/MainContainer';
import { NavigationConstants } from './Types';

// interface RouterProps {
//   sceneStyle?: any;
//   backAndroidHandler?: Function;
//   createReducer?: Function;
//   wrapBy?: Function;
//   dispatch?: any;
// }

const homeIcon = () => (
  <FontAwesome name='home' size={TabIconSize} style={Theme.tabBarIcon} />
);

// const profileIcon = () => (
//   <FontAwesome
//     name='user-circle-o'
//     size={TabIconSize}
//     style={Theme.tabBarIcon}
//   />
// );

// TODO: Prefix breaks current version: use when stable
/**
 * App uri prefix used to deep link into the app
 *
 * On Android, the URI prefix typically contains a host in addition to scheme
 */
export const AppLink =
  Platform.OS === 'android' ? 'myapp://myapp/' : 'myapp://';

const navReducer = (params: any) => {
  const defaultReducer = new Reducer(params);
  return (state: any, action: any) => {
    return defaultReducer(state, action);
  };
};

/**
 * Navigation routes for application
 */
const Navigator = () => (
  // @ts-ignore
  <Router createReducer={navReducer}>
    <Scene key='root' style={Theme.container} hideNavBar panHandlers={null}>
      <Modal
        // @ts-ignore
        key='modal'
        style={Theme.container}
      >
        <Tabs
          activeBackgroundColor={Colors.CrossLightBlue}
          inactiveBackgroundColor={Colors.CrossDarkBlue}
          inactiveTintColor='grey'
          activeTintColor={Colors.CrossYellow}
          tabBarPosition='bottom'
          tabBarStyle={Theme.tabBar}
          lazy
          key='tabMain'
        >
          <Scene
            hideNavBar
            tintColor={Colors.CrossYellow}
            titleStyle={Theme.tabBarTitle}
            key={NavigationConstants.MAP}
            component={MainContainer}
            tabBarLabel='Home'
            // @ts-ignore - bad TS map
            icon={homeIcon}
          />
          {/* <Scene
          hideNavBar
          key={NavigationConstants.PROFILE}
          component={ProfileContainer}
          tintColor={Colors.CrossYellow}
          tabBarLabel='Me'
          titleStyle={{ color: 'white' }}
          // @ts-ignore - bad TS map
          icon={profileIcon}
        /> */}
        </Tabs>
        {/* <Scene
        key={NavigationConstants.LOGIN}
        component={LoginContainer}
        hideNavBar
        back={false}
        direction='vertical'
      /> */}
      </Modal>
    </Scene>
  </Router>
);

export default Navigator;