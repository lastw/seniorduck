export const rand = (from = 0, to = 1) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

export const draw = <T>(arr: T[]) => {
  return arr[rand(0, arr.length - 1)];
};
