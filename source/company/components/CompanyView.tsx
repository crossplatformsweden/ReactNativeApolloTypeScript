import * as React from 'react';
import { Text, View, Linking } from 'react-native';
import 'cross-fetch/polyfill';
import Theme from '../../Theme';
import { FormValidationMessage } from 'react-native-elements';
import BusyIndicator from '../../core/components/BusyIndicator';
import GetOrganizationQuery from '../queries/GetOrganizationQuery';
import { OrganizationVariables, OrganizationResponse, GenericResponse } from '../../Types';

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
            <GetOrganizationQuery query={GetOrganizationQuery} variables={this.props}>
                {({ loading, data, error }:  GenericResponse) => {
                    if (error) {
                        return <FormValidationMessage>{error.message}</FormValidationMessage>;
                    }
                    if (loading) {
                        return <BusyIndicator isBusy message='Getting company...' />;
                    }

                    const company = data as OrganizationResponse;

                    return (
                        <View style={[Theme.container, Theme.paddingDefault]}>
                            {company && company.organization ? (
                                <View style={Theme.container}>
                                <Text style={Theme.title}>{company.organization.name}</Text>
                                    <Text style={Theme.label}>Url</Text>
                                    <Text style={Theme.link}
                                        onPress={() =>
                                            Linking.openURL(company.organization.url)}>{company.organization.url}</Text>
                                    {company.organization.repository ? (
                                        <View>
                                            // @ts-ignore
                                            <Text style={Theme.label}>Repository</Text>
                                            <Text style={Theme.textBlock}>{company.organization.repository.name}</Text>
                                            <Text style={Theme.link}
                                                onPress={() =>
                                                    Linking.openURL(company.organization.repository.url)}>
                                                {company.organization.repository.url}</Text>
                                        </View>
                                    ) : null}
                                </View>
                            ) : null}
                        </View>);
                }}
            </GetOrganizationQuery>
        );
    }
}

export default CompanyView;