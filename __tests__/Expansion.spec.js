jest.unmock('../Expansion');
jest.unmock('enzyme');
jest.unmock('sinon');

import { Expansion } from '../Expansion';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import sinon from 'sinon';
import { shallow } from 'enzyme';

describe('Expansion', () => {
  it('renders a view', () => {
    const wrapper = shallow(
      <Expansion />
    );
    expect(wrapper.find(View).length).toBe(1);
  });
  it('renders some arbitrary components', () => {
    const onBtnPress = sinon.spy();
    const wrapper = shallow(
      <Expansion>
        <View>
          <Text>Foo</Text>
        </View>
        <TouchableOpacity onPress={() => onBtnPress()}>
          <Text>Bar</Text>
        </TouchableOpacity>
      </Expansion>
    );
    expect(wrapper.contains('Foo')).toBe(true, 'Contains Foo');
    expect(wrapper.contains('Bar')).toBe(true, 'Contains Bar');
    wrapper.find(TouchableOpacity).simulate('press');
    expect(onBtnPress.calledOnce).toBe(true, 'Button press');
  });
});
