import * as React from 'react';
import { View, Text, Linking, Button, Switch } from 'react-native';
import { Mutation } from 'react-apollo';
import { RepoNodeItem, StarMutationData, RemoveStar, AddStar, GenericResponse } from '../../Types';
import Theme from '../../Theme';
import { FormValidationMessage } from 'react-native-elements';
import BusyIndicator from '../../core/components/BusyIndicator';
import { CreateApolloClient } from '../../apollo/ApolloClientBase';
import RepositoryFragment from '../../fragments/RepositoryFragment';
import StarRepositoryMutation, { RemoveRepositoryStarMutation } from '../../mutations/StarRepositoryMutation';
import _ from 'lodash';
import SelectRepository from '../../mutations/SelectRepository';

export interface IProps {
    repository: RepoNodeItem;
    selectedRepositoryIds: Array<string>;
}

/**
 * Occurs when add star mutation completes
 * @param client {@type GitHubClient} instance
 * @param data {@type StarMutationData} of resulting mutation
 */
const updateAddStar = (client: CreateApolloClient, data: StarMutationData) => {
    const starId = (data.data as AddStar).addStar.starrable.id;
    if (!starId) {
        return;
    }

    // Get repository from cache
    const cacheRepo: RepoNodeItem = getRepoFromCache(client, starId);

    // Update count of stargazers
    const newCount = cacheRepo.stargazers.totalCount + 1;

    // Write to cache
    writeStarCountToCache(client, starId, cacheRepo, newCount);
    console.log('Updated cache');
};

/**
 * Occurs when remove star mutation completes
 * @param client {@type GitHubClient} instance
 * @param data {@type StarMutationData} of resulting mutation
 */
const updateRemoveStar = (client: CreateApolloClient, data: StarMutationData) => {
    const starId = (data.data as RemoveStar).removeStar.starrable.id;
    if (!starId) {
        return;
    }

    // Get repository from cache
    const cacheRepo: RepoNodeItem = getRepoFromCache(client, starId);

    // Update count of stargazers
    const newCount = cacheRepo.stargazers.totalCount - 1;

    // Write to cache
    writeStarCountToCache(client, starId, cacheRepo, newCount);
    console.log('Updated cache');
};

const RepositoryItem = ({ repository, selectedRepositoryIds }: IProps) => {
    const isSelected = _.includes(selectedRepositoryIds, repository.id);
    return (
        <View style={Theme.para}>
            <View style={Theme.horizontalTopLeft}>
                <Mutation
                    // @ts-ignore - mappings incorrect for Mutations
                    mutation={SelectRepository}
                    variables={{ id: repository.id, isSelected }}>
                    {(ToggleSelectRepository, { loading, error }: GenericResponse) => {
                        if (error) {
                            return <FormValidationMessage>{error.message}</FormValidationMessage>;
                        }
                        if (loading) {
                            return <BusyIndicator isBusy message='One sec..' />;
                        }

                        return (<Switch
                            value={isSelected}
                            onValueChange={() => ToggleSelectRepository()} />);
                    }}
                </Mutation>
                <View style={Theme.verticalTopLeft}>
                    <Text style={Theme.title}>{repository.name}</Text>
                    <Text>{repository.stargazers.totalCount} Stars</Text>
                    <Text style={Theme.label}>Url</Text>
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
                            {(addStar, { loading, data, error }: GenericResponse) => {
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
                                {(removeStar, { loading, data, error }: GenericResponse) => {
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
                </View>
            </View>
        </View >);
};

export default RepositoryItem;

function writeStarCountToCache(client: CreateApolloClient, starId: string, cacheRepo: RepoNodeItem, newCount: number) {
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
}

function getRepoFromCache(client: CreateApolloClient, starId: string): RepoNodeItem {
    return client.readFragment({
        id: `Repository:${starId}`,
        fragment: RepositoryFragment,
    });
}