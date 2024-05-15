export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  birthDate: string;
  bio: string;
  profileImage?: string | null;
  coverImage?: string | null;
  updatedAt?: Date | null;
  createdAt: Date;
};
