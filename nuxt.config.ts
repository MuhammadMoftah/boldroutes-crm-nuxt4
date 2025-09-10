import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@sidebase/nuxt-auth", "@formkit/auto-animate/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },

  auth: {
    baseURL: process.env.BASE_URL,
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: false,
        // signUp: { path: "/register", method: "post" },
        getSession: {
          path: "/profile?include=roles,position,department,franchise,company,parent",
          method: "get",
        },
        // refresh: { path: '/refresh', method: 'post' },
      },
      token: {
        signInResponseTokenPointer: "/meta/token",
        maxAgeInSeconds: 34560000, // 400 days, the maximum allowed by the browser
      },
    },
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "https://api.example.com/",
      envMode: process.env.envMode || "production",
    },
  },
});
