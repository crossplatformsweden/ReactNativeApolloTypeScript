import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RepoEdge } from '../../Types';
import Theme from '../../Theme';

export interface IProps {
    repositories: RepoEdge;
}

const RepositoryList = ({ repositories }: IProps) =>
    <View>
        <ScrollView>
            {repositories && repositories.edges.length ?
                repositories.edges.map(({ node }) => (
                    <View key={node.id} style={Theme.para}>
                        <Text style={Theme.title}>{node.name}</Text>
                        <Text>{node.stargazers.totalCount} Stars</Text>
                        <Text style={Theme.para}>{node.descriptionHTML}</Text>
                    </View>
                )) : <Text>No repositores</Text>}
        </ScrollView>
    </View>;

export default RepositoryList;