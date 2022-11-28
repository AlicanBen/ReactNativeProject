export const setTimeout = (time: number) =>
  new Promise((resolve) => {
    const timer = window.setTimeout(() => {
      window.clearTimeout(timer);
      resolve('');
    }, time);
  });
