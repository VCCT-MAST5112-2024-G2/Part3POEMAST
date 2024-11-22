// screens/AddMenuScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const courses = ['Starters', 'Mains', 'Desserts'];

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

export default function AddMenuScreen({ navigation }: AddMenuScreenProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');
  const [addedItem, setAddedItem] = useState<{ dishName: string, description: string, course: string, price: number } | null>(null);

  const handleSubmit = () => {
    const newItem = { dishName, description, course, price: parseFloat(price) };
    setAddedItem(newItem); 
    navigation.navigate('Home', { newItem });
  };

  return (
    <ImageBackground source={require('../img/wallpaper.jpg')} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.label}>Dish Name:</Text>
        <TextInput style={styles.input} onChangeText={setDishName} value={dishName} />

        <Text style={styles.label}>Description:</Text>
        <TextInput style={styles.input} onChangeText={setDescription} value={description} />

        <Text style={styles.label}>Course:</Text>
        <Picker selectedValue={course} onValueChange={setCourse}>
          {courses.map((course) => (
            <Picker.Item key={course} label={course} value={course} />
          ))}
        </Picker>

        <Text style={styles.label}>Price:</Text>
        <TextInput style={styles.input} onChangeText={setPrice} value={price} keyboardType="numeric" />

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button title="Add" onPress={handleSubmit} color="black" />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Clear" onPress={() => { setDishName(''); setDescription(''); setPrice(''); setAddedItem(null); }} color="black" />
          </View>
        </View>

        {addedItem && (
          <View style={styles.itemDisplay}>
            <Text style={styles.courseName}>{addedItem.course}</Text>
            <Text style={styles.dishName}>{addedItem.dishName}</Text>
            <Text style={styles.description}>{addedItem.description}</Text>
            <Text style={styles.price}>${addedItem.price.toFixed(2)}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  buttonWrapper: {
    backgroundColor: 'black',
    borderRadius: 30,
    height: 60,
    flex: 1,
    marginHorizontal: 5,
  },
  itemDisplay: {
    alignItems: 'center',
    marginTop: 20,
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
});
