export const createSlug = (str: string) => {
  return str.replace(/\s/g, '').toLowerCase();
};
