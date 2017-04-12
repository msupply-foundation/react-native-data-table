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
import { ScrollView } from '@shoutem/ui';

export function DataTable(props) {
  const {
    style,
    listViewStyle,
    renderHeader,
    dataSource,
    refCallback,
    renderRow,
    scrollable,
    ListViewComponent,
    userRealm,
    ...listViewProps,
  } = props;

  const renderListView = () => (
    <ListViewComponent
      {...listViewProps}
      ref={refCallback}
      style={[defaultStyles.listview, listViewStyle]}
      dataSource={dataSource}
      renderRow={renderRow}
    />
  );
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
  listViewStyle: React.PropTypes.number,
  refCallback: React.PropTypes.func,
  renderHeader: React.PropTypes.func,
  dataSource: React.PropTypes.object.isRequired,
  renderRow: React.PropTypes.func.isRequired,
  scrollable: React.PropTypes.bool,
  ListViewComponent: React.PropTypes.func,
};
DataTable.defaultProps = {
  showsVerticalScrollIndicator: true,
  ListViewComponent: ListView,
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
