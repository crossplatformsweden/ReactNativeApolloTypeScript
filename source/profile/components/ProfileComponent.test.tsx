import * as React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { Query } from 'react-apollo';

import { ProfilePure } from './ProfileComponent';
import GetUserQuery from '../queries/GetUserQuery';
import { ViewerResponse } from '../../Types';
import { Text } from 'react-native';

    jest.unmock('react-native');

describe('ProfileComponent', () => {

    test('renders with data', () => {
        const data: ViewerResponse = {
            viewer: {
                name: 'nameMock',
                login: 'loginMock',
                bio: '',
                company: null,
                repositories: null,
                url: '',
            },
        };

        const wrapper = shallow(<ProfilePure {...data} />);

        expect(wrapper).toMatchSnapshot();

        const userNameElement = wrapper.find(Text).at(1);

        const nameText = userNameElement.render().text();
        expect(nameText).toEqual(data.viewer.name);

        const bioElement = wrapper.find(Text).at(5);
        const bioText = bioElement.render().text();
        console.log(bioText);
        expect(bioText).toEqual('');
    });
});