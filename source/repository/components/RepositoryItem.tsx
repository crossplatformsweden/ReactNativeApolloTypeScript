import * as React from 'react';
import { View, Text, Linking, Button } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { RepoNodeItem, StarMutationData, RemoveStar, AddStar } from '../../Types';
import Theme from '../../Theme';
import { FormValidationMessage } from 'react-native-elements';
import BusyIndicator from '../../core/components/BusyIndicator';
import { GitHubClient } from '../../apollo/ApolloClientBase';
import RepositoryFragment from '../../fragments/RepositoryFragment';

export interface IProps {
    repository: RepoNodeItem;
}

/**
 * GraphQL mutation to add a star for the specified repository "id"
 */
const StarRepositoryMutation = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

/**
 * GraphQL mutation to add a star for the specified repository "id"
 */
const RemoveRepositoryStarMutation = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

/**
 * Occurs when add star mutation completes
 * @param client {@type GitHubClient} instance
 * @param data {@type StarMutationData} of resulting mutation
 */
const updateAddStar = (client: GitHubClient, data: StarMutationData) => {
    const starId = (data.data as AddStar).addStar.starrable.id;
    if (!starId) {
        return;
    }

    // Get repository from cache
    const cacheRepo: RepoNodeItem = client.readFragment({
        id: `Repository:${starId}`,
        fragment: RepositoryFragment,
    });

    // Update count of stargazers
    const newCount = cacheRepo.stargazers.totalCount + 1;

    // Write to cache
    client.writeFragment({
        id: `Repository:${starId}`,
        fragment: RepositoryFragment,
        data: {
            ...cacheRepo,
            stargazers: {
                ...cacheRepo.stargazers,
                totalCount: newCount,
            },
        },
    });
    console.log('Updated cache');
};

/**
 * Occurs when remove star mutation completes
 * @param client {@type GitHubClient} instance
 * @param data {@type StarMutationData} of resulting mutation
 */
const updateRemoveStar = (client: GitHubClient, data: StarMutationData) => {
    const starId = (data.data as RemoveStar).removeStar.starrable.id;
    if (!starId) {
        return;
    }

    // Get repository from cache
    const cacheRepo: RepoNodeItem = client.readFragment({
        id: `Repository:${starId}`,
        fragment: RepositoryFragment,
    });

    // Update count of stargazers
    const newCount = cacheRepo.stargazers.totalCount - 1;

    // Write to cache
    client.writeFragment({
        id: `Repository:${starId}`,
        fragment: RepositoryFragment,
        data: {
            ...cacheRepo,
            stargazers: {
                ...cacheRepo.stargazers,
                totalCount: newCount,
            },
        },
    });
    console.log('Updated cache');
};

const RepositoryItem = ({ repository }: IProps) =>

    <View style={Theme.para}>
        <Text style={Theme.title}>{repository.name}</Text>
        <Text>{repository.stargazers.totalCount} Stars</Text>
        <Text style={Theme.title}>Url</Text>
        <Text style={Theme.link}
            onPress={() =>
                Linking.openURL(repository.url)}>{repository.url}</Text>
        <Text style={Theme.para}>{repository.descriptionHTML}</Text>
        {!repository.viewerHasStarred ? (
            <Mutation
                // @ts-ignore - mappings incorrect for Mutations
                mutation={StarRepositoryMutation}
                update={updateAddStar}
                variables={{ id: repository.id }}>
                {(addStar, { loading, data, error }: { loading: boolean, data: StarMutationData, error?: Error }) => {
                    if (error) {
                        return <FormValidationMessage>{error.message}</FormValidationMessage>;
                    }
                    if (loading) {
                        return <BusyIndicator isBusy message='Star rising..' />;
                    }

                    if (data) {
                        console.log('** ADD STAR MUTATION DATA **');
                        console.log(data);
                    }
                    return (
                        <Button onPress={() => addStar()} title={'Star'} />
                    );
                }
                }
            </Mutation>
        ) :
            (
                <Mutation
                    // @ts-ignore - mappings incorrect for Mutations
                    mutation={RemoveRepositoryStarMutation}
                    update={updateRemoveStar}
                    variables={{ id: repository.id }}>
                    {(removeStar, { loading, data, error }: { loading: boolean, data: any, error?: Error }) => {
                        if (error) {
                            return <FormValidationMessage>{error.message}</FormValidationMessage>;
                        }
                        if (loading) {
                            return <BusyIndicator isBusy message='Star falling..' />;
                        }

                        if (data) {
                            console.log('** REMOVE STAR MUTATION DATA **');
                            console.log(data);
                        }

                        return (
                            <Button onPress={() => removeStar()} title={'Remove Star'} />
                        );
                    }
                    }
                </Mutation>)
        }
    </View>;

export default RepositoryItem;