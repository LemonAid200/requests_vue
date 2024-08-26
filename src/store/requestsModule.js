import axios from "axios"

export const requestsModule = {
    state: () => ({
        requestsData: {},
        lastPublishedRequest: {},
        addressesList: []
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
      },
      setLastPublishedRequest(state, request){
        state.lastPublishedRequest = request
      },
      setAddressesList(state, adresses){
        state.addressesList = adresses
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

        async fetchFilteredRequestsData({commit}, { premise_id }){
            if (!premise_id) return
            let authParams = JSON.parse(localStorage.getItem('authParams'))
            let authResponse = JSON.parse(localStorage.getItem('authResponce'))
            try {
                if (authParams && authResponse){
                    const data = await axios
                        .get(`https://dev.moydomonline.ru/api/appeals/v1.0/appeals?premise_id=${premise_id}`, 
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
        async pushNewRequest({commit}, {premise_id, apartment_id, first_name, last_name, patronymic_name, username, description, due_date, status_id}){
            let authParams = JSON.parse(localStorage.getItem('authParams'))
                let authResponse = JSON.parse(localStorage.getItem('authResponce'))
                let key = JSON.parse(localStorage.getItem('authResponce')).key
                let body = {
                    hi: last_name,
                    premise_id: premise_id,
                    apartment_id: apartment_id,
                    applicant: {
                        first_name: first_name,
                        last_name: last_name,
                        patronymic_name: patronymic_name,
                        username: username
                    },
                    description: description,
                    due_date: due_date,
                    status_id : status_id
                }
                const headers = {
                    'Authorization': `Token ${key}`
                };

            try {
                if (authParams && authResponse){
                    const data = await axios
                        .post(`https://dev.moydomonline.ru/api/appeals/v1.0/appeals/`,
                            body, {headers})
                    
                    commit('setLastPublishedRequest', data)
                }
            } catch (e) {
                console.error(e)
            }
        },
        async getAdresses({commit}, {address}){
            try {
                let key = JSON.parse(localStorage.getItem('authResponce')).key
                const headers = {
                    'Authorization': `Token ${key}`
                };
                let data = await axios.get(`https://dev.moydomonline.ru/api/geo/v2.0/user-premises/?search=${address}`, {headers})
                let addresses = {}
                data.data.results.forEach(request => {
                    addresses[String(request.address)] = String(request.id)
                });

                commit('setAddressesList', addresses)
                return addresses
            } catch(e){
                console.error(e)
            }
        }

    },
    namespaced: true
}