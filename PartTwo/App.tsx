// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddMenuScreen from './screens/AddMenuScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import FilterMenuScreen from './screens/FilterMenuScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddMenu" component={AddMenuScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="FilterMenu" component={FilterMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
