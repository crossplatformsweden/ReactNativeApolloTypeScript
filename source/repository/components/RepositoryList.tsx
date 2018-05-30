import * as React from 'react';
import { Text, ScrollView} from 'react-native';
import { RepoEdge, RepoNodeItem } from '../../Types';
import RepositoryItem from './RepositoryItem';

export interface IProps {
    repositories: RepoEdge;
}

const RepositoryList = ({ repositories }: IProps) =>
    <ScrollView>
        {repositories && repositories.edges.length ?
            repositories.edges.map(({ node }: { node: RepoNodeItem }) => (
                <RepositoryItem key={node.id} repository={node} />
            )) : <Text>No repositores</Text>}
    </ScrollView>;

export default RepositoryList;