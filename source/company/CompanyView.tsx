import * as React from 'react';
import { Text, View, Linking } from 'react-native';
import gql from 'graphql-tag';
import 'cross-fetch/polyfill';
import Theme from '../Theme';
import { Query } from 'react-apollo';
import { FormValidationMessage } from 'react-native-elements';
import BusyIndicator from '../core/components/BusyIndicator';

/**
 * GraphQL query to get organizations
 */
const GetOrganizationQuery = gql`
query GetOrganization($organization: String!, $repository: String!) {
  organization(login: $organization) {
    name
    url
    repository(name: $repository) {
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
    organization: string, repository: string
};
type Response = {
    organization: Organization
};

type GetOrganizationQuery = typeof GetOrganizationQuery;

class OrganizationQuery extends Query<GetOrganizationQuery, Variables> { }

/**
 * Queries for organization based on provided properties and returns an readonly view
 */
class CompanyView extends React.Component<Variables, Variables> {
    constructor(props: Variables) {
        super(props);
        console.log('** CompanyView PROPS **');
        console.log(props);
    }

    render() {
        return (
            <OrganizationQuery query={GetOrganizationQuery} variables={this.props}>
                {({ loading, data, error }: { loading: boolean, data: Response, error?: Error }) => {
                    if (error) {
                        return <FormValidationMessage>{error.message}</FormValidationMessage>;
                    }
                    if (loading) {
                        return <BusyIndicator isBusy message='Getting company...' />;
                    }

                    return (
                        <View style={[Theme.container, Theme.paddingDefault]}>
                            {data && data.organization ? (
                                <View style={Theme.container}>
                                    <Text style={Theme.title}>Url</Text>
                                    <Text style={Theme.textBlock}>{data.organization.url}</Text>
                                    {data.organization.repository ? (
                                        <View>
                                            // @ts-ignore
                                            <Text style={Theme.title}>Repository</Text>
                                            <Text style={Theme.textBlock}>{data.organization.repository.name}</Text>
                                            <Text style={Theme.link}
                                                onPress={() =>
                                                    Linking.openURL(data.organization.repository.url)}>
                                                {data.organization.repository.url}</Text>
                                        </View>
                                    ) : null}
                                </View>
                            ) : null}
                        </View>);
                }}
            </OrganizationQuery>
        );
    }
}

export default CompanyView;