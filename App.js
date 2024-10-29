import React from 'react';
import { View, Text } from 'react-native';
import ShoppingList from './src/components/ShoppingList';

function App() {
  return (
    <View style={
      { paddingTop: 50,
        flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' }
      }>
      <Text style={
        { fontSize: 24, 
        fontWeight: 'bold' }
        }>Shopping list</Text>
      <ShoppingList />
    </View>
  );
}

export default App;