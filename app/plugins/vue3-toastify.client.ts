import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    //options ...
    autoClose: 3000,
    theme: "colored",
    rtl: true,
    closeButton: false,
    pauseOnHover: true,
    position: toast.POSITION.TOP_CENTER,
  });

  return {
    provide: { toast },
  };
});
