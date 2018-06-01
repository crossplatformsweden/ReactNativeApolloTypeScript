import * as React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import 'cross-fetch/polyfill';
import Theme from '../Theme';
import CompanyView from './CompanyView';

interface IState {
    organization?: string;
    repository?: string;
    searchCriteria?: {
        organization: string;
        repository?: string;
    };
}

/**
 * Queries for organization based on State properties and returns a component
 */
class CompanySearch extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            organization: 'crossplatformsweden',
            repository: 'ReactNativeTypeScript',
        };

        this.onSearch = this.onSearch.bind(this);
    }

    render() {
        return <View style={[Theme.container, Theme.paddingDefault]}>
            <Text style={Theme.title}>GitHub!</Text>
            <Text>Show open issues on GitHub using GraphQL</Text>
            <View style={[Theme.container, Theme.paddingDefault]}>
                <Text style={Theme.label}>GitHub Organization</Text>
                <TextInput placeholder='Organization'
                    value={this.state.organization}
                    onChangeText={(val) => this.setState({ organization: val })}></TextInput>

                <Text style={[Theme.label, Theme.para]}>Organization Repository</Text>
                <TextInput placeholder='Repository'
                    value={this.state.repository}
                    onChangeText={(val) => this.setState({ repository: val })}></TextInput>
                <Button title='Search' onPress={() => this.onSearch()} />
            </View>
            {this.state.searchCriteria ? (
                <CompanyView
                    repository={this.state.searchCriteria.repository}
                    organization={this.state.searchCriteria.organization} />
            ) : null}
        </View>;
    }

    async onSearch() {
        if (!this.state.organization) {
            return;
        }

        this.setState({
            searchCriteria: {
                organization: this.state.organization.valueOf(),
                repository: this.state.repository,
            },
        });
    }
}

export default CompanySearch;