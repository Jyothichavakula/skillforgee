import { useAppDispatch } from "./redux";

import {
  setCredentials,
  clearCredentials,
} from "../store/authSlice";

import {
  loginUser,
  registerUser,
  logoutUser,
} from "../api/auth.api";

import type {
  LoginInput,
  RegisterInput,
} from "../api/auth.api";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const login = async (
    data: LoginInput
  ) => {
    const result = await loginUser(data);

    dispatch(
      setCredentials({
        user: result.user,
        accessToken: result.accessToken,
      })
    );

    return result;
  };

  const register = async (
    data: RegisterInput
  ) => {
    const result = await registerUser(data);

    dispatch(
      setCredentials({
        user: result.user,
        accessToken: result.accessToken,
      })
    );

    return result;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      dispatch(clearCredentials());
    }
  };

  return {
    login,
    register,
    logout,
  };
};