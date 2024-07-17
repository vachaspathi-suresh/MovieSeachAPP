import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';

const DetailScreen = ({navigation, route}) => {
  const bookData = route.params.bookData;
  const [refreshing, setRefreshing] = useState(false);
  const [url, setUrl] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL-ERzrBww4nzVoovPa9UeUEsVIMpUY4E_yQ&s',
  );
  useEffect(() => {
    const getURL = async () => {
      try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await res.json();
        setUrl(data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getURL();
  }, []);
  const refreshDetails = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      setUrl(data.message);
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  };
  return (
    <View style={styles.ScreenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshDetails} />
        }>
        <HeaderBar
          title={'Book Details'}
          isBackEnable={true}
          onBack={() => {
            navigation.pop();
          }}
        />
        <View style={styles.DetailsContainer}>
          <Image style={styles.BookCover} source={{uri: url}} />
          <View style={styles.DetailsBox}>
            <Text style={styles.DetailText}>
              <Text style={styles.DetailBold}>Title:</Text> {bookData.title}
            </Text>
            <Text style={styles.DetailText}>
              <Text style={styles.DetailBold}>Author:</Text>
              {bookData.author_name}
            </Text>
            <Text style={styles.DetailText}>
              <Text style={styles.DetailBold}>Published Year:</Text>
              {bookData.first_publish_year}
            </Text>
            <Text style={styles.DetailText}>
              <Text style={styles.DetailBold}>Rating:</Text>
              {bookData.ratings_average}
            </Text>
            <Text style={styles.DetailText}>
              <Text style={styles.DetailBold}>Rating Count:</Text>
              {bookData.ratings_count}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryGreyHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  DetailsContainer: {
    margin: SPACING.space_20,
    alignItems: 'center',
  },
  BookCover: {
    width: '80%',
    height: 250,
    resizeMode: 'contain',
    margin: SPACING.space_8,
  },
  DetailsBox: {
    minWidth: '98%',
    padding: SPACING.space_24,
    backgroundColor: COLORS.primaryLightGreyHex,
    alignItems: 'flex-start',
    borderRadius: BORDERRADIUS.radius_20,
    marginTop: SPACING.space_20,
  },
  DetailText: {
    color: COLORS.primaryDarkGreyHex,
    fontSize: FONTSIZE.size_18,
  },
  DetailBold: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
