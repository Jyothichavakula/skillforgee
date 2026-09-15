import { useEffect, useState } from "react";

import { useAppDispatch } from "./redux";

import {
  setCredentials,
  setAccessToken,
  clearCredentials,
} from "../store/authSlice";

import {
  getCurrentUser,
  refreshAccessToken,
} from "../api/auth.api";

export const useAuthInitializer = () => {
  const dispatch = useAppDispatch();

  const [isInitializing, setIsInitializing] =
    useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken =
          await refreshAccessToken();

        dispatch(setAccessToken(accessToken));

        const user =
          await getCurrentUser();

        dispatch(
          setCredentials({
            user,
            accessToken,
          })
        );
      } catch {
        dispatch(clearCredentials());
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  return {
    isInitializing,
  };
};