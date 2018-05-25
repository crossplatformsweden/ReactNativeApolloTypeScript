import * as React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import Theme from '../Theme';
import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';

/**
 * Axios adapter for GitHub graphql API
 */
const apolloClient = new ApolloBoost({
    uri: 'https://api.github.com/graphql',
    request: async (op) => {
        op.setContext({
            headers: {
                // @ts-ignore
                authorization: 'Bearer ' + process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN,
            },
        });
    },
});

/**
 * GraphQL query to get organizations
 */
const GetOrganizationQuery = (organisation: string, repository: string) => gql`
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
    data?: any;
    errors?: string;
    repo?: string;
}

class GithubComponent extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: 'crossplatformsweden',
            data: '',
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
                {this.state.data &&
                    // @ts-ignore
                    this.state.data ? (
                        <View style={Theme.container}>
                            // @ts-ignore
                            <Text style={Theme.textBlock}>Url: {this.state.data.organization.url}</Text>
                            // @ts-ignore
                            {this.state.data.organization.repository ? (
                                // @ts-ignore
                                <Text style={Theme.textBlock}>Repo: {this.state.data.organization.repository.url}</Text>
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

        const result = await apolloClient.query({ query: GetOrganizationQuery(this.state.name, this.state.repo) });
        const data = result.data;
        const errors = result.errors;

        this.setState({ data: data, errors: errors && errors.length ? errors[0].message : null });
    }
}

export default GithubComponent;