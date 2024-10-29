import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Fetch data from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'shoppingItems'), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  // Add new item
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      await addDoc(collection(db, 'shoppingItems'), { name: newItem });
      setNewItem('');
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'shoppingItems', id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} // Käytetään tyyliä input
        placeholder="Add new item..."
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title="Add" onPress={addItem} />
      <View style={{ marginVertical: 10 }} />
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    padding: 8,
    fontSize: 16,
    borderWidth: 0, 
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default ShoppingList;