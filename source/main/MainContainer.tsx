import * as React from 'react';
import { Text, View, Linking } from 'react-native';
import Theme from '../Theme';
import CompanyView from '../company/CompanyView';

const url = 'https://www.robinwieruch.de/react-graphql-apollo-tutorial/';

const MainContainer = () => (
  <View style={[Theme.container]}>
    <Text style={Theme.title}>React Native with Apollo for GraphQL</Text>
    <Text style={Theme.link} onPress={() => Linking.openURL(url)}>{url}</Text>
    <Text style={Theme.para}>Shake your phone to open the developer menu.</Text>
    <CompanyView organization='the-road-to-learn-react' repository='the-road-to-learn-react' />
  </View>
);

export default MainContainer;