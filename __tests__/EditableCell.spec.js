jest.unmock('../EditableCell');
jest.unmock('enzyme');
jest.unmock('sinon');

import { EditableCell } from '../EditableCell';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import {
  TextInput,
  View,
} from 'react-native';

describe('EditableCell', () => {
  it('renders a View and TextInput with default props', () => {
    const wrapper = shallow(
      <EditableCell />
    );
    expect(wrapper.state('value')).toEqual('N/A');
    expect(wrapper.find(View).prop('style')[1]).toEqual({ flex: 1 });
    expect(wrapper.find(View).length).toBe(1);
    expect(wrapper.find(TextInput).length).toBe(1);
  });

  it('takes a width argument and applies it to defaultStyles', () => {
    const wrapper = shallow(
      <EditableCell width={1337} />
    );
    expect(wrapper.find(View).prop('style')[1]).toEqual({ flex: 1337 });
  });

  it('sets state to value as string', () => {
    const wrapper = shallow(
      <EditableCell
        value={50}
      />
    );
    expect(wrapper.state('value')).toEqual('50');
  });

  it('changes state with onChange event', () => {
    const wrapper = shallow(
      <EditableCell />
    );
    expect(wrapper.state('value')).toEqual('N/A');
    wrapper.find(TextInput).simulate('changeText', 'foo');
    expect(wrapper.state('value')).toEqual('foo');
  });

  it('onEndEditing event triggers callback', () => {
    const callback = sinon.spy();
    const obj = {};
    const wrapper = shallow(
      <EditableCell
        value={'foo'}
        onEndEditing={callback}
        target={obj}
      />
    );
    wrapper.find(TextInput).simulate('endEditing');
    expect(callback.calledWithExactly(obj, 'foo')).toBe(true);
  });
});
