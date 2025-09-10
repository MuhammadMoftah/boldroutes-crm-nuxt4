export const $http = (request, opts?) => {
  const config = useRuntimeConfig();
  const { token } = useAuth();

  return $fetch(request, {
    baseURL: config.public.baseURL,
    headers: {
      Authorization: token.value,
    },
    ...opts,
  });
};
