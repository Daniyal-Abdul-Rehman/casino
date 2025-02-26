import { defineStore } from 'pinia'
import axios from 'axios'

export const useSlotMachineStore = defineStore('useSlotMachineStore', {
    state: () => ({
        paytable: [],
        slots: [],
        balance: {
            inited: false,
            total: 0,
            records: []
        },
        loading: {
            paytable: true, // flag to track if paytable is loading
            slots: true, // flag to track if slots are loading
        }
    }),
    actions: {
        async fetchPayTable() {
            try {
                const response = await axios.get('https://dev.code-essence.eu/json/slots/?fetch=paytable')
                this.paytable = response.data
                this.loading.paytable = false // Data has been fetched
            } catch (error) {
                console.error('Error fetching paytable:', error)
                this.loading.paytable = false // Ensure loading is set to false even on error
            }
        },

        async fetchSlots({user}) {
            try {
                const response = await axios.post('/slots/', {
                    "bet": 50,
                    "activePaylines": 5,
                    "user":user
                })
                this.slots = response.data
                this.loading.slots = false // Data has been fetched
            } catch (error) {
                console.error('Error fetching slots:', error)
                this.loading.slots = false // Ensure loading is set to false even on error
            }
        },

        fetcBalance() {
            if (!this.balance.inited) {
                this.updateBalance({ balance: 10, type: 'initial' })
            }
        },

        changeBalance(event) {
            const newBalance = this.balance.total + event.diff
            this.updateBalance({ balance: newBalance >= 0 ? newBalance : 0, type: event.type })
        },

        updateBalance(event) {
            this.balance.inited = true
            this.balance.total = event.balance
            this.balance.records.push({ changes: event.balance, type: event.type })
        }
    },

    getters: {
        payTables: (state) => state.paytable,
        allSlots: (state) => state.slots,
        balanceRecords: (state) => state.balance,
        currentBalance: (state) => state.balance.total
    }
})
