import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../types';

const courses = ['Starters', 'Mains', 'Desserts'];

type FilterMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterMenu'>;

export default function FilterMenuScreen({ navigation, route }: FilterMenuScreenProps) {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [filteredItems, setFilteredItems] = useState<{ dishName: string; description: string; course: string; price: number }[]>([]);
  const menuItems = route.params?.menuItems || [];

  useEffect(() => {
    const filtered = menuItems.filter((item) => item.course === selectedCourse);
    setFilteredItems(filtered);
  }, [selectedCourse, menuItems]);

  return (
    <ImageBackground source={require('../img/wallpaper.jpg')} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Filter</Text>

        <View style={styles.pickerBox}>
          <Picker
            selectedValue={selectedCourse}
            onValueChange={(itemValue: React.SetStateAction<string>) => setSelectedCourse(itemValue)}
            style={styles.picker}
          >
            {courses.map((course) => (
              <Picker.Item key={course} label={course} value={course} />
            ))}
          </Picker>
        </View>

        <FlatList
          data={filteredItems}
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
          <Button title="Menu" onPress={() => navigation.navigate('Home')} color="black" />
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
  pickerBox: {
    width: 300,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'black',
  },
  picker: {
    height: 50,
    width: 200,
    color: 'white',
    textAlign: 'center',
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dishName: {
    fontSize: 20,
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
    backgroundColor: 'black',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
    width: 120,
    height: 40,
    marginBottom: 20,
  },
});
