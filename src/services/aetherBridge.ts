// src/services/aetherBridge.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export interface ProjectFile {
  id: string;
  name: string;
  content: string;
  type: 'html' | 'js' | 'css' | 'tsx' | string;
}

const AETHER_VAULT_KEY = '@aether_vault';

export const aetherBridge = {
  async deploy(code: string, projectName = 'New Sketch'): Promise<boolean> {
    if (!code || code.length < 5) {
      Alert.alert("Empty Sketch", "Write some real code before deploying!");
      return false;
    }

    try {
      const projectData: ProjectFile[] = [
        { 
          id: '1', 
          name: 'index.html', 
          content: code, 
          type: 'html' 
        },
        // Add more files later (js, css, etc.)
      ];

      await AsyncStorage.setItem(AETHER_VAULT_KEY, JSON.stringify(projectData));
      Alert.alert("🚀 Deployed!", `Sketch "${projectName}" is now live in Aether Engine.`);
      return true;
    } catch (e) {
      Alert.alert("Bridge Error", "Failed to connect to Aether vault.");
      return false;
    }
  },

  async loadVault(): Promise<ProjectFile[] | null> {
    try {
      const data = await AsyncStorage.getItem(AETHER_VAULT_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
};
