export type OfficialType = {
  id: string;
  username: string;
  password: string;
  imageId: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  gender: string;
  age: number;
  status: string;
  completeAddress: string;
  contactNumber: string;
  birthday: Date;
  placeOfBirth: string;
  emailAddress: string;
  isVoter: boolean;
  formerAddress: string;
  role: string;
  position: string;
  currentAddress: string;
  startTerm: Date;
  endTerm: Date;
};

export type UserType = {
  id: string;
  username: string;
  password: string;
  imageId: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  gender: string;
  age: number;
  status: string;
  completeAddress: string;
  contactNumber: string;
  birthday: Date;
  placeOfBirth: string;
  emailAddress: string;
  isVoter: boolean;
  formerAddress: string;
  role: string;
  position?: string;
  currentAddress: string;
};

// className =
//   "relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground:";
