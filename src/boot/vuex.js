// src/boot/vuex.js
import { createStore } from 'vuex';
import { api as axios } from 'src/boot/axios';

export default async ({ app }) => {
    const store = createStore({
        state: {
            slots: [],
            count: 0,
            paytable: [],
            balance: {
                inited: false,
                total: 0,
                records: []
            }
        },
        mutations: {
            updateBalance(state, event) {
                state.balance.inited = true
                state.balance.total = event.balance
                state.balance.records.push({ changes: event.balance, type: event.type })
            },
            updateSlots(state, slots) {
                state.slots = slots
            },
            updatePayTable(state, paytable) {
                state.paytable = paytable
            },
            increment(state) {
                state.count++;
            },
            decrement(state) {
                state.count--;
            }
        },
        getters: {
            allSlots(state) {
                return state.slots
            },
            payTables(state) {
                return state.paytable
            },
            balanceRecords(state) {
                return state.balance
            },
            currentBalance(state) {
                return state.balance.total
            }
        },
        actions: {
            async fetcBalance(context) {
                // initial loading of ballance from backend
                const id = localStorage.getItem('userId')
                const response = await api.get(
                    `/users/${id}`
                );
                
                if (!context.state.balance.inited) {
                    context.commit('updateBalance', { balance: 10, type: 'initial' })
                }
            },
            changeBalance(context, event) {
                const newBallance = context.state.balance.total + event.diff
                context.commit('updateBalance', { balance: newBallance >= 0 ? newBallance : 0, type: event.type })
            },
            async fetchSlots(context,payload) {
                console.log('hit')
                axios
                    .post('/slots/', {

                        "bet": payload.bet,
                        "activePaylines": payload.activePaylines,
                        "user": localStorage.getItem('userId')
                    })
                    .then(response => {
                        context.commit('updateSlots', response.data.slots)
                        context.commit('updateBalance', { balance: response.data.balance, type: 'initial' })
                    })
            },
            async fetchPayTable(context) {
                axios
                    .get('https://dev.code-essence.eu/json/slots/?fetch=paytable')
                    .then(response => {
                        context.commit('updatePayTable', response.data)
                    })
            },
            decrement({ commit }) {
                commit('decrement');
            }
        }
    });

    app.use(store);
};
