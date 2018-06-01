import * as React from 'react';
import { Text, View, Linking } from 'react-native';
import 'cross-fetch/polyfill';
import Theme from '../Theme';
import { Query } from 'react-apollo';
import { FormValidationMessage } from 'react-native-elements';
import BusyIndicator from '../core/components/BusyIndicator';
import GetOrganizationQuery from '../queries/GetOrganizationQuery';
import { OrganizationVariables, OrganizationResponse } from '../Types';

class OrganizationQuery extends Query<GetOrganizationQuery, OrganizationVariables> { }

/**
 * Queries for organization based on provided properties and returns an readonly view
 */
class CompanyView extends React.Component<OrganizationVariables, OrganizationVariables> {
    constructor(props: OrganizationVariables) {
        super(props);
        console.log('** CompanyView PROPS **');
        console.log(props);
    }

    render() {
        return (
            <OrganizationQuery query={GetOrganizationQuery} variables={this.props}>
                {({ loading, data, error }: { loading: boolean, data: OrganizationResponse, error?: Error }) => {
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
                                <Text style={Theme.title}>{data.organization.name}</Text>
                                    <Text style={Theme.label}>Url</Text>
                                    <Text style={Theme.link}
                                        onPress={() =>
                                            Linking.openURL(data.organization.url)}>{data.organization.url}</Text>
                                    {data.organization.repository ? (
                                        <View>
                                            // @ts-ignore
                                            <Text style={Theme.label}>Repository</Text>
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