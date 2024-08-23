type FullnameProps = {
  firstName: string;
  middleName?: string | null;
  lastName: string;
};

export function formatFullname({
  firstName,
  middleName,
  lastName
}: FullnameProps): string {
  return middleName
    ? `${firstName} ${middleName} ${lastName}`
    : `${firstName} ${lastName}`;
}
