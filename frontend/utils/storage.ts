import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE = {

// Store data
 storeData: async (key:string, value:string | number) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data:', e);
  }
},

// Retrieve data
 getData: async (key:string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving data:', e);
    return null;
  }
},

// Remove data
removeData: async (key:string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data:', e);
  }
},

// Clear all data
 clearAllData: async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing data:', e);
  }
},
}