import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import type { IAuthContext } from "../types/global.types";

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};
