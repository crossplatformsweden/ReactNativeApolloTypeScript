import * as React from 'react';
import { View, Text } from 'react-native';
import Theme from '../../Theme';
import { Query } from 'react-apollo';
import { FormValidationMessage } from 'react-native-elements';
import BusyIndicator from '../../core/components/BusyIndicator';
import * as types from '../../Types';
import RepositoryList from '../../repository/components/RepositoryList';
import GetUserQuery from '../queries/GetUserQuery';

const ProfileComponent = () => (
    <Query query={GetUserQuery}>
        {({ loading, data, error }: { loading: boolean, data: types.ViewerResponse, error?: Error }) => {
            if (error) {
                return <FormValidationMessage>{error.message}</FormValidationMessage>;
            }
            if (loading) {
                return <BusyIndicator isBusy message='Looking up user...' />;
            }

            if (!data || !data.viewer) {
                return null;
            }

            return (
                <View style={[Theme.container, Theme.paddingDefault]}>
                    <Text style={Theme.title}>User</Text>
                    <Text style={Theme.textBlock}>{data.viewer.name}</Text>
                    <Text style={Theme.title}>Company</Text>
                    <Text style={Theme.textBlock}>{data.viewer.company}</Text>
                    <Text style={Theme.title}>Bio</Text>
                    <Text style={Theme.textBlock}>{data.viewer.bio}</Text>
                    <Text style={Theme.title}>Repositories</Text>
                    <View style={[Theme.container, Theme.paddingDefault]}>
                        <RepositoryList repositories={data.viewer.repositories} />
                    </View>
                </View>
                );
        }
        }
    </Query>
);

export default ProfileComponent;