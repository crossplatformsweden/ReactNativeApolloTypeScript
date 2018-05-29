// utility/components/BusyIndicator.test
/// <reference types="jest"/>
import React from 'react';
import { shallow } from 'enzyme';
import { DotIndicator } from 'react-native-indicators';

import BusyIndicator, {
  IBusyIndicatorProps,
  IndicatorType,
  Spinner,
} from './BusyIndicator';

jest.unmock('react-native');

function setup(type = IndicatorType.MaterialIndicator) {
  const props: IBusyIndicatorProps = {
    isBusy: true,
    type,
  };

  const enzymeWrapper = shallow(<BusyIndicator {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('components', () => {
  /**
   * Test component rendering. Properties of children might be tested by importing their type:
   *
   *    const busyProps = enzymeWrapper.find(BusyIndicator).props();
   *    expect(busyProps.isBusy).toBe(false);
   */
  describe('BusyIndicator', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });

    it('should use DotIndicator type', () => {
      const { enzymeWrapper } = setup(IndicatorType.DotIndicator);
      expect(enzymeWrapper.find(Spinner)).toBeDefined();
    });
  });
});
