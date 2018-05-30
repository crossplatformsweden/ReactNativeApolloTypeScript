import * as React from 'react';
import { View, Text, Linking, Button } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { RepoNodeItem } from '../../Types';
import Theme from '../../Theme';
import { FormValidationMessage } from 'react-native-elements';
import BusyIndicator from '../../core/components/BusyIndicator';

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
                variables={{ id: repository.id }}>
                {(addStar, { loading, data, error }: { loading: boolean, data: any, error?: Error }) => {
                    if (error) {
                        return <FormValidationMessage>{error.message}</FormValidationMessage>;
                    }
                    if (loading) {
                        return <BusyIndicator isBusy message='Star rising..' />;
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
                    variables={{ id: repository.id }}>
                    {(removeStar, { loading, data, error }: { loading: boolean, data: any, error?: Error }) => {
                        if (error) {
                            return <FormValidationMessage>{error.message}</FormValidationMessage>;
                        }
                        if (loading) {
                            return <BusyIndicator isBusy message='Star falling..' />;
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