export const getErrorMessage = (error: any): string => {
  if (error?.status === 404) return "VIN not found.";
  if (error?.status >= 500) return "Server error, try again later.";
  return "Something went wrong. Please check your network.";
};
