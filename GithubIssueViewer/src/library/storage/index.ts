import AsyncStorage from '@react-native-async-storage/async-storage';

const ORGANIZATION_KEY = '@organization';
const BOOKMARKS_KEY = '@bookmarks';

export const storeOrganization = async (
  organization: string,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(ORGANIZATION_KEY, organization);
    return true;
  } catch (e) {
    return false;
  }
};

export const retrieveOrganization = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(ORGANIZATION_KEY);
    return value;
  } catch (e) {
    return null;
  }
};

export const storeBookmarks = async (bookmarks: string[]): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return true;
  } catch (e) {
    return false;
  }
};

export const retrieveBookmarks = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return value === null ? value : JSON.parse(value);
  } catch (_e) {
    return null;
  }
};
