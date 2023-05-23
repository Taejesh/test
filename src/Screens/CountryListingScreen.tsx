import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
import axiosInstance, {useApiCall} from '../Axios/Axios';

const CountryListingScreen = (props: any) => {
  const [status, setStatus] = useState('In process');
  const [countryList, setCountryList] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [filterList, setFilterList] = useState([]);

  const apiCall = useApiCall(
    '?drilldowns=State&measures=Population&year=latest',
  );

  useEffect(() => {
    setTimeout(() => {
      getCoutry();
    }, 50);
  }, []);
  const getCoutry = () => {
    console.log('apiCall', apiCall);
    // axiosInstance
    //   .get('?drilldowns=State&measures=Population&year=latest')

    apiCall().then(res => {
      console.log(res?.data?.data);
      let sortedList = res?.data?.data.sort((a: any, b: any) => {
        let aString = a.Population;
        let bString = b.Population;
        return aString > bString ? 1 : -1;
      });
      setCountryList(sortedList);
      setFilterList(sortedList);
      setStatus('Complete');
    });
  };
  const onFilter = (text: string) => {
    if (text === '') {
      setFilterValue(text);
      setFilterList(countryList);
    } else {
      const filterData = countryList.filter(item => {
        // console.log(item);
        let splitString = item.State.substr(0, text.length);
        return splitString.toLowerCase() == text.toLowerCase();
      });
      filterData.sort((a, b) => {
        return a.State < b.State ? 1 : -1;
      });
      setFilterValue(text);
      setFilterList(filterData);
    }
  };

  return (
    <View style={styles.mainContainerStyle}>
      <Text>Status : {status}</Text>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 20,
          alignItems: 'center',
        }}>
        <Text>Filter</Text>
        <TextInput
          value={filterValue}
          onChangeText={onFilter}
          style={{
            borderWidth: 1,
            borderColor: 'black',
            // height: 20,
            width: 130,
            marginLeft: 20,
          }}
        />
      </View>
      <FlatList
        data={filterList}
        renderItem={({item}: any) => {
          return (
            <Text
              style={{
                marginBottom: 20,
              }}>{`${item.State} (${item.Population})`}</Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    padding: 24,
  },
  headerTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabButtonStyle: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'silver',
    borderRadius: 16,
    marginHorizontal: 4,
  },
  tabTextStyle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CountryListingScreen;
