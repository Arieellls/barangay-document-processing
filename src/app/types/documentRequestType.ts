export type DocumentType = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  pickupDate: Date;
  claimedDate: Date | null;
  serviceType: string;
  purpose: string | null;
  status: string | null;
  userId: string;
  additionalDetails: string | null;
  createdAt: Date | null;
};
