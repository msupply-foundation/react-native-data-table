jest.unmock('../HeaderCell');
jest.unmock('enzyme');
jest.unmock('sinon');

import { HeaderCell } from '../HeaderCell';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Icon from 'react-native-vector-icons/FontAwesome';

describe('HeaderCell', () => {
  it('renders a TouchableOpacity when given onPress prop', () => {
    const wrapper = shallow(
      <HeaderCell onPress={jest.fn()} />
    );
    expect(wrapper.find(TouchableOpacity).length).toBe(1);
  });
  it('renders a view and not TouchableOpacity when not given onPress prop', () => {
    const wrapper = shallow(
      <HeaderCell />
    );
    expect(wrapper.find(TouchableOpacity).length).toBe(0);
    expect(wrapper.find(View).length).toBe(1);
  });
  it('Calls given func when pressed', () => {
    const onBtnPress = sinon.spy();
    const wrapper = shallow(<HeaderCell onPress={() => onBtnPress()} />);
    expect(wrapper.find(TouchableOpacity).length).toBe(1);
    wrapper.find(TouchableOpacity).simulate('press');
    expect(onBtnPress.calledOnce).toBe(true, 'Button press');
  });
  it('renders sort arrows when a function is given', () => {
    const wrapper = shallow(
      <HeaderCell onPress={jest.fn()} />
    );
    expect(wrapper.find(TouchableOpacity).length).toBe(1);
    expect(wrapper.find(Icon).length).toBe(1);
    expect(wrapper.find(Icon).props(name)).toEqual('sort');
  });
});
