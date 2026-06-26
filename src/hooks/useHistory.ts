import { useState } from "react";
import { CODE_STORAGE, MAX_HISTORY_ITEMS } from "../constants/global.constants";

export const useHistory = (): [string[], (vin: string) => void] => {
  // 1. Ініціалізація стану з безпечною перевіркою
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const savedData = localStorage.getItem(CODE_STORAGE);
      const parsed = savedData ? JSON.parse(savedData) : [];
      // Гарантуємо, що ми повертаємо масив
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // 2. Безпечне оновлення стану
  const addToHistory = (vin: string) => {
    setHistory((prev) => {
      // ПЕРЕВІРКА: чи є prev масивом перед тим, як викликати filter
      const currentHistory = Array.isArray(prev) ? prev : [];

      const newHistory = [vin, ...currentHistory.filter((item) => item !== vin)].slice(0, MAX_HISTORY_ITEMS);

      localStorage.setItem(CODE_STORAGE, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return [history, addToHistory];
};
