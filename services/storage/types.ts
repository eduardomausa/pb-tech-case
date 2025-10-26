export interface FormCache {
  name: string;
  phone: string;
  balance: string;
  month: string;
  lastUpdated: number;
}

export interface UserMetadata {
  firstAccessDate: number;
  lastAccessDate: number;
  totalConsultations: number;
  appVersion: string;
  userName?: string;
}

export interface StorageData {
  formCache: FormCache | null;
  userMetadata: UserMetadata;
}
