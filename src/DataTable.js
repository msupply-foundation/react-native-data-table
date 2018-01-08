
/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';

import { ListView } from 'realm/react-native';

export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }

  shouldComponentUpdate(props) {
    return this.props.dataSource !== props.dataSource;
  }

  render() {
    const {
      style,
      listViewStyle,
      renderHeader,
      dataSource,
      refCallback,
      renderRow,
      ...listViewProps,
    } = this.props;

    return (
      <View style={[defaultStyles.verticalContainer, style]}>
        {typeof renderHeader === 'function' && renderHeader()}
        <ListView
          {...listViewProps}
          ref={refCallback}
          style={[defaultStyles.listview, listViewStyle]}
          dataSource={dataSource}
          renderRow={renderRow}
        />
      </View>
    );
  }
}

DataTable.propTypes = {
  style: ViewPropTypes.style,
  listViewStyle: PropTypes.number,
  refCallback: PropTypes.func,
  renderHeader: PropTypes.func,
  dataSource: PropTypes.object.isRequired,
  renderRow: PropTypes.func.isRequired,
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
