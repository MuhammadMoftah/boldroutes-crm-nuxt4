const url = '/projects'
const includes =
  'commissionMileStone,developer,location,company,commissionOffers,commissionOffers.franchise'
export const useProjectsStore = defineStore('useProjectsStore', {
  state: () => {
    return reactive({
      data: [],
      meta: {},
      loading: false,
    })
  },

  getters: {
    getter1: (state) => state.variable1.toUpperCase(),
  },

  actions: {
    getAll() {
      this.loading = true
      $http(url, {
        params: {
          ...useRoute().query,
        },
      })
        .then((res) => {
          this.data = res.response.data
          this.meta = res.response.meta
          this.loading = false
          return res
        })
        .catch((err) => {
          this.loading = false
          useToast().errorHandler(err)
        })
    },
    getById(id, params) {
      this.loading = true
      $http(`/reports/${id}`, {
        params: {
          ...params,
        },
      })
        .then((res) => {
          this.data = res.response.data
          this.meta = res.response.meta
          this.loading = false
          return res
        })
        .catch((err) => {
          this.loading = false
          useToast().errorHandler(err)
        })
    },
  },
})
