export const useProjectsStore = defineStore('useProjectsStore', {
  state: () => {
    return reactive({
      url: '/projects',
      includes:
        'commissionMileStone,developer,location,company,commissionOffers,commissionOffers.franchise',
      data: [],
      meta: {},
      loading: false,
    })
  },

  getters: {},

  actions: {
    getAll() {
      this.loading = true
      $http(this.url + '?include=' + this.includes, {
        params: {
          ...useRoute().query,
        },
      })
        .then((res) => {
          console.log('res', res)
          this.data = res.data
          this.meta = res.meta
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
      $http(`${this.url}/${id}`, {
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
