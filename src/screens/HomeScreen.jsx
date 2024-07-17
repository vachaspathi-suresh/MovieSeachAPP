import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderBar from '../components/HeaderBar';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import BookCard from '../components/BookCard';

const HomeScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('Harry Potter');
  const [books, setBooks] = useState([]);
  const [getLoading, setGetLoading] = useState(false);
  const searchBooks = async () => {
    setGetLoading(true);
    setBooks([]);
    try {
      const query =
        searchText.trim() === '' ? 'harry potter' : searchText.trim();
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}&fields=key,title,ratings_average,ratings_count,author_name,first_publish_year&limit=15`,
      );
      const data = await res.json();
      setBooks(data.docs);
    } catch (error) {}
    setGetLoading(false);
  };
  useEffect(() => {
    searchBooks();
  }, []);

  const refreshBooks = async () => {
    setRefreshing(true);
    await searchBooks();
    setRefreshing(false);
  };
  return (
    <View style={styles.ScreenContainer}>
      <Spinner
        visible={getLoading && !refreshing}
        overlayColor="rgba(0,0,0,0.75)"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshBooks} />
        }>
        <HeaderBar title={'Movies Search'} />
        <View style={styles.InputContainerComponent}>
          <TextInput
            placeholder="Find Your Book..."
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
            }}
            style={styles.TextInputContainer}
          />

          <TouchableOpacity
            onPress={() => {
              searchBooks();
            }}>
            <Icon
              style={styles.InputIcon}
              name="search"
              size={FONTSIZE.size_24}
              color={COLORS.primaryBlackHex}
            />
          </TouchableOpacity>
        </View>
        {books.map(book => (
          <TouchableOpacity
            key={book.key}
            style={styles.ListItem}
            onPress={() => {
              navigation.navigate('Detail', {bookData: book});
            }}>
            <BookCard bookData={book} />
          </TouchableOpacity>
        ))}
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
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.secondaryLightGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    borderTopLeftRadius: BORDERRADIUS.radius_20,
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    color: COLORS.primaryWhiteHex,
    backgroundColor: COLORS.primaryLightGreyHex,
    paddingLeft: SPACING.space_16,
  },
  ListItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondaryLightGreyHex,
    marginHorizontal: SPACING.space_18,
    marginVertical: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_8,
  },
});

export default HomeScreen;
