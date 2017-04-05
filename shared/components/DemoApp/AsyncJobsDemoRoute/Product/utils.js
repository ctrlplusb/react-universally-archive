/* eslint-disable import/prefer-default-export */

export const resolveAfter = (result, time) =>
  new Promise(resolve => setTimeout(() => resolve(result), time));
