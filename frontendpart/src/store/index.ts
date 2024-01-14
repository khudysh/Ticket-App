import { createStore } from 'vuex'
import TicketState from './TicketState'
import ChatState from './ChatState'

import UsersState from './UsersState'


export default createStore({
  state: {
    isLoading: false as Boolean,
  },
  getters: {
  },
  mutations: {
    SET_LOADING(state, status) {
      state.isLoading = status
    }
  },
  actions: {
  },
  modules: {
    TicketState: TicketState,
    ChatState: ChatState,
    UsersState: UsersState
  }
})

