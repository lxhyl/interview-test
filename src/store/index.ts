import { defineStore } from "pinia";
import { TicketOrder, TicketType, BaseCustomer, Participant } from "../__type__/index"
import {reactive} from "vue"

interface State {
  ticketOrders: Map<string, TicketOrder>,
  buyer: BaseCustomer | null,
}

export const useStore = defineStore({
  id: "order-store",
  state: (): State => ({
    ticketOrders: new Map<string, TicketOrder>(),
    buyer: null,
  }),
  actions: {
    addTicketOrder(order: TicketOrder) {
      const value = this.ticketOrders.get(order.type)
      if (!value?.buyer?.length) {
        this.ticketOrders.set(order.type, { ...order, buyer: [{ code: '', name: '' }]})
      } else {
        const buyer = [...value.buyer]
        buyer.push(reactive({code:'',name:''}))
        this.ticketOrders.set(order.type,{...order,buyer})
      }
    },
    removeTicket(type: TicketType) {
      const value = this.ticketOrders.get(type)
      const buyer = [...value?.buyer as Array<Participant>]
      const len = buyer.length
      let index = null
      for (let i = 0; i < len; i++) {
        if (!buyer[i].code || !buyer[i].name) {
          index = i
        }
      }
      index === null ? buyer.pop() : buyer.splice(index, 1)
      this.ticketOrders.set(type, { ...value, count: buyer.length, buyer } as TicketOrder)
    },
    setBuyer(buyer: BaseCustomer) {
      this.buyer = buyer
    }
  }
})