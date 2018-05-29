import * as React from 'react';
import { View, Text } from 'react-native';
import Theme from '../../Theme';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { FormValidationMessage } from 'react-native-elements';
import BusyIndicator from '../../core/components/BusyIndicator';

const userQuery = gql`
 {
  viewer {
    login,
    name,
    url,
    bio,
    company
  }
}
`;

type Viewer = {
    login: string;
    name: string;
    url: string;
    bio?: string;
    company?: any
};

type Response = {
    viewer?: Viewer
};

const ProfileComponent = () => (
    <Query query={userQuery}>
        {({ loading, data, error }: { loading: boolean, data: Response, error?: Error }) => {
            if (error) {
                return <FormValidationMessage>{error.message}</FormValidationMessage>;
            }
            if (loading) {
                return <BusyIndicator isBusy message='Looking up user...' />;
            }

            if (!data || !data.viewer) {
                return null;
            }

            return (<View style={[Theme.container, Theme.paddingDefault]}>
                <Text style={Theme.title}>User</Text>
                <Text style={Theme.textBlock}>{data.viewer.name}</Text>
                <Text style={Theme.title}>Company</Text>
                <Text style={Theme.textBlock}>{data.viewer.company}</Text>
                <Text style={Theme.title}>Bio</Text>
                <Text style={Theme.textBlock}>{data.viewer.bio}</Text>
            </View>);
        }
        }
    </Query>
);

export default ProfileComponent;