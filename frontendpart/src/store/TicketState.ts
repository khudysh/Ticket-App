import api from './api'
import TiketInterface from '@/components/home/TiketInterface'


const TicketState = {
    state: {
        tickets: [] as Array<TiketInterface>,
    },
    getters: {
    },
    mutations: {
        SET_TICKETS: function(state: any, payload: Array<TiketInterface>) {
            state.tickets = payload
            state.tickets.forEach((ticket: any) => {
                let date = new Date(ticket.create_date);
                let date2 = new Date(ticket.create_date);
                ticket.create_date = date.toLocaleString("ru-RU")
                ticket.update_date = date2.toLocaleString("ru-RU")
            });
            this.commit('SAVE_LC')
        },
        ADD_TICKET: function (state: any, payload: TiketInterface) {
            state.tickets.push(payload);
            this.commit('SAVELC')
        },
        UPDATE_TICKET: function(state: any, payload: any) {
            
            state.tickets.forEach((ticket: TiketInterface) => {
                if (ticket.id == payload.id ) {
                    ticket.answ = payload.answ
                    ticket.status = payload.status
                    let date = new Date(payload.update_date)
                    ticket.update_date = date.toLocaleString("ru-RU")
                }
            });
            this.commit('SAVELC')
        },
        SAVELC: function(state: any) {
            localStorage.setItem("tickets", JSON.stringify(state.tickets));
        }
    },
    actions: {
        async getUserTickets({commit}: any, username: string) {
            api.get(`/ticket/user/${username}`)
            .then(response => {
                commit('SET_TICKETS', response.data)
            })
            .catch(error => console.log(error))
        },
        async getAllTickets({commit}: any) {
            api.get(`/ticket/all/`)
            .then(response => {
                commit('SET_TICKETS', response.data)
            })
            .catch(error => console.log(error))
        },
        async addTicket({commit}: any, tiketData: TiketInterface) {
            api.post(`/ticket`, tiketData)
            .then(response => {
                commit('ADD_TICKET', tiketData)
            })
            .catch(error => console.log(error))
        },
        async updateTicket({commit}: any,{id, ticketData}: any) {
            api.put(`/ticket/${id}`, ticketData)
            .then(response => {
                commit('UPDATE_TICKET', ticketData)
            })
            .catch(error => console.log(error))
        }
    },
    modules: {

    }
}

export default TicketState
