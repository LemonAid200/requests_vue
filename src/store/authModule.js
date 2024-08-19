import axios from "axios"

export const authModule = {
    state: () => ({
        isAuthorised: false,
        key: '',
        employee_id: '',

        authenticationLink: 'https://dev.moydomonline.ru/api/auth/login/'
    }),


    mutations: {
      setAuth(state, authResponse){
        if (authResponse.key && authResponse.employee_id) {
          state.key = authResponse.key
          state.employee_id = authResponse.employee_id
          state.isAuthorised = true
        } else {
          state.isAuthorised = false
        }
      }
    },
    actions: {
      authCheck({state}){
        if (localStorage.getItem('authParams')) state.isAuthorised = true
        return state.isAuthorised
      },
      async auth({state, commit}, authParams){
        try {
           const response = await axios.post(`https://dev.moydomonline.ru/api/auth/login/`, 
            {
              "username": authParams?.login, 
              "password": authParams?.password
            }
          )
          commit('setAuth', response.data)
          localStorage.setItem('authResponce', JSON.stringify(response.data))
          localStorage.setItem('authParams', JSON.stringify(authParams))
          state.isAuthorised = true

        } catch (e) {
          state.isAuthorised = false
          console.error(e)
        } 
      }
    },
    namespaced: true
}