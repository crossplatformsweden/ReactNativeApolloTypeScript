import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import { RepoEdge, RepoNodeItem } from '../../Types';
import RepositoryItem from './RepositoryItem';

export interface IProps {
    repositories: RepoEdge;
}

interface IState {
    selectedRepositoryIds: Array<string>;
}

class RepositoryList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedRepositoryIds: new Array<string>(),
        };
        this.toggleRepository = this.toggleRepository.bind(this);
    }

    render() {
        return (
            <ScrollView>
                {this.props.repositories && this.props.repositories.edges.length ?
                    this.props.repositories.edges.map(({ node }: { node: RepoNodeItem }) => (
                        <RepositoryItem
                            key={node.id}
                            repository={node}
                            toggleSelectedRepository={this.toggleRepository}
                            selectedRepositoryIds={this.state.selectedRepositoryIds} />
                    )) : <Text>No repositores</Text>};
    </ScrollView>);
    }

    /**
     * Toggle selection state of provided repository id
     */
    toggleRepository = (id: string, isSelected: boolean) => {
        console.log(`Toggle id ${id} to ${isSelected}`);
        let {selectedRepositoryIds} = this.state;

        selectedRepositoryIds = isSelected === true ?
        selectedRepositoryIds.concat(id) :
        selectedRepositoryIds.filter(itemId => itemId !== id);
        this.setState({selectedRepositoryIds});
    }
}

export default RepositoryList;