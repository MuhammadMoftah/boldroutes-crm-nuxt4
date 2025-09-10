export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: (msg: string) => `Hello brother ${msg}!`,
    },
  };
});
