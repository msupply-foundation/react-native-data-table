jest.unmock('../TableButton');
jest.unmock('enzyme');
jest.unmock('sinon');

import { TableButton } from '../TableButton';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import sinon from 'sinon';
import { shallow } from 'enzyme';

describe('TableButton', () => {
  it('renders a TouchableOpacity when given onPress prop', () => {
    const wrapper = shallow(
      <TableButton onPress={jest.fn()} />
    );
    expect(wrapper.find(TouchableOpacity).length).toBe(1);
  });

  it('Calls given func when pressed', () => {
    const onBtnPress = sinon.spy();
    const wrapper = shallow(
      <TableButton onPress={() => onBtnPress()} />
    );
    wrapper.find(TouchableOpacity).simulate('press');
    expect(onBtnPress.calledOnce).toBe(true, 'Button press');
  });
});
