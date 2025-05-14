export interface LoginProps {
  userName: string;
  password: string;
  loginType: string;
}

export interface ChangePasswordProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}