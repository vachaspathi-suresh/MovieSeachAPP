import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderBar = ({title, isBackEnable = false, onBack}) => {
  return (
    <View style={styles.HeaderContainer}>
      {isBackEnable && (
        <TouchableOpacity onPress={onBack}>
          <Icon
            style={styles.InputIcon}
            name="arrow-left"
            size={FONTSIZE.size_24}
            color={COLORS.primaryWhiteHex}
          />
        </TouchableOpacity>
      )}
      <Image
        source={{
          uri: 'https://i.pinimg.com/736x/ff/d5/82/ffd582244b18fef8f2fd505da7cfb363.jpg',
        }}
        style={styles.Image}
      />
      <Text style={styles.HeaderText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  Image: {
    marginHorizontal: SPACING.space_8,
    height: 45,
    width: 45,
  },
});

export default HeaderBar;
