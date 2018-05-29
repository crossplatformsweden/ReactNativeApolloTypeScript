import * as React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import gql from 'graphql-tag';
import 'cross-fetch/polyfill';
import Theme from '../Theme';
import { Query } from 'react-apollo';

/**
 * GraphQL query to get organizations
 */
const GetOrganizationQuery = gql`
query GetOrganization($organisation: string, $repository: string) {
    organization(login: $organisation) {
        name
        url
        repository(name: $repository) @include(if:$repository ? true : false}){
            name
            url
        }
      }
}
`;

type Repository = {
    name: string,
    url: string
};
type Organization = {
    name: string,
    url: string,
    repository?: Repository
};

type Variables = {
    organization: string, repository?: string
};
type Response = {
    organization: Organization
};

type GetOrganizationQuery = typeof GetOrganizationQuery;

class OrganizationQuery extends Query<GetOrganizationQuery, Variables> { }

/**
 * Queries for organization based on State properties and returns a component
 */
class CompanySearch extends React.Component<Variables, Variables> {
    constructor(props: Variables) {
        super(props);
        console.log('PROPS');
        console.log(props);

        this.state = {
            organization: 'crossplatformsweden',
            repository: 'ReactNativeTypeScript',
        };

        this.onSearch = this.onSearch.bind(this);

        console.log('GitHub access token:');
        // @ts-ignore
        console.log(process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN);
    }

    render() {
        return (
            <OrganizationQuery query={GetOrganizationQuery} variables={this.state}>
                {({ loading, data, error }: { loading: boolean, data: Response, error?: Error }) => {
                    if (error) {
                        return <View><Text>{error}</Text></View>;
                    }

                    if (loading) {
                        return <View><Text>Loading...</Text></View>;
                    }

                    return <View style={Theme.container}>
                        <Text style={Theme.title}>GitHub!</Text>
                        <Text>Show open issues on GitHub using GraphQL</Text>
                        <View style={Theme.container}>
                            <TextInput placeholder='Organization'
                                value={this.state.organization}
                                onChangeText={(val) => this.setState({ organization: val })}></TextInput>
                            <TextInput placeholder='Repository'
                                value={this.state.repository}
                                onChangeText={(val) => this.setState({ repository: val })}></TextInput>
                            <Button title='Search' onPress={() => this.onSearch()} />
                        </View>
                        {data ? (
                            <View style={Theme.container}>
                                <Text style={Theme.textBlock}>Url: {data.organization.url}</Text>
                                {data.organization.repository ? (
                                    // @ts-ignore
                                    <Text style={Theme.textBlock}>Repo: {data.repository.url}</Text>
                                ) : null}
                            </View>
                        ) : null}
                        <Text style={{ color: 'red' }}>{error}</Text>
                    </View>;
                }}
            </OrganizationQuery>
        );
    }

    async onSearch() {
        if (!this.state.organization) {
            return;
        }

        // const result = await apolloClient.query({ query: GetOrganizationQuery(this.state.name, this.state.repo) });
        // const data = result.data;
        // const errors = result.errors;

        // this.setState({ data: data, errors: errors && errors.length ? errors[0].message : null });
    }
}

export default CompanySearch;