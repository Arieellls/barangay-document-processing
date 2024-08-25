// export type OfficialType = {
//   id: string;
//   username: string;
//   password: string;
//   imageId: string;
//   firstName: string;
//   lastName: string;
//   middleName?: string | null;
//   gender: string;
//   age: number;
//   status: string;
//   completeAddress: string;
//   contactNumber: string;
//   birthday: Date;
//   placeOfBirth: string;
//   emailAddress: string;
//   isVoter: boolean;
//   formerAddress: string;
//   role: string;
//   position: string;
//   currentAddress: string;
//   startTerm: Date;
//   endTerm: Date;
// };

// export type UserType = {
//   id: string;
//   username: string;
//   password: string;
//   imageId: string;
//   firstName: string;
//   lastName: string;
//   middleName?: string | null;
//   gender: string;
//   age: number;
//   status: string;
//   completeAddress: string;
//   contactNumber: string;
//   birthday: Date;
//   placeOfBirth: string;
//   emailAddress: string;
//   isVoter: boolean;
//   formerAddress: string;
//   role: string;
//   position?: string;
//   currentAddress: string;
// };

// Base type for shared fields
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
  purok: number;
  completeAddress: string;
  contactNumber: string;
  birthday: Date;
  placeOfBirth: string;
  emailAddress: string;
  isVoter: boolean;
  formerAddress: string;
  role: string;
  position?: string;
};

// Official type with additional term fields
export type OfficialType = UserType & {
  id: string;
  userId: string;
  startTerm: Date;
  endTerm: Date;
  termEnded?: Date | null;
};
