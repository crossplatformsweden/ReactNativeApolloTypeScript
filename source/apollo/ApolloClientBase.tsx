import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { View } from 'react-native';
import Theme from '../Theme';

console.log('** GitHub Access Token **');
// @ts-ignore
console.log( process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN);

/**
 * HttpLink adapter for GitHub graphql API
 */
const gitHubHttpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        // @ts-ignore
        authorization: 'Bearer ' + process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN,
    },
});

/**
 * Holds the app cache
 */
export const cache = new InMemoryCache();

export const gitHubClient = new ApolloClient({
    link: gitHubHttpLink,
    cache,
});

/**
 * Wraps the component in ApolloProvider, passing props
 */
// @ts-ignore
const ApolloClientBase = <P, S>(WrappedComponent: React.ComponentType<P>) => {
    const implementation = () => (
        <ApolloProvider client={gitHubClient}>
            <View style={Theme.container}>
                <WrappedComponent {...this.props} />
            </View>
        </ApolloProvider>
    );

    console.log('** APOLLO CLIENT **');
    console.log(gitHubClient);
    return implementation;
};

export default ApolloClientBase;