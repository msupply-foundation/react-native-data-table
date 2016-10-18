jest.unmock('../Header');
jest.unmock('enzyme');
jest.unmock('sinon');

import { Header } from '../Header';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import sinon from 'sinon';
import { shallow } from 'enzyme';

describe('Header', () => {
  it('renders a view', () => {
    const wrapper = shallow(
      <Header />
    );
    expect(wrapper.find(View).length).toBe(1);
  });
  it('renders some arbitrary components', () => {
    const onBtnPress = sinon.spy();
    const wrapper = shallow(
      <Header>
        <View>
          <Text>Foo</Text>
        </View>
        <TouchableOpacity onPress={() => onBtnPress()}>
          <Text>Bar</Text>
        </TouchableOpacity>
      </Header>
    );
    expect(wrapper.contains('Foo')).toBe(true, 'Contains Foo');
    expect(wrapper.contains('Bar')).toBe(true, 'Contains Bar');
    wrapper.find(TouchableOpacity).simulate('press');
    expect(onBtnPress.calledOnce).toBe(true, 'Button press');
  });
});
