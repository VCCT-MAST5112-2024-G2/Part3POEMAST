import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

export default function MainScreen({ navigation }: MainScreenProps) {
  const sampleMenu = [
    { course: 'Starters', dishName: 'Soup', description: 'Delicious soup', price: 5.99 },
    { course: 'Mains', dishName: 'Steak', description: 'Juicy steak', price: 15.99 },
    { course: 'Desserts', dishName: 'Cake', description: 'Chocolate cake', price: 7.99 },
  ];

  return (
    <ImageBackground
      source={require('../img/wallpaper.jpg')}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Main Menu</Text>

        <FlatList
          data={sampleMenu}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.courseName}>{item.course}</Text>
              <Text style={styles.dishName}>{item.dishName}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          )}
        />

        <View style={styles.buttonContainer}>
          <Button title="Go to Home Screen" onPress={() => navigation.navigate('Home')} color="black" />
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  dishName: {
    fontSize: 18,
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    marginVertical: 5,
  },
  price: {
    fontSize: 18,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
