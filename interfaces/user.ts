export interface IUser {
  id: number | null;
  firstName: string;
  email: string;
  role: string;
  isEmailConfirmed: boolean | null;
}
