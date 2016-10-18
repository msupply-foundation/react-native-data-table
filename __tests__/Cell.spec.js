jest.unmock('../Cell');
jest.unmock('enzyme');

import { Cell } from '../Cell';
import React from 'react';
import { View, Text, Image } from 'react-native';

import { shallow } from 'enzyme';

describe('Cell', () => {
  it('renders a view', () => {
    const wrapper = shallow(
      <Cell />
    );
    expect(wrapper.find(View).length).toBe(1);
  });

  it('renders some string in a Text component', () => {
    const wrapper = shallow(
      <Cell>Foo</Cell>
    );
    expect(wrapper.contains('Foo')).toBe(true);
    expect(wrapper.find(Text).length).toBe(1);
  });

  it('renders any other components (i.e. an Image and a Text component containing "Foo")', () => {
    const wrapper = shallow(
      <Cell><Image /><Text>Foo</Text></Cell>
    );
    expect(wrapper.find(View).length).toBe(1);
    expect(wrapper.find(Text).length).toBe(1);
    expect(wrapper.contains('Foo')).toBe(true);
    expect(wrapper.find(Image).length).toBe(1);
  });
});
