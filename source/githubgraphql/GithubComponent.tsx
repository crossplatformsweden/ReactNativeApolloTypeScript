import * as React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import Theme from '../Theme';

/**
 * Axios adapter for GitHub graphql API
 */
const axisGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
        // @ts-ignore
        Authorization: 'bearer ' + process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN,
    },
});

/**
 * GraphQL query to get organizations
 */
const GetOrganizationQuery = (organisation: string, repository: string) => `
{
    organization(login: "${organisation}") {
        name
        url
        repository(name: "${repository}") @include(if:${repository ? 'true' : false}){
            name
            url
        }
      }
}
`;

interface IState {
    /**
     * Repo to search for
     */
    name?: string;
    result?: string;
    errors?: string;
    repo?: string;
}

class Github extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: 'crossplatformsweden',
            result: '',
            repo: 'ReactNativeTypeScript',
        };
        this.onSearch = this.onSearch.bind(this);
        console.log('GitHub access token:');
        // @ts-ignore
        console.log(process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN);
    }

    componentDidMount() {
        this.onSearch();
    }

    render() {
        return (
            <View style={Theme.container}>
                <Text style={Theme.title}>GitHub!</Text>
                <Text>Show open issues on GitHub using GraphQL</Text>
                <View style={Theme.container}>
                    <TextInput placeholder='Organization' value={this.state.name} onChangeText={(val) => this.setState({ name: val })}></TextInput>
                    <TextInput placeholder='Repository' value={this.state.repo} onChangeText={(val) => this.setState({ repo: val })}></TextInput>
                    <Button title='Search' onPress={() => this.onSearch()} />
                </View>
                {this.state.result &&
                    // @ts-ignore
                    this.state.result ? (
                        <View style={Theme.container}>
                            // @ts-ignore
                            <Text style={Theme.textBlock}>Url: {this.state.result.organization.url}</Text>
                            // @ts-ignore
                            {this.state.result.organization.repository ? (
                                // @ts-ignore
                                <Text style={Theme.textBlock}>Repo: {this.state.result.organization.repository.url}</Text>
                            ) : null}
                        </View>
                    ) : null}
                            <Text style={{ color: 'red' }}>{this.state.errors}</Text>
            </View>
        );
    }

    async onSearch() {
        if (!this.state.name) {
            return;
        }

        const result = await axisGitHubGraphQL.post('', { query: GetOrganizationQuery(this.state.name, this.state.repo) });
        const data = result.data.data;
        const errors = result.data.errors;

        this.setState({ result: data, errors: errors && errors.length ? errors[0].message : null });
    }
}

export default Github;