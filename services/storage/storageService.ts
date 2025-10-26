import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DEFAULT_USER_METADATA,
  FORM_CACHE_EXPIRATION_DAYS,
  STORAGE_KEYS,
} from "./constants";
import { FormCache, UserMetadata } from "./types";

export async function saveFormCache(
  formData: Omit<FormCache, "lastUpdated">
): Promise<void> {
  try {
    const cache: FormCache = {
      ...formData,
      lastUpdated: Date.now(),
    };

    await AsyncStorage.setItem(STORAGE_KEYS.FORM_CACHE, JSON.stringify(cache));

    console.log("✅ Form cache saved successfully");
  } catch (error) {
    console.error("❌ Error saving form cache:", error);
  }
}

export async function getFormCache(): Promise<FormCache | null> {
  try {
    const cached = await AsyncStorage.getItem(STORAGE_KEYS.FORM_CACHE);

    if (!cached) {
      return null;
    }

    const parsed: FormCache = JSON.parse(cached);

    const expirationTime = FORM_CACHE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
    const isExpired = Date.now() - parsed.lastUpdated > expirationTime;

    if (isExpired) {
      console.log("⏰ Form cache expired, clearing...");
      await clearFormCache();
      return null;
    }

    console.log("✅ Form cache retrieved successfully");
    return parsed;
  } catch (error) {
    console.error("❌ Error getting form cache:", error);
    return null;
  }
}

export async function clearFormCache(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.FORM_CACHE);
    console.log("✅ Form cache cleared");
  } catch (error) {
    console.error("❌ Error clearing form cache:", error);
  }
}

export async function hasFormCache(): Promise<boolean> {
  try {
    const cache = await getFormCache();
    return cache !== null;
  } catch (error) {
    return false;
  }
}

export async function getUserMetadata(): Promise<UserMetadata> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER_METADATA);

    if (!stored) {
      console.log("🆕 First app access, creating metadata");
      const metadata = { ...DEFAULT_USER_METADATA };
      await saveUserMetadata(metadata);
      return metadata;
    }

    const metadata: UserMetadata = JSON.parse(stored);

    metadata.lastAccessDate = Date.now();
    await saveUserMetadata(metadata);

    return metadata;
  } catch (error) {
    console.error("❌ Error getting user metadata:", error);
    return { ...DEFAULT_USER_METADATA };
  }
}

async function saveUserMetadata(metadata: UserMetadata): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_METADATA,
      JSON.stringify(metadata)
    );
  } catch (error) {
    console.error("❌ Error saving user metadata:", error);
  }
}

export async function updateUserName(userName: string): Promise<void> {
  try {
    const metadata = await getUserMetadata();
    metadata.userName = userName;
    await saveUserMetadata(metadata);
    console.log("✅ User name updated");
  } catch (error) {
    console.error("❌ Error updating user name:", error);
  }
}

export async function incrementConsultations(): Promise<void> {
  try {
    const metadata = await getUserMetadata();
    metadata.totalConsultations += 1;
    await saveUserMetadata(metadata);
    console.log(`✅ Total consultations: ${metadata.totalConsultations}`);
  } catch (error) {
    console.error("❌ Error incrementing consultations:", error);
  }
}

export async function updateAppVersion(version: string): Promise<void> {
  try {
    const metadata = await getUserMetadata();
    metadata.appVersion = version;
    await saveUserMetadata(metadata);
  } catch (error) {
    console.error("❌ Error updating app version:", error);
  }
}

export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.FORM_CACHE,
      STORAGE_KEYS.USER_METADATA,
    ]);
    console.log("✅ All data cleared");
  } catch (error) {
    console.error("❌ Error clearing all data:", error);
  }
}

// TO DO: Remover debugStorage se não for mais necessário
// Função para debug do armazenamento
export async function debugStorage(): Promise<void> {
  try {
    const formCache = await getFormCache();
    const metadata = await getUserMetadata();

    console.log("📦 STORAGE DEBUG:");
    console.log("Form Cache:", formCache);
    console.log("User Metadata:", metadata);
  } catch (error) {
    console.error("❌ Error debugging storage:", error);
  }
}
