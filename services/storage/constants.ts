import { UserMetadata } from "./types";

export const STORAGE_KEYS = {
  FORM_CACHE: "@pb-tech-case:form_cache",
  USER_METADATA: "@pb-tech-case:user_metadata",
} as const;

export const FORM_CACHE_EXPIRATION_DAYS = 7;

export const DEFAULT_USER_METADATA: UserMetadata = {
  firstAccessDate: Date.now(),
  lastAccessDate: Date.now(),
  totalConsultations: 0,
  appVersion: "1.0.0",
  userName: "Guest",
};
