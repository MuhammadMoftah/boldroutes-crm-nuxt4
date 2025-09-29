export default defineNuxtPlugin(() => {
  return {
    provide: {
      modal: computed({
        get: () => useGlobalStore().modal,
        set: (value: string) => {
          useGlobalStore().modal = value
        },
      }),
      drawer: computed({
        get: () => useGlobalStore().drawer,
        set: (value: string) => {
          useGlobalStore().drawer = value
        },
      }),
      closeModal: () => {
        useGlobalStore().modal = ''
        useGlobalStore().activeItem = null
      },
      closeDrawer: () => {
        useGlobalStore().drawer = ''
      },
    },
  }
})
