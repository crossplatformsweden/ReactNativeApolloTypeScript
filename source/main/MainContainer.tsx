import * as React from 'react';
import { Text, View, Linking } from 'react-native';
import Theme from '../Theme';
import CompanySearch from '../company/components/CompanySearch';

const url = 'https://www.robinwieruch.de/react-graphql-apollo-tutorial/';

const MainContainer = () => (
  <View style={[Theme.container, Theme.paddingDefault]}>
    <Text style={Theme.title}>React Native with Apollo for GraphQL</Text>
    <Text style={Theme.link} onPress={() => Linking.openURL(url)}>{url}</Text>
    <Text style={Theme.para}>Shake your phone to open the developer menu.</Text>
    <CompanySearch />
  </View>
);

export default MainContainer;