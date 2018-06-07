import * as React from 'react';
import { View } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import * as Types from '../Types';
import Theme from '../Theme';
import ToggleSelectRepository from '../repository/resolvers/ToggleSelectRepository';

const inMemoryCache = new InMemoryCache();

/**
 * Global error handling. Allows sending GraphQL errors to for example Sentry insights
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log('** GRAPHQL ERROR **');
        console.log(graphQLErrors);
    }

    if (networkError) {
        console.log('** NETWORK ERROR **');
        console.log(networkError);
    }
});

const httpLink = (uri: string = 'https://api.github.com/graphql', token: string = null) => new HttpLink({
    uri,
    headers: {
        // @ts-ignore
        authorization: 'Bearer ' + token,
    },
});

const initialState: Types.IApplicationCache = {
    selectedRepositoryIds: new Array<string>('MDEwOlJlcG9zaXRvcnk4OTMzMDY1Mg=='),
};

/**
 * Local state manager for Apollo
 */
const stateLink = withClientState({
    cache: inMemoryCache,
    defaults: initialState,
    resolvers: {
        Mutation: {
            ToggleSelectRepository,
        },
    },
});

/**
 * Implementation of ApolloClient with link and cache
 * @param uri optional URI. Otherwise GitHub is used
 * @param token optional token. Required for GitHub
 */
export const CreateApolloClient = (uri: string = 'https://api.github.com/graphql', token: string = null) => new ApolloClient({
    link: ApolloLink.from([errorLink, stateLink, httpLink(uri, token)]),
    cache: inMemoryCache,
});

/**
 * Mock to get proper typing
 */
const ApolloClientMock = new ApolloClient({
    link: ApolloLink.from([]),
    cache: inMemoryCache,
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