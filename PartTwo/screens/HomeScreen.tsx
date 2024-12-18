// screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<{ dishName: string; description: string; course: string; price: number }[]>([]);

  useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [
        ...prevItems,
        route.params.newItem as { dishName: string; description: string; course: string; price: number }
      ]);
    }
  }, [route.params?.newItem]);

  // Calculate average price
  const averagePrice = menuItems.length > 0
    ? menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length
    : 0;

  // Handle removal of a menu item
  const removeItem = (index: number) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => {
          setMenuItems(menuItems.filter((_, i) => i !== index));
        }}
      ]
    );
  };

  return (
    <ImageBackground source={require('../img/wallpaper.jpg')} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Menu</Text>

        <View style={styles.buttonContainer}>
          <Button title="Add to the Menu" onPress={() => navigation.navigate('AddMenu')} color="black" />
          <Button title="Main Menu" onPress={() => navigation.navigate('MainMenu', { menuItems })} color="black" />
        </View>

        <Text>Total Items: {menuItems.length}</Text>
        <Text>Average Price: ${averagePrice.toFixed(2)}</Text>

        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.menuItem}>
              <Text style={styles.courseName}>{item.course}</Text>
              <Text style={styles.dishName}>{item.dishName}</Text>
              <Text>{item.description}</Text>
              <Text>${item.price.toFixed(2)}</Text>
              <Button title="Remove" color="red" onPress={() => removeItem(index)} />
            </View>
          )}
        />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
