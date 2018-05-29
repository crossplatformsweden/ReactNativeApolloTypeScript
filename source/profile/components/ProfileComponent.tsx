import * as React from 'react';
import { View, Text } from 'react-native';
import Theme from '../../Theme';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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
    <View style={[Theme.container, Theme.paddingDefault]}>
        <Query query={userQuery}>
            {({ loading, data, error }: { loading: boolean, data: Response, error?: Error }) => {
                if (error) {
                    console.log('** ERROR **');
                    console.log(error);
                    return <View style={Theme.container}><Text style={{ color: 'red' }}>{error.message}</Text></View>;
                }

                if (loading) {
                    return <View style={Theme.container}><Text>Loading...</Text></View>;
                }

                if (!data || !data.viewer) {
                    return null;
                }

                return (
                    <View style={Theme.container}>
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
    </View>
);

export default ProfileComponent;