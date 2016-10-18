jest.unmock('../DataTable');
jest.unmock('enzyme');
jest.unmock('sinon');

import { DataTable } from '../DataTable';
import React from 'react';
import { View, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ListView } from 'realm/react-native';

describe('DataTable', () => {
  const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });

  beforeEach(() => {
    dataSource.cloneWithRows(['row1', 'row2']);
  });

  it('renders a ListView', () => {
    const wrapper = shallow(
      <DataTable
        dataSource={dataSource}
        renderRow={jest.fn()}
      />
    );
    expect(wrapper.find(ListView).length).toEqual(1);
    expect(wrapper.find(TextInput).length).toEqual(0); // No searchBar
    expect(wrapper.prop('renderHeader')).toBeFalsy(); // No prop
  });

  describe('renderHeader', () => {
    const renderHeader = sinon.spy(() => <View><Text>foo</Text></View>);
    const wrapper = shallow(
      <DataTable
        dataSource={dataSource}
        renderRow={jest.fn()}
        renderHeader={() => renderHeader()}
      />
    );
    it('renders a header when given appropriate prop', () => {
      expect(wrapper.contains('foo')).toEqual(true);
      expect(wrapper.children().find(View).length).toEqual(1);
      expect(wrapper.children().find(Text).length).toEqual(1);
    });
  });
});
