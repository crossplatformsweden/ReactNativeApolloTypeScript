import * as React from 'react';
import { Text, View, Linking } from 'react-native';
import Theme from './Theme';
import GithubComponent from './githubgraphql/GithubComponent';

const url = 'https://www.robinwieruch.de/react-graphql-apollo-tutorial/';

const AppContainer = () => (
  <View style={[Theme.container, { marginTop: 30 }]}>
    <Text style={Theme.title}>React Native with Apollo for GraphQL</Text>
    <Text style={Theme.link} onPress={() => Linking.openURL(url)}>{url}</Text>
    <Text style={Theme.para}>Shake your phone to open the developer menu.</Text>
    <GithubComponent />
  </View>
);

export default AppContainer;