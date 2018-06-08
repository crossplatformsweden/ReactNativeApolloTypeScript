import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { View } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';
import Theme from '../Theme';
import { GraphQLDefinitions } from '../Types';

const inMemoryCache = new InMemoryCache();

/**
 * Mocks the queries and mutations so they're testable
 */
const mockResolvers = {
    Query: {
        // @ts-ignore - mock
        organization: (parent: any, { login }: { login: string }) => ({
            name: login,
            url: `https://github.com/${login}`,
            repositories: {
                edges: [
                    {
                        node: {
                            id: '1',
                            name: 'the-road-to-learn-react',
                            url: `https://github.com/${login}/the-road-to-learn-react`,
                            viewerHasStarred: false,
                        },
                    },
                    {
                        node: {
                            id: '2',
                            name: 'the-road-to-learn-react-chinese',
                            url: `https://github.com/${login}/the-road-to-learn-react-chinese`,
                            viewerHasStarred: false,
                        },
                    },
                ],
            },
        }),
    },
    Mutation: {
        // @ts-ignore - mock
        addStar: (parent: any, { input }: { input: any }) => ({
            starrable: {
                id: input.starrableId,
                viewerHasStarred: true,
            },
        }),
    },
    Starrable: {
        __resolveType: () => 'Repository',
    },
};

const executableSchema = makeExecutableSchema({
    typeDefs: GraphQLDefinitions,
    resolvers: mockResolvers,
});

const schemaLink = new SchemaLink({ schema: executableSchema });

export const apolloClientMock = new ApolloClient({
    link: schemaLink,
    cache: inMemoryCache,
});

/**
 * Creates a mock client based on GitHub API and wraps provided child in an ApolloProvider
 * @param WrappedComponent Child component
 */
// @ts-ignore
const ApolloClientMock = <P, S>(
    WrappedComponent: React.ComponentType<P>) => {
    const implementation = () => (
        <ApolloProvider client={apolloClientMock}>
            <View style={Theme.container}>
                <WrappedComponent />
            </View>
        </ApolloProvider>
    );

    return implementation;
};

export default ApolloClientMock;