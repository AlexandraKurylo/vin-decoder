import { useState } from "react";
import { delayFn } from "../helpers/delayFn";

export const useFetch = (callback: (...args: any[]) => Promise<any>): [(...args: any[]) => Promise<any>, boolean, string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchFn = async (...args: any[]) => {
    try {
      setIsLoading(true);
      setError("");
      await delayFn();
      const response = await callback(...args);
      return response;
    } catch (err: any) {
      setError(err?.message || "Щось пішло не так");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchFn, isLoading, error];
};
