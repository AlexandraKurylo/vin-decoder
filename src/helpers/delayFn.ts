export const delayFn = async (delay = 1000): Promise<unknown> => {
  return await new Promise((res) => setTimeout(res, delay));
};
