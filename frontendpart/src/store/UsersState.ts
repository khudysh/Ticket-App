import UserData from "@/components/profile/UserData"
import api from './api'

const UsersState = {
    state: {
        cur_user: {} as UserData,
        // editUser: {} as UserData ,
        error: '' as string

    },
    getters: {
    },
    mutations: {
        SET_USER: function (state: any, payload: UserData) {
            state.cur_user = payload
            this.commit('SAVE_LC')
        },
        LOGINFUNC: function (state: any, payload: any) {
            for (let i = 0; i < state.users.length; i++) {
                if (state.users[i].login == payload.login) {
                    if (state.users[i].pass == payload.pass) {
                        state.cur_user = state.users[i]
                        state.error = ''
                        this.commit('SAVE_LC')
                        break
                    } else {
                        state.error = 'Неверные данные'
                    }
                } else {
                    state.error = 'Неверные данные'
                }
            }

        },
        LOGOUT: function (state: any) {
            state.cur_user = {}
            localStorage.removeItem('cur_user')
            localStorage.setItem('isAuth', '')
            localStorage.setItem('userType', '')
        },
        // edit: function(state: any) {
        //     state.editUser = {...state.cur_user }
        // },
        // save: function(state:any ) {
        //     state.cur_user = {...state.editUser}            
        //     this.commit('SAVE_LC')
        // },
        SAVE_LC: function (state: any) {
            localStorage.setItem("cur_user", JSON.stringify(state.cur_user));
            localStorage.setItem("id_user", state.cur_user.id);
            localStorage.setItem("userType", state.cur_user.user_type);
            localStorage.setItem("isAuth", "true");
        },

    },
    actions: {
        async login({ commit }: any, credentials: any) {
            try {
                commit('SET_LOADING', true, { root: true })
                const response = await api.post("/login", credentials)
                commit('SET_USER', response.data.user)
            } catch (error) {
                console.log(error)
                return error
            } finally {
                commit('SET_LOADING', false, { root: true })

            }
        },
        async getUserInfo({ commit }: any) {
            try {
                let userId = localStorage.getItem('id_user')
                const response = await api.get(`/user/${userId}`)
                commit('SET_USER', response.data.user)
            } catch (error) {
                console.log(error)
                return error
            }
        },
        async updateUserData({ commit, dispatch }: any, credentials: any) {
            try {
                let userId = localStorage.getItem('id_user')
                await api.put(`/user/${userId}`, credentials)
                dispatch('getUserInfo')
            } catch (error) {
                console.log(error)
                return error
            }
        }
    },
    modules: {

    }
}

export default UsersState
function dispatch(arg0: string) {
    throw new Error("Function not implemented.")
}

