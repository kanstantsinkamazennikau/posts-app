import bcrypt from "bcrypt";

export const hashPass = async (unHashPassword: string) => {
  return bcrypt.hash(unHashPassword, 10);
};

export const isSamePass = async (unHashPass: string, hashPass: string) => {
  return bcrypt.compare(unHashPass, hashPass);
};
