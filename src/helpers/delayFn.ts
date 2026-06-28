export const delayFn = async (delay = 2000): Promise<unknown> => {
  return await new Promise((res) => setTimeout(res, delay));
};
