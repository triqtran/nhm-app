import AsyncStorage from "@react-native-async-storage/async-storage";

// Keys
export const ACCESS_TOKEN = 'access_token';

// Actions
export default {
  saveAccessToken: (token?: string): Promise<boolean> => {
    if (!token || token.trim() === '') {
      return Promise.resolve(false);
    }
    return AsyncStorage.setItem(ACCESS_TOKEN, token)
      .then(() => true)
      .catch((err) => {
        console.error(err);
        return false;
      });
  },
  getAccessToken: (): Promise<string | null> => {
    return AsyncStorage.getItem(ACCESS_TOKEN)
      .catch(err => {
        console.error(err);
        return null;
      })
  },
  clearAll: (): Promise<boolean> => {
    return AsyncStorage.clear().then(() => true).catch(() => false);
  }
}