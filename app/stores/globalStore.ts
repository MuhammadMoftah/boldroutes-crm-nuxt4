export const useGlobalStore = defineStore('useGlobalStore', {
  state: () => {
    return {
      variable1: 'value1',
      modal: '',
      drawer: '',
      activeItem: null,
    }
  },

  getters: {
    getter1: (state) => state.variable1.toUpperCase(),
  },

  actions: {
    action1() {
      // logic for action1
    },
  },
})
