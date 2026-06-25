import { useState } from "react";
import { delayFn } from "../helpers/delayFn";
import { toast } from "react-toastify";

export const useFetch = (callback: (...args: any[]) => void): [(...args: any[]) => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchFn = async (...args: any[]) => {
    try {
      setIsLoading(true);
      setError("");
      await delayFn();
      const response = await callback(...args);
      return response;
    } catch (error: any) {
      setError(error?.message);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchFn, isLoading, error];
};
