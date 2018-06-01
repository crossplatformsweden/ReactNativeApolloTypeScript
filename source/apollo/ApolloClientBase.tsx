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

const request = (token: string = null) => async (operation: any) => {
    operation.setContext({
        headers: {
            authorization: 'Bearer ' + token,
        },
    });
};

/**
 * Implementation of ApolloClient with link and cache
 * @param uri optional URI. Otherwise GitHub is used
 * @param token optional token. Required for GitHub
 */
export const CreateApolloClient = (uri: string = 'https://api.github.com/graphql', token: string = null) => new ApolloClient({
    uri,
    onError: errorLink,
    request: request(token),
});

/**
 * Mock to get proper typing
 */
const ApolloClientMock = new ApolloClient({
    uri: '',
});

export type CreateApolloClient = typeof ApolloClientMock;

/**
 * Wraps the component in ApolloProvider, passing props
 * @param WrappedComponent calling React component
 * @param uri optional URI. Otherwise GitHub is used
 * @param token optional token. Required for GitHub
 */
// @ts-ignore
const ApolloClientBase = <P, S>(WrappedComponent: React.ComponentType<P>, uri: string = 'https://api.github.com/graphql', token: string = null) => {
    console.log('** URI**');
    console.log(uri);

    const implementation = () => (
        // @ts-ignore
        <ApolloProvider client={CreateApolloClient(uri, token)}>
            <View style={Theme.container}>
                <WrappedComponent {...this.props} />
            </View>
        </ApolloProvider>
    );

    return implementation;
};

export default ApolloClientBase;