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
      const route = useRoute()
      const query = route.query

      // Build query parameters with defaults
      const params = {
        include: query.include || this.includes,
        page: query.page || '1',
        perPage: query.perPage || '15',
        ...query, // Include any other query parameters
      }

      $http(this.url, {
        params,
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
    getById(id: string | number, params: Record<string, any>) {
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
