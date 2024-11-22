// screens/MainMenuScreen.tsx
import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type MainMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'MainMenu'>;

export default function MainMenuScreen({ navigation, route }: MainMenuScreenProps) {
  const menuItems = route.params?.menuItems || [];

  return (
    <ImageBackground source={require('../img/wallpaper.jpg')} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Main Menu</Text>

        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.courseName}>{item.course}</Text>
              <Text style={styles.dishName}>{item.dishName}</Text>
              <Text>{item.description}</Text>
              <Text>${item.price.toFixed(2)}</Text>
            </View>
          )}
        />

        <Button title="Home" onPress={() => navigation.navigate('Home')} color="black" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '100%',
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dishName: {
    fontSize: 16,
    marginVertical: 5,
  },
});
