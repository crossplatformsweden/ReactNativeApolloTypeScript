import * as React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { View } from 'react-native';
import Theme from '../Theme';

interface IErrorLink {
    graphQLErrors?: any;
    networkError?: Error;
}

/**
 * Global error handling. Allows sending GraphQL errors to for example Sentry insights
 */
const errorLink = ({ graphQLErrors, networkError }: IErrorLink) => {
    if (graphQLErrors) {
        console.log('** GRAPHQL ERROR **');
        console.log(graphQLErrors);
    }

    if (networkError) {
        console.log('** NETWORK ERROR **');
        console.log(networkError);
    }
};

// @ts-ignore
const token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
console.log('** GitHub Access Token **');
console.log(token);

const request = async (operation: any) => {
    operation.setContext({
        headers: {
            authorization: 'Bearer ' + token,
        },
    });
};

/**
 * Implementation of ApolloClient with link and cache
 */
export const GitHubClient = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    onError: errorLink,
    request,
});

export type GitHubClient = typeof GitHubClient;

/**
 * Wraps the component in ApolloProvider, passing props
 */
// @ts-ignore
const ApolloClientBase = <P, S>(WrappedComponent: React.ComponentType<P>) => {
    const implementation = () => (
        // @ts-ignore
        <ApolloProvider client={GitHubClient}>
            <View style={Theme.container}>
                <WrappedComponent {...this.props} />
            </View>
        </ApolloProvider>
    );

    console.log('** APOLLO CLIENT **');
    console.log(GitHubClient);
    return implementation;
};

export default ApolloClientBase;