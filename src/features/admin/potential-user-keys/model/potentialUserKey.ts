export interface PotentialUserKeyModel {
  id: string;
  key: string;
  maxUsage: number;
  usageCount: number;
  allowedGen: string[];
  expiredAt: string;
  createdAt?: string;
}

export interface PotentialUserKeyDTO {
  key: string;
  maxUsage: number;
  allowedGen: string[];
  expiredAt: string;
}
