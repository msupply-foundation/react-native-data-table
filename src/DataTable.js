/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';
import {ScrollView} from '@shoutem/ui';

export function DataTable(props) {
  const {
    style,
    listViewStyle,
    renderHeader,
    dataSource,
    refCallback,
    renderRow,
    scrollable,
    ...listViewProps,
  } = props;
  const renderListView = () => (
    <ListView
      {...listViewProps}
      ref={refCallback}
      style={[defaultStyles.listview, listViewStyle]}
      dataSource={dataSource}
      renderRow={renderRow}
    />
  );
  //todo: maybe get rid of scrollable stuff, it doesn't seem to work
  return (
    <View>
      {
        scrollable ?
          <ScrollView horizontal>
            <View style={[defaultStyles.verticalContainer, style]}>
              {typeof renderHeader === 'function' && renderHeader()}
              {renderListView()}
            </View>
          </ScrollView> :
          <View style={[defaultStyles.verticalContainer, style]}>
            {typeof renderHeader === 'function' && renderHeader()}
            {renderListView()}
          </View>
      }
    </View>
  );
}

DataTable.propTypes = {
  style: View.propTypes.style,
  contentContainerStyle: View.propTypes.style,
  innerWrapperStyle: View.propTypes.style,
  listViewStyle: React.PropTypes.number,
  refCallback: React.PropTypes.func,
  renderHeader: React.PropTypes.func,
  dataSource: React.PropTypes.object.isRequired,
  renderRow: React.PropTypes.func.isRequired,
};
DataTable.defaultProps = {
  showsVerticalScrollIndicator: true,
  scrollRenderAheadDistance: 5000,
};

const defaultStyles = StyleSheet.create({
  verticalContainer: {
    flex: 1,
  },
  listView: {
    flex: 1,
  },
});
