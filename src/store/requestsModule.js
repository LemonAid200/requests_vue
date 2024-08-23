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
        async fetchRequestsData({commit}, { pageSize, page, search }){

            let authParams = JSON.parse(localStorage.getItem('authParams'))
            let authResponse = JSON.parse(localStorage.getItem('authResponce'))

            try {
                if (authParams && authResponse){
                    const data = await axios
                        .get(`https://dev.moydomonline.ru/api/appeals/v1.0/appeals?page_size=${pageSize}&page=${page}&search=${search}`, 
                            {
                                auth: {
                                    username: authParams.login,
                                    password: authParams.password
                                }
                            })
    
                    commit('setRequestsData', data)
                }
            } catch (e) {
                console.error(e)
            }
        },

        // unfinished function
        async fetchFilteredRequestsData({commit}, { pageSize, page, premise_id }){
            let authParams = JSON.parse(localStorage.getItem('authParams'))
            let authResponse = JSON.parse(localStorage.getItem('authResponce'))

            try {
                if (authParams && authResponse){
                    const data = await axios
                        .get(`https://dev.moydomonline.ru/api/geo/v2.0/user-premises?page_size=${pageSize}&page=${page}&premise_id=${premise_id}`, 
                            {
                                auth: {
                                    username: authParams.login,
                                    password: authParams.password
                                }
                            })
    
                    commit('setRequestsData', data)
                }
            } catch (e) {
                console.error(e)
            }
        }
    },
    namespaced: true
}