import React from 'react';
import {View} from 'react-native';
import Navigator from './Navigator';
import Theme from './Theme';

const AppContainer = () => (
    <View style={Theme.container}>
        <Navigator />
    </View>
);

export default AppContainer;