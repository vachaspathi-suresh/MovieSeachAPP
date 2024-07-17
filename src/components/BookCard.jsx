import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BORDERRADIUS, FONTSIZE, SPACING} from '../theme/theme';

const BookCard = ({navigation, bookData}) => {
  const [url, setUrl] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL-ERzrBww4nzVoovPa9UeUEsVIMpUY4E_yQ&s',
  );
  useEffect(() => {
    const getURL = async () => {
      try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await res.json();
        setUrl(data.message);
      } catch (error) {}
    };
    getURL();
  }, []);
  return (
    <View style={styles.BookCard}>
      <Image style={styles.BookCover} source={{uri: url}} />
      <View style={styles.BookDetails}>
        <Text style={styles.BookTitle}>{bookData.title}</Text>
        <Text style={styles.BookAuthor}>{bookData.author_name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  BookCard: {
    margin: SPACING.space_12,
  },
  BookCover: {
    width: 80,
    height: 120,
    marginRight: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_8,
  },
  BookDetails: {
    flex: 1,
  },
  BookTitle: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
  },
  BookAuthor: {
    marginTop: SPACING.space_8,
  },
});

export default BookCard;
