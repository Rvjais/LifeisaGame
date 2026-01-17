import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'lifeisagame_history';

export const loadHistory = async () => {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load history:', e);
    return [];
  }
};

export const saveHistory = async (history) => {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
};

export const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
};

const GOALS_KEY = 'lifeisagame_goals';

export const loadGoals = async () => {
  try {
    const data = await AsyncStorage.getItem(GOALS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load goals:', e);
    return null;
  }
};

export const saveGoals = async (goals) => {
  try {
    await AsyncStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  } catch (e) {
    console.error('Failed to save goals:', e);
  }
};

const BASELINE_KEY = 'lifeisagame_baseline';

export const loadBaseline = async () => {
  try {
    const data = await AsyncStorage.getItem(BASELINE_KEY);
    return data ? parseInt(data, 10) : 50;
  } catch (e) {
    console.error('Failed to load baseline:', e);
    return 50;
  }
};

export const saveBaseline = async (value) => {
  try {
    await AsyncStorage.setItem(BASELINE_KEY, value.toString());
  } catch (e) {
    console.error('Failed to save baseline:', e);
  }
};

const NAME_KEY = 'lifeisagame_name';

export const loadName = async () => {
  try {
    const data = await AsyncStorage.getItem(NAME_KEY);
    return data || null;
  } catch (e) {
    console.error('Failed to load name:', e);
    return null;
  }
};

export const saveName = async (name) => {
  try {
    await AsyncStorage.setItem(NAME_KEY, name);
  } catch (e) {
    console.error('Failed to save name:', e);
  }
};

const CURRENT_PROGRESS_KEY = 'lifeisagame_current_progress';

export const loadCurrentProgress = async () => {
  try {
    const data = await AsyncStorage.getItem(CURRENT_PROGRESS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load current progress:', e);
    return null;
  }
};

export const saveCurrentProgress = async (data) => {
  try {
    await AsyncStorage.setItem(CURRENT_PROGRESS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save current progress:', e);
  }
};

const CREDENTIALS_KEY = 'lifeisagame_credentials';

export const saveCredentials = async (creds) => {
  try {
    await AsyncStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
  } catch (e) {
    console.error('Failed to save credentials:', e);
  }
};

export const loadCredentials = async () => {
  try {
    const data = await AsyncStorage.getItem(CREDENTIALS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load credentials:', e);
    return null;
  }
};

export const clearCredentials = async () => {
  try {
    await AsyncStorage.removeItem(CREDENTIALS_KEY);
  } catch (e) {
    console.error('Failed to clear credentials:', e);
  }
};
