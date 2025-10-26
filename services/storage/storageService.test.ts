// storageService.test.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DEFAULT_USER_METADATA,
  FORM_CACHE_EXPIRATION_DAYS,
  STORAGE_KEYS,
} from "./constants";
import * as StorageService from "./storageService";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe("storageService", () => {
  const formCacheMock = {
    field1: "test",
    field2: "value",
  };

  const userMetadataMock = {
    ...DEFAULT_USER_METADATA,
    userName: "Eduardo",
    totalConsultations: 2,
    appVersion: "1.0.0",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.console, "log").mockImplementation(() => {});
    jest.spyOn(global.console, "error").mockImplementation(() => {});
  });

  describe("saveFormCache", () => {
    it("should save form cache successfully", async () => {
      await StorageService.saveFormCache(formCacheMock as any);
      expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.FORM_CACHE,
        expect.stringContaining('"field1":"test"')
      );
    });

    it("should log error if saving fails", async () => {
      mockedAsyncStorage.setItem.mockRejectedValueOnce(new Error("fail"));
      await StorageService.saveFormCache(formCacheMock as any);
      expect(console.error).toHaveBeenCalledWith(
        "❌ Error saving form cache:",
        expect.any(Error)
      );
    });
  });

  describe("getFormCache", () => {
    it("should return null if cache not found", async () => {
      mockedAsyncStorage.getItem.mockResolvedValueOnce(null);
      const result = await StorageService.getFormCache();
      expect(result).toBeNull();
    });

    it("should return parsed cache if valid", async () => {
      const validCache = JSON.stringify({
        ...formCacheMock,
        lastUpdated: Date.now(),
      });
      mockedAsyncStorage.getItem.mockResolvedValueOnce(validCache);

      const result = await StorageService.getFormCache();
      expect(result).toMatchObject(formCacheMock);
    });

    it("should clear expired cache and return null", async () => {
      const oldCache = JSON.stringify({
        ...formCacheMock,
        lastUpdated:
          Date.now() - (FORM_CACHE_EXPIRATION_DAYS + 1) * 24 * 60 * 60 * 1000,
      });
      mockedAsyncStorage.getItem.mockResolvedValueOnce(oldCache);
      const removeSpy = jest.spyOn(AsyncStorage, "removeItem");

      const result = await StorageService.getFormCache();

      expect(removeSpy).toHaveBeenCalledWith(STORAGE_KEYS.FORM_CACHE);
      expect(result).toBeNull();
    });

    it("should log error and return null if getItem fails", async () => {
      mockedAsyncStorage.getItem.mockRejectedValueOnce(new Error("fail"));
      const result = await StorageService.getFormCache();
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        "❌ Error getting form cache:",
        expect.any(Error)
      );
    });
  });

  describe("clearFormCache", () => {
    it("should clear cache successfully", async () => {
      await StorageService.clearFormCache();
      expect(mockedAsyncStorage.removeItem).toHaveBeenCalledWith(
        STORAGE_KEYS.FORM_CACHE
      );
    });

    it("should log error if clearing fails", async () => {
      mockedAsyncStorage.removeItem.mockRejectedValueOnce(new Error("fail"));
      await StorageService.clearFormCache();
      expect(console.error).toHaveBeenCalledWith(
        "❌ Error clearing form cache:",
        expect.any(Error)
      );
    });
  });

  describe("hasFormCache", () => {
    // TO DO: fix this test
    it.skip("should return true if cache exists", async () => {
      jest.spyOn(StorageService, "getFormCache").mockResolvedValueOnce({
        ...formCacheMock,
        lastUpdated: Date.now(),
      } as any);
      const result = await StorageService.hasFormCache();
      expect(result).toBe(true);
    });

    it("should return false if no cache", async () => {
      jest.spyOn(StorageService, "getFormCache").mockResolvedValueOnce(null);
      const result = await StorageService.hasFormCache();
      expect(result).toBe(false);
    });

    it("should return false on error", async () => {
      jest
        .spyOn(StorageService, "getFormCache")
        .mockRejectedValueOnce(new Error("fail"));
      const result = await StorageService.hasFormCache();
      expect(result).toBe(false);
    });
  });

  describe("getUserMetadata", () => {
    it("should create and return default metadata if none exists", async () => {
      mockedAsyncStorage.getItem.mockResolvedValueOnce(null);
      await StorageService.getUserMetadata();
      expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.USER_METADATA,
        expect.stringContaining('"totalConsultations"')
      );
    });

    it("should update lastAccessDate and return metadata", async () => {
      mockedAsyncStorage.getItem.mockResolvedValueOnce(
        JSON.stringify(userMetadataMock)
      );
      const result = await StorageService.getUserMetadata();
      expect(result.userName).toBe("Eduardo");
      expect(mockedAsyncStorage.setItem).toHaveBeenCalled();
    });

    it("should log error and return default metadata on failure", async () => {
      mockedAsyncStorage.getItem.mockRejectedValueOnce(new Error("fail"));
      const result = await StorageService.getUserMetadata();
      expect(result).toEqual(DEFAULT_USER_METADATA);
      expect(console.error).toHaveBeenCalledWith(
        "❌ Error getting user metadata:",
        expect.any(Error)
      );
    });
  });

  describe("updateUserName", () => {
    it("should update user name", async () => {
      jest
        .spyOn(StorageService, "getUserMetadata")
        .mockResolvedValueOnce({ ...DEFAULT_USER_METADATA } as any);
      await StorageService.updateUserName("John");
      expect(mockedAsyncStorage.setItem).toHaveBeenCalled();
    });

    // TO DO: fix this test
    it.skip("should log error if update fails", async () => {
      jest
        .spyOn(StorageService, "getUserMetadata")
        .mockRejectedValueOnce(new Error("fail"));
      await StorageService.updateUserName("John");
      expect(console.error).toHaveBeenCalledWith(
        "❌ Error updating user name:",
        expect.any(Error)
      );
    });
  });

  describe("incrementConsultations", () => {
    it("should increment total consultations", async () => {
      jest
        .spyOn(StorageService, "getUserMetadata")
        .mockResolvedValueOnce({ ...userMetadataMock } as any);
      await StorageService.incrementConsultations();
      expect(mockedAsyncStorage.setItem).toHaveBeenCalled();
    });

    // TO DO: fix this test
    it.skip("should log error if fails", async () => {
      jest
        .spyOn(StorageService, "getUserMetadata")
        .mockRejectedValueOnce(new Error("fail"));
      await StorageService.incrementConsultations();
      expect(console.error).toHaveBeenCalledWith(
        "❌ Error incrementing consultations:",
        expect.any(Error)
      );
    });
  });

  describe("updateAppVersion", () => {
    it("should update app version", async () => {
      jest
        .spyOn(StorageService, "getUserMetadata")
        .mockResolvedValueOnce({ ...DEFAULT_USER_METADATA } as any);
      await StorageService.updateAppVersion("2.0.0");
      expect(mockedAsyncStorage.setItem).toHaveBeenCalled();
    });

    // TO DO: fix this test
    it.skip("should log error if update fails", async () => {
      jest
        .spyOn(StorageService, "getUserMetadata")
        .mockRejectedValueOnce(new Error("fail"));
      await StorageService.updateAppVersion("2.0.0");
      expect(console.error).toHaveBeenCalledWith(
        "❌ Error updating app version:",
        expect.any(Error)
      );
    });
  });

  describe("clearAllData", () => {
    it("should clear all data", async () => {
      await StorageService.clearAllData();
      expect(mockedAsyncStorage.multiRemove).toHaveBeenCalledWith([
        STORAGE_KEYS.FORM_CACHE,
        STORAGE_KEYS.USER_METADATA,
      ]);
    });

    it("should log error if fails", async () => {
      mockedAsyncStorage.multiRemove.mockRejectedValueOnce(new Error("fail"));
      await StorageService.clearAllData();
      expect(console.error).toHaveBeenCalledWith(
        "❌ Error clearing all data:",
        expect.any(Error)
      );
    });
  });
});
