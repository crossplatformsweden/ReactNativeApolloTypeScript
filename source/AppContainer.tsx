import React from 'react';
import {View} from 'react-native';
import Navigator from './Navigator';
import Theme from './Theme';
import ApolloClientBase from './apollo/ApolloClientBase';

// @ts-ignore
const token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
console.log('** GitHub Access Token **');
console.log(token);

const appWithNavigator = () => (
    <View style={Theme.container}>
        <Navigator />
    </View>
);

// Apollo wrapper (HOC)
const AppContainer = ApolloClientBase(appWithNavigator, undefined, token);

export default AppContainer;