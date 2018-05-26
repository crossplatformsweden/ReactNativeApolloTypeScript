import React from 'react';
import {View} from 'react-native';
import Navigator from './Navigator';
import Theme from './Theme';
import ApolloClientBase from './apollo/ApolloClientBase';

const appWithNavigator = () => (
    <View style={Theme.container}>
        <Navigator />
    </View>
);

// Apollo wrapper (HOC)
const AppContainer = ApolloClientBase(appWithNavigator);

export default AppContainer;