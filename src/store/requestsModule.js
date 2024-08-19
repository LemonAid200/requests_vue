import axios from "axios"

export const requestsModule = {
    state: () => ({
        requestsData: {}
    }),
    getters: {
        getRequestsList(state){
            return state.requestsData?.data?.results
        },
        getPages(state){
            return state.requestsData?.data?.pages
        },
        getCount(state){
            return state.requestsData?.data?.count
        }
    },


    mutations: {
      setRequestsData(state, response){
        state.requestsData = response
      }
    },
    actions: {
        async fetchRequestsData({commit}, { pageSize }){

            let authParams = JSON.parse(localStorage.getItem('authParams'))
            let authResponse = JSON.parse(localStorage.getItem('authResponce'))

            if (authParams && authResponse){
                const data = await axios
                    .get(`https://dev.moydomonline.ru/api/appeals/v1.0/appeals?page_size=${pageSize}`, 
                        // fix page size
                        {
                            auth: {
                                username: authParams.login,
                                password: authParams.password
                            }
                        })

                commit('setRequestsData', data)
            }
        }
    },
    namespaced: true
}