import moment from 'moment';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import {apiUrl} from '../Axios/apiURL';
import {baseURL, ImageBaseUrl} from '../Axios/Axios';

const Loader = props => {
  console.log('item ', props);

  const {isLoading} = props;
  return isLoading ? (
    <View style={styles.mainContainerStyle}>
      <ActivityIndicator />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    flexGrow: 1,
    backgroundColor: '#0000007A',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default Loader;
