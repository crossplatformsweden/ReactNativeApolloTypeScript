import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import { RepoEdge, RepoNodeItem, SelectedRepositoryIdsResponse } from '../../Types';
import RepositoryItem from './RepositoryItem';
import { Query } from 'react-apollo';
import GetSelectedRepositoryIds from '../../queries/GetSelectedRepositoryIds';

export interface IProps {
    repositories: RepoEdge;
}

const RepositoryList = ({ repositories }: IProps) => (
    <Query query={GetSelectedRepositoryIds}>
        {({data}: {data: SelectedRepositoryIdsResponse}) => (

    <ScrollView>
        {repositories && repositories.edges.length ?
            repositories.edges.map(({ node }: { node: RepoNodeItem }) => (
                <RepositoryItem
                    key={node.id}
                    repository={node}
                    selectedRepositoryIds={data.selectedRepositoryIds} />
            )) : <Text>No repositores</Text>};
    </ScrollView>
        )}
    </Query>);

export default RepositoryList;