export const dateFormat = (date: Date): string => {
  return Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
